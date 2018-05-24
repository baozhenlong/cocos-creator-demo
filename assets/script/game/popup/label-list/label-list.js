var PopupSup = require('popup-sup');
cc.Class({
    extends: PopupSup,

    properties: {
        labelListUiNode: cc.Node
    },

    onLoad() {

    },

    //弹出窗口
    popup: function(params, openFunc, closeFunc) {
        this._super(params, openFunc, closeFunc);
        this.labelListUiJs = this.labelListUiNode.getComponent('label-list-ui');
        this.labelListUiJs.initUi();
    },

    //隐藏窗口
    hide: function() {
        this._super();
    },

    // start () {

    // },

    // update (dt) {},
});