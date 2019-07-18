function doAfterTick(callback, delay = 300) {
    setTimeout(() => {
        try {
            callback();
        } catch (err) {
            console.log('执行回调出错');
        }
    }, delay);
}
//加载资源
class LoadItem {
    constructor({
        id = -1, //资源id
        type, //资源类型
        desc = '', //加载描述
        url, //资源路径
        mgr //资源管理者
    }) {
        this.id = id;
        this.url = url;
        this.type = type;
        this.desc = `load<${desc}>`;
        this.mgr = mgr;
        this.isLoaded = false;
        this.isReleased = false;
        this.cacheResData = {};
    }

    load({
        successCallback,
        failureCallback,
        progressCallback
    }) {
        const completedCallback = (err, asset) => {
            this.isLoaded = true;
            if (err) {
                if (failureCallback instanceof Function) {
                    failureCallback();
                }
            } else {
                this.cacheRes(asset);
                if (successCallback instanceof Function) {
                    successCallback();
                }
            }
        }
        const args = [this.url];
        if (this.type) {
            args.push(this.type);
        }
        if (progressCallback instanceof Function) {
            args.push(progressCallback);
        }
        args.push(completedCallback);
    }

    cacheRes(asset) {
        if (asset instanceof cc.Asset) {
            let dependArr = cc.loader.getDependsRecursively(asset);
            dependArr.forEach((url) => {
                if (!this.cacheResData[url]) {
                    this.cacheResData[url] = true;
                }
            });
        }
    }

    release() {
        this.mgr = null;
        this.isReleased = true;
    }
}

//资源根管理者
class LoadMgr {
    constructor(desc = '') {
        this.desc = desc;
        this.isReleased = false;
        this.parentLoadMgr = null;
        this.subLoadMgrArr = [];
        //场景上的资源
        this.sceneResData = {};
        // loadItem 相关数据
        this.itemData = {};
        this.itemCount = 0;
        //引用计数以 loadItem为单位；即使 loadItem 用到了 3 次 xxx.png，xxx.png的引用次数也只算 1 次
        this.resReferenceCountData = {};
        //延迟加载清单
        this.delayLoadArr = [];
    }

    get rootLoadMgr() {
        let root = this;
        while (root.parentLoadMgr) {
            root = root.parentLoadMgr;
        }
        return root;
    }

    //暂存场景上的静态资源，LoadMgr 释放时会跳过这些资源
    cacheSceneRes(scene) {
        const {
            dependAssets
        } = scene;
        dependAssets.forEach((url) => {
            if (!this.rootLoadMgr.sceneResData[url]) {
                this.rootLoadMgr.sceneResData[url] = true;
            }
        });
    }

    //清除场景暂存
    uncancheSceneRes() {
        this.rootLoadMgr.sceneResData = {};
    }

    //排除场景上的资源
    excludeSceneRes(resArr = []) {
        return resArr.filter(res => !this.sceneResData[res]);
    }

    //创建子资源管理者
    createSubLoadMgr(desc = '') {
        if (this.isReleased) {
            throw new Error('loadMgr is released');
        }
        const loadMgr = new LoadMgr(desc);
        loadMgr.parentLoadMgr = this;
        this.subLoadMgrArr.push(loadMgr);
    }

    load({
        url,
        type,
        desc,
        successCallback,
        failureCallback,
        progressCallback,
    }) {
        if (this.isReleased) {
            throw new Error('loadMgr is released');
        }
        this.itemCount++;
        const id = this.itemCount;
        const loadItem = new LoadItem({
            url,
            type,
            desc,
            mgr: this
        });
        loadItem.load({
            successCallback: () => {
                this.addLoadItemReference(loadItem);
                if (this.isReleased || loadItem.isReleased) {
                    this.doAfterTick(() => {
                        this.removeLoadItemReference(loadItem);
                        this.releaseResHandle();
                    });
                }
            },
            failureCallback,
            progressCallback
        });
        this.itemData[id] = loadItem;
    }

    addLoadItemReference(loadItem) {
        const resReferenceCountData = this.rootLoadMgr.resReferenceCountData;
        for (let url in loadItem.cacheResData) {
            if (typeof resReferenceCountData[url] === 'number') {
                resReferenceCountData[url]++;
            } else {
                resReferenceCountData[url] = 1;
            }
        }
    }

    removeLoadItemReference(loadItem) {
        const resReferenceCountData = this.rootLoadMgr.resReferenceCountData;
        for (let url in loadItem.cacheResData) {
            if (typeof resReferenceCountData[url] === 'number') {
                resReferenceCountData[url]--;
                if (resReferenceCountData[url] < 0) {
                    throw new Error('移除资源引用错误 引用计数 < 0');
                }
            } else {
                throw new Error('移除资源引用错误');
            }
        }
    }

    releaseResHandle() {
        const resReferenceCountData = this.rootLoadMgr.resReferenceCountData;
        const sceneResData = this.rootLoadMgr.sceneResData;
        let releaseUrlArr = [];
        for (let url in resReferenceCountData) {
            if (resReferenceCountData[url] === 0) {
                if (!sceneResData[url]) {
                    releaseUrlArr.push(url);
                }
                delete resReferenceCountData[url];
            }
        }
        if (releaseUrlArr.length > 0) {
            cc.loader.release(releaseUrlArr);
        }
    }

    releaseResById(id) {
        if (this.isReleased) {
            return;
        }
        if (this.itemData[id]) {
            this.removeLoadItemReference(this.itemData[id]);
            this.itemData[id].release();
            delete this.itemData[id];
        }
        this.releaseResHandle();
    }

    release() {
        if (this.isReleased) {
            return;
        }
        this.isReleased = true;
        if (this.parentLoadMgr) {
            this.parentLoadMgr.removeSubLoadMgr(this);
        }
        for (let id in this.itemData) {
            this.releaseResById(id);
        }
        this.itemCount = 0;
        this.subLoadMgrArr.forEach((subLoadMgr) => {
            subLoadMgr.release();
        });
        this.subLoadMgrArr = [];
    }

    removeSubLoadMgr(loadMgr) {
        let index = this.subLoadMgrArr.indexOf(loadMgr);
        if (index !== -1) {
            this.subLoadMgrArr.splice(index, 1);
        }
    }
}