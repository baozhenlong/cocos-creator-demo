function doAfterTick(callback, delayTime = 100) {
    // 参数
    // callback
    // 回调函数
    // delayTime
    // 单位， ms
    setTimeout(() => {
        callback();
    }, delayTime);
}

// 设计概念
// rootLoader
// 拥有 subLoader subLoader ...
// 维护 assets 引用计数
// loader
// 拥有 loaderItem loaderItem ...
class Loader {

    constructor(desc = '') {
        this.desc = desc;
        this.parentLoader = null;
        this.isReleased = false;
        this.itemData = {};
        this.itemCount = 0;
        this.subLoaderArr = [];
        this.sceneAssetsData = {};
        // 场景上的资源是静态资源， 不会被释放
        this.assetsReferenceCountData = {};
    }

    get rootLoader() {
        let rootLoader = this;
        while (rootLoader.parentLoader) {
            rootLoader = rootLoader.parentLoader;
        }
        return rootLoader;
    }

    cacheSceneAssets(scene) {
        let assets = scene.dependAssets;
        assets.forEach(uuid => {
            if (!this.rootLoader.sceneAssetsData[uuid]) {
                this.rootLoader.sceneAssetsData[uuid] = true;
            }
        });
    }

    uncacheSceneAssets() {
        this.rootLoader.sceneAssetsData = {};
    }

    createSubLoader(desc) {
        if (this.isReleased) {
            throw new Error('loader is released');
        }
        let loader = new Loader(desc);
        loader.parentLoader = this;
        this.subLoaderArr.push(loader);
        return loader;
    }

    load(funcName, {
        url,
        type,
        desc,
        successCallback,
        failureCallback,
        progressCallback,
        retryTimes,
        retryTimeInterval
    }) {
        if (this.isReleased) {
            throw new Error('loader is released');
        }
        this.itemCount++;
        let id = this.itemCount;
        let loaderItem = new LoaderItem({
            id,
            url,
            type,
            retryTimes,
            retryTimeInterval,
            loader
        });
        this.itemData[id] = loaderItem;

        loaderItem.load(funcName, {
            successCallback: (assets) => {
                this.addLoaderItemReference(loaderItem);
                if (this.isReleased || loaderItem.isReleased) {
                    this.releasedLoaderItemHandle(loaderItem);
                } else if (successCallback instanceof Function) {
                    successCallback(assets);
                }
            },
            failureCallback: (err) => {
                if (this.isReleased) {
                    if (failureCallback instanceof Function) {
                        failureCallback(err);
                    }
                }
            },
            progressCallback: () => {
                if (progressCallback instanceof Function) {
                    progressCallback(completedCount, totalCount, item);
                }
            }
        });
    }

    releasedLoaderItemHandle(loaderItem) {
        // 下一个 tick 再释放，以防释放到正在载入的资源
        doAfterTick(() => {
            this.removeLoaderItemReference(loaderItem);
            this.assetsReferenceCountHandle();
        });
    }

    addLoaderItemReference(loaderItem) {
        let assetsData = loaderItem.assetsData;
        let assetsReferenceCountData = this.rootLoader.assetsReferenceCountData;
        Object.keys(assetsData).forEach((uuid) => {
            if (assetsReferenceCountData[uuid] === undefiend) {
                assetsReferenceCountData[uuid] = 0;
            }
            assetsReferenceCountData[uuid]++;
        });
    }

    removeLoaderItemReference(loaderItem) {
        let assetsData = loaderItem.assetsData;
        let assetsReferenceCountData = this.rootLoader.assetsReferenceCountData;
        Object.keys(assetsData).forEach((uuid) => {
            if (assetsReferenceCountData[uuid] === undefiend) {
                console.log(`${uuid} is not found`);
            } else {
                assetsReferenceCountData[uuid]--;
                if (assetsReferenceCountData[uuid] < 0) {
                    console.log(`${uuid} count is < 0`);
                }
            }
        });
    }

