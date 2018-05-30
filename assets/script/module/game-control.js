//全局变量
window.constant = require('constant');
window.commonFunc = require('common-func');
window.localStorageMgr = require('local-storage-mgr');
window.c2s = require('c2s');
cc.Class({
    extends: cc.Component,

    properties: {
        tipPrefab: cc.Prefab,
        hintBoxNode: cc.Node
    },


    onLoad() {
        console.log('------game-control onLoad');
        //引擎同时只会运行一个场景，当切换场景时，默认会将场景内所有节点和其他实例销毁
        //如果需要用一个组件控制所有场景的加载，或在场景之间传递参数数据，就需要将该组件所在的节点标记为常驻节点
        //常驻节点---在场景切换时，不被自动销毁，常驻内存
        //可以利用常驻节点存储玩家信息等各种数据
        cc.game.addPersistRootNode(this.node);
        //取消一个节点的常驻属性
        //只是将节点还原为可在场景切换时销毁的节点，不会销毁该节点
        // cc.game.removePersistRootNode(this.node);

        this.showTip("I'm coming~~~");
        // this.showHintBox("confirm", function() {
        //     console.log("execute confirmCb");
        // });

        this.showHintBox("confirm", function () {
            console.log("execute confirmCb");
        }, function () {
            console.log("execute cancelCb");
        });

        console.log('gameName = ' + constant.gameName);
    },

    //声明构造函数
    ctor: function () {
        console.log('------game-control ctor');
    },

    showTip: function (tip) {
        var scene = cc.director.getScene();
        var tipItem = cc.instantiate(this.tipPrefab);
        tipItem.parent = scene;
        //cc.winSize---当前游戏窗口的大小
        tipItem.setPosition(cc.winSize.width / 2, cc.winSize.height / 3);
        tipItem.getComponent("tip").init(tip);
    },

    showHintBox: function (hint, confirmCb, cancelCb) {
        this.hintBoxNode.getComponent("hint-box").init(hint, confirmCb, cancelCb);
    }

    // start () {

    // },

    // update (dt) {},
});