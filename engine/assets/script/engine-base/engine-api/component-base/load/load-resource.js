cc.Class({
    extends: cc.Component,

    properties: {
        showNode: cc.Node,
        loadNodeList: [cc.Node],
        nameLb: cc.Label,
        tipLb: cc.Label,
        prefab: cc.Prefab
    },

    onLoad() {
        console.log('dependAssets', cc.director.getScene().dependAssets);
        this.cacheAssetData = {};
        //动态加载---异步，需要在回调函数中获得载入的资源
        //所有需要通过脚本动态加载的资源，都必须放置在assets/resources文件夹下或它的子文件夹下

        for (let i = 0; i < this.loadNodeList.length; i++) {
            this.loadNodeList[i].on(cc.Node.EventType.TOUCH_END, this.onClicked, this);
        }

        this.nameLb.string = 'target name = ';
        this.tipLb.string = 'target tip = ';
    },

    onClicked(event) {
        var self = this;
        this.clear();
        var name = event.target.name.split('_')[2];
        this.nameLb.string = 'target name = ' + name;
        this.tipLb.string = 'load tip = ';
        var url = '';
        var node = new cc.Node(name);
        node.setPosition(0, 0);
        node.parent = this.showNode;
        switch (name) {
            //---loadRes
            // cc.loader.loadRes(url, type, progressCallback, completeCallback)---一次只能加载单个Asset
            //参数 url(String)---相对于 assets/resources 的路径，结尾处不能包含后缀名（文件扩展名）
            //可选参数 type(Function)---资源类型，查找重名资源或者获取"子资源"（如获取 atlas 的 SpriteFrame）
            //参数 progressCallback(Function)---加载进度回调函数
            //函数参数 completedCount(Number)---加载完成数
            //函数参数 totalCount(Number)---加载总数
            //函数参数 item(Object)---加载的最新项
            //参数 completeCallback(Function)---加载完成回调
            //函数参数 error(Error)---error info | null
            //函数参数 resource(Object)---加载到的资源
            // cc.loader.loadResArray(urls, type, progressCallback, completeCallback)
            //参数 urls(String[])---Array of url
            //参数 type(Function)---资源类型
            //参数 progressCallback(Function)---加载进度回调函数
            //函数参数 completedCount(Number)---加载完成数
            //函数参数 totalCount(Number)---加载总数
            //函数参数 item(Object)---最新的加载项
            //参数 completeCallback(Function)---加载完成回调函数
            //函数参数 error(Error)---error info || null；如果其中一个加载失败，立马执行加载完成回调函数
            //函数参数 assets(Assets[])---Array of loaded asset
            case 'spriteFrame':
                url = 'load-asset/image';
                //1---Asset（3个参数）---加载独立的SpriteFrame
                //需指定第二个参数为资源的类型，才能加载到图片生成的cc.SpriteFrame---直接加载图片得到的类型为cc.Texture2D  
                cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        this.tipLb.string += 'err SpriteFrame';
                        return;
                    }
                    this.tipLb.string += 'successful SpriteFrame';
                    let component = node.getComponent(cc.Sprite);
                    if (!component) {
                        component = node.addComponent(cc.Sprite);
                    }
                    component.spriteFrame = spriteFrame;
                    console.log('Result should be a sprite frame: ', spriteFrame instanceof cc.SpriteFrame);
                });
                cc.loader.loadResArray([url, url], cc.SpriteFrame, (err, assets) => {
                    if (err) {
                        this.tipLb.string += 'err loadResArray';
                        return;
                    }
                    this.tipLb.string += 'successful loadResArray';
                    console.log('loadResArray assets is: ', assets);
                    assets.forEach((res) => {
                        console.log('loadResArray ctor is cc.SpriteFrame: ', res instanceof cc.SpriteFrame);
                        //true
                    });
                });
                break;
            case 'atlas':
                url = 'load-asset/atlas';
                //2---Asset（3个参数）---加载SpriteAtlas（图集）
                //需指定第二个参数为资源的类型---atlas资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下    
                cc.loader.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
                    if (err) {
                        this.tipLb.string += 'err SpriteAtlas';
                        return;
                    }
                    console.log('Result should be a atlas: ', atlas instanceof cc.SpriteAtlas);
                    this.tipLb.string += 'successful SpriteAtlas';
                    let frameList = atlas.getSpriteFrames();
                    let component = node.getComponent(cc.Sprite);
                    if (!component) {
                        component = node.addComponent(cc.Sprite);
                    }
                    component.spriteFrame = frameList[0];
                });
                break;
            case 'font':
                url = 'load-asset/font';
                //3---Asset（3个参数）---加载字体
                //需指定第二个参数为资源的类型---cc.Font
                cc.loader.loadRes(url, cc.Font, (err, font) => {
                    if (err) {
                        this.tipLb.string += 'err font';
                        return;
                    }
                    this.tipLb.string += 'successful font';
                    console.log('Result should be a font: ', font instanceof cc.Font);
                    let component = node.getComponent(cc.Label);
                    if (!component) {
                        component = node.addComponent(cc.Label);
                    }
                    component.font = font;
                    component.string = 'this is fnt';
                });
                break;
            case 'texture':
                url = 'load-asset/PurpleMonster';
                //4---Raw Asset（2个参数）---加载纹理
                cc.loader.loadRes(url, (err, res) => {
                    if (err) {
                        this.tipLb.string += 'err texture';
                        return;
                    }
                    this.tipLb.string += 'successful texture';
                    let component = node.getComponent(cc.Sprite);
                    if (!component) {
                        component = node.addComponent(cc.Sprite);
                    }
                    console.log('Result should be a texture', res instanceof cc.Texture2D); //true
                    console.log(res);
                    console.log('nativeUrl is: ', res.nativeUrl);
                    //cc_Texture2D---cc_Texture2D.url === "res/raw-assets/resources/load-asset/PurpleMonster.png"
                    component.spriteFrame = new cc.SpriteFrame(res);
                    //等价
                    //完整路径---resources/ + .后缀名
                    //当将url传给一些参数是URL形式的API，需要给出完整路径路径，并使用cc.url.raw(url)进行一次转换
                    let realUrl = cc.url.raw('resources/load-asset/PurpleMonster.png');
                    console.log('realUrl: ', realUrl); //res/raw-assets/resources/load-asset/PurpleMonster.png
                    // this.targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(realUrl);
                });
                break;
            case 'prefab':
                url = 'load-asset/prefab';
                //5---Asset(2个参数)---加载预制体
                cc.loader.loadRes(url, (err, res) => {
                    if (err) {
                        this.tipLb.string += 'err prefab';
                        return;
                    }
                    this.tipLb.string += 'successful prefab';
                    let prefabNode = cc.instantiate(res);
                    prefabNode.setPosition(0, 0);
                    prefabNode.parent = node;
                });
                break;
            case 'animation':
                url = 'load-asset/sprite-anim';
                //6---Asset（2个参数）---加载动画
                cc.loader.loadRes(url, function (err, clip) {
                    if (err) {
                        self.tipLb.string += 'err animation';
                        return;
                    }
                    self.tipLb.string += 'successful animation';
                    //addClip(clip, newName = clip.name)
                    //参数clip（AnimationClip）---动画剪辑
                    //参数newName（String）---动画剪辑名称
                    console.log('clip name = ' + clip.name);
                    if (!node.getComponent(cc.Sprite)) {
                        node.addComponent(cc.Sprite);
                    }
                    var component = node.addComponent(cc.Animation);
                    component.addClip(clip);
                    component.play(clip.name);
                });
                break;
            case 'audio':
                url = 'load-asset/audio';
                //7---Raw Asset（2个参数）---加载音频
                cc.loader.loadRes(url, function (err, res) {
                    if (err) {
                        self.tipLb.string += 'err audio';
                        return;
                    }
                    self.tipLb.string += 'successful audio';
                    console.log(res); //res/raw-assets/resources/load-asset/audio.mp3
                    cc.audioEngine.play(res);
                });
                break;
            case 'text':
                url = 'load-asset/text';
                //8---Asset（2个参数）---加载txt文本
                cc.loader.loadRes(url, function (err, res) {
                    if (err) {
                        self.tipLb.string += 'err text';
                        return;
                    }
                    self.tipLb.string += 'successful text';
                    var component = node.addComponent(cc.Label);
                    component.string = res;
                });
                break;
            case 'httpImage':
                //---load
                //---加载远程和设备资源---cc.loader.load(resources, progressCallback, completeCallback)
                //参数 resources(String | [String])---路径
                //参数 progressCallback(Function)---加载进度回调函数
                //函数参数 completedCount(Number)---加载完成数
                //函数参数 totalCount(Number)---加载总数
                //函数参数 item(Object)---最新的加载项
                //参数 completeCallbac(Function)---加载完成回调函数
                // if (completeCallback === undefined) {
                //     completeCallback = progressCallback;
                //     progressCallback = this.onProgress || null;
                // }
                //1---使用url从设备中加载
                // absolutePath-- - 设备资源绝对路径，带后缀名
                // url = absolutePath
                // cc.loader.load('/data/baiduyun/a.png', function(err, res) {
                //     if (err) {
                //         console.log('load texture err');
                //         return;
                //     }
                //     console.log('load texture successful');
                //     console.log('Result should be a texture: ' + (res instanceof cc.Texture2D));        
                //     var component = node.addComponent(cc.Sprite);
                //     component.spriteFrame = new cc.SpriteFrame(res);
                // });
                //2---使用url从远程服务器上加载
                // remoteUrl---远程资源路径
                // url---1---远程url带图片后缀名：url = remoteUrl
                // url---2---远程url不带图片后缀名，此时必须指定远程图片文件的类型：url = {url: remoteUrl, type: 'png'}
                url = 'http://tools.itharbors.com/res/logo.png';
                cc.loader.load(url, (err, res) => {
                    if (err) {
                        this.tipLb.string += 'err http image';
                        return;
                    }
                    this.tipLb.string += 'successful http image';
                    let component = node.addComponent(cc.Sprite);
                    component.spriteFrame = new cc.SpriteFrame(res);
                    console.log('加载单张图片 res instanceof cc.Texture2D', res instanceof cc.Texture2D); //true
                    console.log('加载单张图片 res =', res);
                    // cc_Texture2D---cc_Texture2D.url === "http://tools.itharbors.com/res/logo.png"
                });
                // resources 为数组时
                let urlArr = [url, url];
                cc.loader.load([url, url], (errors, results) => {
                    if (errors) {
                        this.tipLb.string += 'err http image arr';
                        for (let i = 0; i < errors.length; i++) {
                            console.log('加载多张图片 error url [' + errors[i] + ']: ', results.getError(errors[i]));
                            return;
                        }
                    } else {
                        this.tipLb.string += 'successful http image arr';
                        console.log('加载多张图片 results = ', results);
                        urlArr.forEach((url, index) => {
                            console.log('第', (index + 1), '张图片 = ', results.getContent(url));
                        });
                    }
                });
                break;
            case 'dir':
                // cc.loader.loadResDir(url, progressCallback, completeCallback)---加载 assets/resources/url 文件夹下的资源
                //参数 url(String)---文件夹路径
                //参数 type(Function)---资源类型
                //参数 progressCallback(Function)---加载进度回调函数
                //函数参数 completedCount(Number)---加载完成数
                //函数参数 totalCount(Number)---加载总数
                //函数参数 item(Object)---最新的加载项
                //参数 completeCallback(Function)---加载完成回调函数
                //函数参数 error(Error)---error info || null；如果其中一个加载失败，立马执行加载完成回调函数
                //函数参数 assets(Assets[])---Array of loaded asset
                //函数参数 urls(String[])---Array of loaded asset url
                cc.loader.loadResDir('imgs', cc.SpriteFrame, (err, assets, urls) => {
                    if (err) {
                        this.tipLb.string += 'err loadResDir';
                        return;
                    }
                    this.tipLb.string += 'successful loadResDir';
                    assets.forEach((asset) => {
                        console.log('asset is: ', asset);
                        console.log('asset ctor is cc.SpriteFrame: ', asset instanceof cc.SpriteFrame);
                        console.log('asset name is: ', asset.name);
                    });
                    urls.forEach((url) => {
                        console.log('url is: ', url);
                    });
                });
                break;
        }
    },

    clear() {
        this.showNode.removeAllChildren();
    },

    //在加载完资源之后，所有的资源都会临时被缓存到cc.loader中，以避免重复加载资源时发送无意义的http请求
    //资源之间是相互依赖的---cc.loader会自动使用缓存中的资源，不会重复请求相同的资源

    //---资源释放
    //1---cc.loader.releaseAsset(asset)---通过资源对象自身来释放资源
    //参数asset（Asset）
    // cc.loader.releaseAsset(spriteFrame);
    //2---cc.loader.releaseRes(path, type)---释放通过loadRes加载的资源
    //参数path---不带后缀名的资源路径
    //可选参数type---资源类型
    // cc.loader.releaseRes('popup/cocosHead', cc.Prefab);
    //3---cc.loader.release(asset)
    //通过id（通常是资源 url）来释放一个资源或者一个资源数组
    //参数asset---Asset | url | Array

    cache() {
        // cc.loader.getDependsRecursively(owner)---获取某个已经加载好的资源的所有依赖资源，包含它自身，并保存在数组中返回
        //参数 owner(Asset | String)---asset 资源对象 | 资源目录下的 url
        //返回 Array---[nativeUrl]；返回的数组保存依赖资源的 url
        let params = this.prefab;
        let func = () => {
            let dependArr = [];
            dependArr = cc.loader.getDependsRecursively(params);
            console.log('cache dependArr: ', dependArr);
        }
        func();
        params = 'prefab/cachePrefab';
        func();
    }
});