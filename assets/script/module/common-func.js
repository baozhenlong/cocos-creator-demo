//创建Sprite节点
var createSpriteNode = function(targetNode, nodeName, url) {
    var node = new cc.Node();
    var sp = node.addComponent(cc.Sprite);
    if (url instanceof cc.SpriteFrame) {
        //传入的是spriteFrame类型
        console.log("createSpNode spriteFrame");
        sp.spriteFrame = url;
    } else {
        console.log("createSpNode url");
        //传入的是url路径---必须是完整路径；需要声明resources目录和文件后缀名
        var realUrl = cc.url.raw(url);
        sp.spriteFrame = new cc.SpriteFrame(realUrl);
        //new cc.SpriteFrame(fileName)---调用的是setTexture()
        //fileName （url typeof == "string"）---cc.textureCache.addImage(fileName)
        //fileName （instanceof cc.Texture2D）---this._texture = fileName;        
    }
    if (nodeName) {
        node.name = nodeName;
    }
    if (targetNode) {
        node.parent = targetNode;
    }
    return node;
};

//刷新sprtieFrame
var refreshSpriteFrame = function(targetSprite, url) {
    if (!targetSprite) {
        return;
    }
    if (url instanceof cc.SpriteFrame) {
        targetSprite.spriteFrame = url;
    } else {
        var realUrl = cc.url.raw(url);
        targetSprite.spriteFrame = new cc.SpriteFrame(realUrl);
    }
};

//红点提示
var updateRedTip = function(targetNode, tipKey) {
    //cc.find(path, referenceNode)
    //参数path（String）---节点名
    //参数referenceNode（Node）---参考节点，在该节点下查找（默认为cc.director.getScene(),instanceof cc.Node === true）
    //返回值---Node|null

    //初始化红点
    console.log('------updateRedTip targetNode.name = ' + targetNode.name);
    var redTip = cc.find('redTip', targetNode);
    if (!redTip) {
        console.log('------createRedTip');
        redTip = createSpriteNode(targetNode, 'redTip', 'resources/texture/redpoint.png');
        redTip.setPosition(0, 13);
    }
    redTip.active = false;

    //红点控制
    if (tipKey === constant.redTipKeyObj.bag) {
        if (localStorageMgr.getBagRedTip()) {
            redTip.active = true;
        }
    } else if (tipKey === constant.redTipKeyObj.noble) {
        if (localStorageMgr.getNobleRedTip()) {
            redTip.active = true;
        }
    }
};

//加载远程资源和设备资源
var load = function(targetSprite, url) {
    if (!url) {
        return;
    }
    //cc.loader.load()
    //第一个参数url---路径
    //url（remoteUrl---远程资源）
    //远程url带图片后缀名---url = remoteUrl
    //远程url不带图片后缀名，此时必须指定远程图片文件的类型---url = {url: remoteUrl, type: 'png'}
    //url（absolutePath---设备资源）---绝对路径，url = absolutePath
    cc.loader.load(url, function(err, res) {
        if (err) {
            console.log('------load error = ' + JSON.stringify(err));
            return;
        }
        console.log('------load success');
        targetSprite.spriteFrame = new cc.SpriteFrame(res);
    })
};

//加载项目资源
var loadRes = function(targetNode, url, type) {
    if (!url || !targetNode) {
        return;
    }
    console.log('------loadRes');
    //cc.loader.loadRes()
    //第一个参数url---路径（相对于resources的路径，并且路径结尾出不能包含文件扩展名）
    if (type === 'Prefab') {
        //加载Prefab
        cc.loader.loadRes(url, function(err, prefab) {
            if (err) {
                console.log('------loadRes error = ' + JSON.stringify(err));
                return;
            }
            console.log('------loadRes success Prefab');
            var node = cc.instantiate(prefab);
            node.parent = targetNode;
        });
    } else if (type === 'Clip') {
        //加载AnimationClip
        cc.loader.loadRes(url, function(err, clip) {
            //addClip()
            //第一个参数clip（AnimationClip）---动画剪辑
            //第二个参数newName（String）---动画剪辑名称
            if (err) {
                console.log('------loadRes error = ' + JSON.stringify(err));
                return;
            }
            console.log('------loadRes success Clip');
            targetNode.getComponent(cc.Animation).addClip(clip, 'anim');
        });
    } else if (type === 'SpriteAtlas') {
        //加载SpriteAtlas（图集）
        //指定第二个参数为资源的类型        
        cc.loader.loadRes(url, cc.SpriteAtlas, function(err, atlas) {
            if (err) {
                console.log('------loadRes error = ' + JSON.stringify(err));
                return;
            }
            console.log('------loadRes success SpriteAtlas');
            var frameList = atlas.getSpriteFrames();
            targetNode.getComponent(cc.Sprite).spriteFrame = frameList[0];
        });
    } else if (type === 'SpriteFrame') {
        //加载独立的SpriteFrame
        //指定第二个参数为资源的类型---直接加载得到的类型为cc.Texture2D，指定参数后为cc.SpriteFrame   
        cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame) {
            if (err) {
                console.log('------loadRes error = ' + JSON.stringify(err));
                return;
            }
            console.log('------loadRes success SpriteFrame');
            targetNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
};

module.exports = {
    createSpriteNode: createSpriteNode,
    refreshSpriteFrame: refreshSpriteFrame,
    updateRedTip: updateRedTip,
    load: load,
    loadRes: loadRes,
};