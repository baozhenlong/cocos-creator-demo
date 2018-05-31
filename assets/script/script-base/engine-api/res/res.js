cc.Class({
    extends: cc.Component,

    properties: {
        //资源的分类
        //1---Asset---统一并自动化地加载，相互依赖的Asset能够被自动预加载
        //cc.SpriteFrame，cc.AnimationClip，cc.Prefab等
        spriteFrame: {
            default: null,
            type: cc.SpriteFrame
        },
        //2---Raw Asset---用URL字符串指代资源
        //cc.Texture2D，cc.AudioClip，cc.ParticleAsset等
        textureURL: {
            default: '',
            url: cc.Texture2D
        },
        targetNode: cc.Node
    },

    onLoad() {
        var self = this;
        //动态加载---异步，需要在回调函数中获得载入的资源
        //所有需要通过脚本动态加载的资源，都必须放置在assets/resources文件夹下或它的子文件夹下
        //1---加载Asset
        //cc.loader.loadRes(path, type, cb)---一次只能加载单个Asset
        //第一个参数path（String）---相对于resources的路径，结尾处不能包含后缀名（文件扩展名）
        //第二个可选参数type（Function）---资源类型，查找重名资源或者获取"子资源"（如获取Texture2D生成的SpriteFrame）
        //第三个参数cb（Function）---在回调函数中获得载入的资源
        //1.1---加载Prefab
        // cc.loader.loadRes('popup/cocosHead', function(err, prefab) {
        //     if (err) {
        //         console.log('loadRes prefab err');
        //         return;
        //     }
        //     console.log('loadRes prefab successful');
        //     var newNode = cc.instantiate(prefab);
        //     newNode.parent = self.targetNode;
        // });
        //1.2---加载AnimationClip
        // cc.loader.loadRes('url', function(err, clip) {
        //     //addClip(clip, newName)
        //     //第一个参数clip（AnimationClip）---动画剪辑
        //     //第二个参数newName（String）---动画剪辑名称
        //     if (err) {
        //         console.log('loadRes AnimationClip err');
        //         return;
        //     }
        //     console.log('loadRes AnimationClip successful');
        //     targetNode.getComponent(cc.Animation).addClip(clip, 'anim');
        // });
        //1.3---加载SpriteAtlas（图集）
        //需指定第二个参数为资源的类型---atlas资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下    
        // cc.loader.loadRes('atlas/ddzCardSmall', cc.SpriteAtlas, function(err, atlas) {
        //     if (err) {
        //         console.log('loadRes SpriteAtlas err');
        //         return;
        //     }
        //     console.log('loadRes SpriteAtlas successful');
        //     var frameList = atlas.getSpriteFrames();
        //     self.targetNode.getComponent(cc.Sprite).spriteFrame = frameList[0];
        // });
        //1.4---加载独立的SpriteFrame
        //需指定第二个参数为资源的类型，才能加载到图片生成的cc.SpriteFrame---直接加载图片得到的类型为cc.Texture2D  
        // cc.loader.loadRes('texture/HelloWorld', cc.SpriteFrame, function(err, spriteFrame) {
        //     if (err) {
        //         console.log('loadRes SpriteFrame err');
        //         return;
        //     }
        //     console.log('loadRes SpriteFrame successful');
        //     self.targetNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        //1.5---资源释放
        //cc.loader.releaseRes(path, type)
        //第一个参数path---不带后缀名的资源路径
        //第二个可选参数type---资源类型
        //2---加载Raw Asset
        cc.loader.loadRes('audio/allin', function(err, res) {
            if (err) {
                console.log('loadRes audio err');
                return;
            }
            console.log('loadRes audio successful');
        });
        //完整路径---resources/ + .后缀名
        //当将url传给一些参数是URL形式的API，需要给出完整路径路径，并使用cc.url.raw(url)进行一次转换
        var realUrl = cc.url.raw('resources/texture/HelloWorld.png');
        this.targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(realUrl);

        //3---加载远程和设备资源
        //cc.loader.load(url, cb)
        //第一个参数url---路径
        //第二个参数cb（Function）---在回调函数中获得载入的资源
        //2.1---使用url从远程服务器上加载
        //remoteUrl---远程资源路径
        //远程url带图片后缀名---url = remoteUrl
        //远程url不带图片后缀名，此时必须指定远程图片文件的类型---url = {url: remoteUrl, type: 'png'}
        // cc.loader.load('https://www.qqtn.com/viewimg_253950_1.html?https://pic.qqtn.com/up/2018-5/15254871484844907.jpg', function(err, res) {
        //     if (err) {
        //         console.log('load texture err');
        //         return;
        //     }
        //     console.log('load texture successful');
        //     console.log('Should load a texture from external url: ' + (res instanceof cc.Texture2D));
        //     self.targetSprite.spriteFrame = new cc.SpriteFrame(res);
        // });
        //2.2---使用url从设备中加载
        // absolutePath-- - 设备资源绝对路径，带后缀名
        // url = absolutePath
        // cc.loader.load('/data/baiduyun/a.png', function(err, res) {
        //     if (err) {
        //         console.log('load texture err');
        //         return;
        //     }
        //     console.log('load texture successful');
        //     console.log('Result should be a texture: ' + (res instanceof cc.Texture2D));        
        //     self.targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        // });

        //在加载完资源之后，所有的资源都会临时被缓存到cc.loader中，以避免重复加载资源时发送无意义的http请求
        //资源之间是相互依赖的---cc.loader会自动使用缓存中的资源，不会重复请求相同的资源
        //
    },


    // start () {

    // },

    // update (dt) {},
});