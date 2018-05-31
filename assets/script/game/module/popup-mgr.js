cc.Class({
    extends: cc.Component,

    properties: {

    },

    ctor: function() {
        this.popupCacheObj = {};
    },

    getPopup: function(popupName) {
        if (this.popupCacheObj[popupName]) {
            return this.popupCacheObj[popupName]
        }
        return false;
    },

    retainPopup: function(popupName, popupNode) {
        this.popupCacheObj[popupName] = popupNode;
    },

    releasePoppup: function(popupName, popupNode) {
        if (this.popupCacheObj[popupName]) {
            delete this.popupCacheObj[popupName];
        }
        if (popupNode.isValid) {
            popupNode.destroy();
        }
    },

    showPopup: function(popupName, paramObj, params) {
        var self = this;
        if (!paramObj) {
            console.log('------no paramObj');
            paramObj = {};
        }
        if (!params) {
            console.log('------no params');
            params = [];
        }
        console.log('------popup-mgr paramObj = ' + JSON.stringify(paramObj));
        var parent = paramObj.parent ? paramObj.parent : cc.director.getScene().getChildByName("Canvas");
        var pos = paramObj.pos ? paramObj.pos : cc.p(0, 0);
        var isCleanup = paramObj.isCleanup ? paramObj.isCleanup : false;
        this.openFunc = paramObj.openFunc ? paramObj.openFunc : null;
        // console.log("------popup-mgr showPopup openFunc = " + this.openFunc);
        this.closeFunc = paramObj.closeFunc ? paramObj.closeFunc : null;
        // console.log("------popup-mgr showPopup closeFunc = " + this.closeFunc);
        var popupNode = this.getPopup(popupName);
        //资源已经缓存，并且节点可用
        if (popupNode && popupNode.isValid) {
            console.log("------popup-mgr show cache popup");
            this.showHandle(popupName, popupNode, parent, pos, params, isCleanup);
            return;
        }
        //资源已经缓存，并且节点已经销毁      
        if (popupNode && popupNode.isValid == false) {
            console.log("------popup-mgr release popup");
            this.releasePoppup(popupName, popupNode);
        }
        cc.loader.loadRes("popup/" + popupName, function(err, res) {
            if (err) {
                console.log("------popup-mgr error url");
                return;
            }
            console.log("------popup-mgr show load popup")
            let popupNode = cc.instantiate(res);
            self.showHandle(popupName, popupNode, parent, pos, params, isCleanup);
        });
    },

    showHandle: function(popupName, popupNode, parent, pos, params, isCleanup) {
        console.log("------popup-mgr showHandle parent = " + parent.name);
        var self = this;
        if (!isCleanup) {
            this.retainPopup(popupName, popupNode);
        }
        popupNode.parent = parent;
        var winSize = cc.director.getWinSize();
        popupNode.width = winSize.width;
        popupNode.height = winSize.height;
        if (parent.name !== 'Canvas') {
            pos.x = winSize.width / 2;
            pos.y = winSize.height / 2;
        }
        console.log('------popup-mgr pos = ' + JSON.stringify(pos));
        popupNode.setPosition(pos);
        //通过父类获取节点上的脚本
        var popupJs = popupNode.getComponent('popup-sup');
        if (popupJs) {
            console.log("------popup-mgr showHandle popupJs name = " + popupJs.name);
            popupJs.popup(params, function() {
                self.openHandle();
            }, function() {
                self.closeHandle(popupNode);
                if (isCleanup) {
                    self.releasePoppup(popupName, popupNode);
                }
            });
        }
    },

    openHandle: function() {
        console.log('execute openHandle');
        if (this.openFunc) {
            this.openFunc();
        }
    },
    closeHandle: function(popupNode) {
        console.log('execute closeHandle');
        if (this.closeFunc) {
            this.closeFunc();
        }
        popupNode.parent = null;
        this.openFunc = null;
        this.closeFunc = null;
    },

    //预加载弹窗
    //参数popupNameList（Array）---弹窗名字
    //参数cb（Function）---回调函数
    preLoadPopup: function(popupNameList, cb = null) {
        console.log("------popup-mgr preLoadPopup");
        var self = this;
        var len = popupNameList.length;
        popupNameList.forEach(function(popupName, index) {
            //预加载Asset资源---cc.loader.loadRes(path, type, cb)，只能加载单个Asset
            //动态加载位于assets/resources/下的Asset资源（cc.Prefab，cc.SpriteFrame，cc.AnimationClip等）
            //参数path（String）---资源路径，不能包含文件扩展名
            //可选参数type（Function）---资源的类型，当类型为cc.SpriteAtlas，cc.SpriteFrame时，必需
            //参数cb（Function）---回调函数
            cc.loader.loadRes("popup/" + popupName, function(err, res) {
                if (err) {
                    console.log("------popup-mgr preLoadPopup err = " + JSON.stringify(err));
                    return;
                }
                console.log("------popup-mgr preLoadPopup successful popupName = " + popupName);
                var popupNode = cc.instantiate(res);
                self.retainPopup(popupName, popupNode);
                if (len === index && cb) {
                    cb();
                }
            });
        });
    },

    // start () {

    // },

    // update (dt) {},
});