cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    //弹出窗口
    popup: function(params, openFunc, closeFunc) {
        console.log('------popup popup-sup');
        console.log('------popup params = ' + JSON.stringify(params));
        // console.log('------popup openFunc = ' + openFunc);
        // console.log('------popup closeFunc = ' + closeFunc);
        this.params = params;
        this.openFunc = openFunc;
        this.closeFunc = closeFunc;
        this.openFunc();
        this.registerServerMsg();
    },

    //隐藏窗口
    hide: function() {
        console.log("------hide popup-sup");
        this.closeFunc();
        this.params = null;
        this.openFunc = null;
        this.closeFunc = null;
        this.unregisterSeverMsg();
    },

    //注册服务端消息
    registerServerMsg: function() {

    },

    //取消注册服务端消息
    unregisterSeverMsg: function() {

    },

    // start () {

    // },

    // update (dt) {},
});