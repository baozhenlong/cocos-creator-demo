cc.Class({
    extends: cc.Component,

    properties: {
        //资源的分类
        //1---Asset---统一并自动化地加载，相互依赖的Asset能够被自动预加载
        //cc.SpriteFrame，cc.AnimationClip，cc.Prefab等

        //2---Raw Asset---用URL字符串指代资源；等到 v2.1 以上的某个版本，会全面移除对RawAsset
        //当要在引擎中使用Raw Asset，只要把URL传给引擎的API，引擎内部会自动加载这个URL对应的资源
        //cc.Texture2D，cc.AudioClip，cc.ParticleAsset等
        // textureURL: {
        //     default: '',
        //     url: cc.Texture2D
        // },

        showNode: cc.Node,
        loadNodeList: [cc.Node],
        nameLb: cc.Label,
        tipLb: cc.Label
    },

    onLoad() {
        //动态加载---异步，需要在回调函数中获得载入的资源
        //所有需要通过脚本动态加载的资源，都必须放置在assets/resources文件夹下或它的子文件夹下

        for (let i = 0; i < this.loadNodeList.length; i++) {
            this.loadNodeList[i].on(cc.Node.EventType.TOUCH_END, this.onClicked, this);
        }

        this.nameLb.string = 'target name = ';
        this.tipLb.string = 'target tip = ';
    },

    onClicked: function (event) {
        var self = this;
        this.clear();
        var name = event.target.name.split('_')[2];
        this.nameLb.string = 'target name = ' + name;
        this.tipLb.string = 'load tip = ';
        var url = '';
        var node = new cc.Node('name');
        node.setPosition(0, 0);
        node.parent = this.showNode;
        switch (name) {
            //---loadRes
            //cc.loader.loadRes(path, type, cb)---一次只能加载单个Asset
            //参数path（String）---相对于resources的路径，结尾处不能包含后缀名（文件扩展名）
            //可选参数type（Function）---资源类型，查找重名资源或者获取"子资源"（如获取Texture2D生成的SpriteFrame）
            //参数cb（Function）---在回调函数中获得载入的资源
            case 'spriteFrame':
                url = 'load-asset/image';
                //1---Asset（3个参数）---加载独立的SpriteFrame
                //需指定第二个参数为资源的类型，才能加载到图片生成的cc.SpriteFrame---直接加载图片得到的类型为cc.Texture2D  
                cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                    if (err) {
                        self.tipLb.string += 'err SpriteFrame';
                        return;
                    }
                    self.tipLb.string += 'successful SpriteFrame';
                    var component = node.addComponent(cc.Sprite);
                    component.spriteFrame = spriteFrame;
                });
                break;
            case 'atlas':
                url = 'load-asset/atlas';
                //2---Asset（3个参数）---加载SpriteAtlas（图集）
                //需指定第二个参数为资源的类型---atlas资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下    
                cc.loader.loadRes(url, cc.SpriteAtlas, function (err, atlas) {
                    if (err) {
                        self.tipLb.string += 'err SpriteAtlas';
                        return;
                    }
                    self.tipLb.string += 'successful SpriteAtlas';
                    var frameList = atlas.getSpriteFrames();
                    var component = node.addComponent(cc.Sprite);
                    component.spriteFrame = frameList[0];
                });
                break;
            case 'font':
                url = 'load-asset/font';
                //3---Asset（3个参数）---加载字体
                //需指定第二个参数为资源的类型---cc.Font
                cc.loader.loadRes(url, cc.Font, function (err, font) {
                    if (err) {
                        self.tipLb.string += 'err font';
                        return;
                    }
                    self.tipLb.string += 'successful font';
                    var component = node.addComponent(cc.Label);
                    component.font = font;
                    component.string = 'this is fnt';
                });
                break;
            case 'texture':
                url = 'load-asset/PurpleMonster';
                //4---Raw Asset（2个参数）---加载纹理
                cc.loader.loadRes(url, function (err, res) {
                    if (err) {
                        self.tipLb.string += 'err texture';
                        return;
                    }
                    self.tipLb.string += 'successful texture';
                    var component = node.addComponent(cc.Sprite);
                    console.log(res instanceof cc.Texture2D); //true
                    console.log(res);
                    //cc_Texture2D---cc_Texture2D.url === "res/raw-assets/resources/load-asset/PurpleMonster.png"
                    component.spriteFrame = new cc.SpriteFrame(res);
                    //等价
                    //完整路径---resources/ + .后缀名
                    //当将url传给一些参数是URL形式的API，需要给出完整路径路径，并使用cc.url.raw(url)进行一次转换
                    var realUrl = cc.url.raw('resources/load-asset/PurpleMonster.png');
                    console.log(realUrl); //res/raw-assets/resources/load-asset/PurpleMonster.png
                    // this.targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(realUrl);
                });
                break;
            case 'prefab':
                url = 'load-asset/prefab';
                //5---Asset（2个参数）---加载预制
                cc.loader.loadRes(url, function (err, res) {
                    if (err) {
                        self.tipLb.string += 'err prefab';
                        return;
                    }
                    self.tipLb.string += 'successful prefab';
                    var prefab = cc.instantiate(res);
                    prefab.setPosition(0, 0);
                    prefab.parent = node;
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
                    node.addComponent(cc.Sprite);
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
                //---load
                //---加载远程和设备资源---cc.loader.load(resources, progressCallback, completeCallback)
                //参数resources（String | [String]）---路径
                //参数progressCallback（Function）---进度显示
                //函数参数completedCount（Number）
                //函数参数totalCount（Number）
                //函数参数item（Object）---The latest item which flow out the pipeline
                // //参数completeCallback（Function）---加载完成
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
            case 'httpImage':
                url = 'http://tools.itharbors.com/res/logo.png';
                //2---使用url从远程服务器上加载
                //remoteUrl---远程资源路径
                //url---1---远程url带图片后缀名：url = remoteUrl
                //url---2---远程url不带图片后缀名，此时必须指定远程图片文件的类型：url = {url: remoteUrl, type: 'png'}
                cc.loader.load(url, function (err, res) {
                    if (err) {
                        self.tipLb.string += 'err http_image';
                        return;
                    }
                    self.tipLb.string += 'successful http_image';
                    var component = node.addComponent(cc.Sprite);
                    component.spriteFrame = new cc.SpriteFrame(res);
                    console.log(res instanceof cc.Texture2D); //true
                    console.log(res);
                    //cc_Texture2D---cc_Texture2D.url === "http://tools.itharbors.com/res/logo.png"
                });
                break;
        }
    },

    clear: function () {
        console.log('------clear');
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
    //参数asset---Asset | RawAsset | String | Array
    clearResource: function () {
        //---cc.loader.getRes(url, type)
        //参数url（String）---资源url
        //参数type---如cc.Prefab
        var res = cc.loader.getRes(url, type);
        cc.loader.release(res);
    }


    // start () {

    // },

    // update (dt) {},
});