var PopupSup = require('popup-sup');
cc.Class({
    extends: PopupSup,

    properties: {
        bagUiNode: cc.Node
    },

    //弹出窗口
    popup: function(params, openFunc, closeFunc) {
        this._super(params, openFunc, closeFunc);
        this.bagUiJs = this.bagUiNode.getComponent('bag-ui');
        this.bagUiJs.initUi();
    },

    //隐藏窗口
    hide: function() {
        this._super();
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