    assetsReferenceCountHandle() {
        let assetsReferenceCountData = this.rootLoader.assetsReferenceCountData;
        let sceneAssetsData = this.rootLoader.sceneAssetsData;
        let uuidArr = Object.keys(assetsReferenceCountData);
        uuidArr.filter(uuid => assetsReferenceCountData[uuid] === 0 && !sceneAssetsData[uuid]);
        if (uuidArr.length > 0) {
            cc.loader.release(uuidArr);
        }
    }

    releaseAll() {
        if (this.isReleased) {
            return;
        }
        this.isReleased = true;
        if (this.parentLoader) {
            this.parentLoader.removeSubLoader(this);
        }
        this.release(Object.keys(this.itemData));
        this.itemCount = 0;
        this.subLoaderArr.forEach((loader) => {
            loader.releaseAll();
        });
        this.subLoaderArr = [];
    }

    release(itemIdArr) {
        if (this.isReleased) {
            return;
        }
        itemIdArr.forEach((itemId) => {
            if (this.itemData[itemId]) {
                this.removeLoaderItemReference(this.itemData[itemId]);
                this.itemData[itemId].releaseAll();
                delete this.itemData[itemId];
            } else {
                console.log(`loaderItem$(id) not found`);
            }
        });
        this.assetsReferenceCountHandle();
    }

    removeSubLoader(loader) {
        let index = this.subLoaderArr.indexOf(loader);
        if (index !== -1) {
            this.subLoaderArr.splice(index, 1);
        }
    }
}

class loaderItem {
    constructor({
        id, // 用于 loader 管理
        url, // 资源路径
        type = null, // 资源的类型
        retryTimes = 0, // 重试次数
        retryTimeInterval = 300, // 重试间隔， 单位 ms
        desc = '', // 此次加载的描述
        loader, // 资源加载管理者
    }) {
        this.id = id;
        this.type = type;
        this.retryTimes = retryTimes;
        this.retryTimeInterval = retryTimeInterval;
        this.desc = `LoaderItem<${desc}>`;
        this.loader = loader;
        this.url = url;
        this.currentRetryTimes = 0;
        this.assetsData = {};
        this.isLoaded = false;
        this.isReleased = false;
    }

    load(funcName, {
        successCallback,
        failureCallback,
        progressCallback
    }) {
        let completedCallback = (err, assets) => {
            if (err) {
                if (this.currentRetryTimes <= this.retryTimes) {
                    this.currentRetryTimes++;
                    doAfterTick(() => {
                        this.load(funcName, {
                            successCallback,
                            failureCallback,
                            progressCallback
                        });
                    }, this.retryTimeInterval);
                } else {
                    this.isLoaded = true;
                    if (failureCallback instanceof Function) {
                        failureCallback(err);
                    }
                }
            } else {
                this.isLoaded = true;
                if (!Array.isArray(assets)) {
                    assets = [assets];
                }
                this.cacheAssets(assets);
                if (successCallback instanceof Function) {
                    successCallback(assets);
                }
            }
        };
        let args = [this.url];
        if (this.type !== null) {
            args.push(type);
        }
        if (progressCallback instanceof Function) {
            args.push(progressCallback);
        }
        args.push(completedCallback);
        cc.loader[funcName](...args);
    }

    cacheAssets(assets) {
        assets.forEach((asset) => {
            this.cacheAsset(asset);
        });
    }

    cacheAsset(asset) {
        if (!asset._uuid) {
            if (asset.url) {
                asset._uuid = asset.url;
            }
        }
        let uuidArr = cc.loader.getDependsRecursively(asset);
        uuidArr.forEach((uuid) => {
            if (!this.assetsData[uuid]) {
                this.assetsData[uuid] = true;
            }
        });
    }

    release() {
        this.isReleased = true;
        this.loader = null;
        this.assetData = {};
    }
}