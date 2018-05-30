var SceneSup = require('scene-sup');
cc.Class({
    extends: SceneSup,

    properties: {

    },

    // onLoad() {
    //     console.log('------room onLoad');
    //     this._super();
    // },

    registerMsg: function () {
        this._super();
        console.log('------room-sup registerMsg');
        //后台监听
        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseAll();
        });
        //前台监听
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.audioEngine.resumeAll();
        });
    },

    unregisterMsg: function () {
        this._super();
        console.log('------room-sup unregisterMsg');
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_SHOW);
    },

    executeGameFunc: function (gameFunc, scope, params) {
        console.log('------room-sup executeGameFunc');
        console.log('------room-sup params = ' + JSON.stringify(params));
        this.gameFunc = gameFunc;
        this.gameFunc.apply(scope, params);
    },

    //退出游戏
    back: function () {
        //垃圾收集
        cc.sys.garbageCollect();
        cc.director.loadScene('hall');
    },

    start() {
        this._super();
        console.log('------room-sup start');
        this.registerMsg(); //在调用方法时，总是先去找有没有子类扩展的方法，如果没有就去父类中找（层层递进）
    },

    onDestroy: function () {
        console.log('------room-sup onDestroy');
        this.unregisterMsg();
        this._super();
    }

    // update (dt) {},
});