cc.Class({
    extends: cc.Component,

    properties: {
        bagNode: cc.Node
    },

    onLoad() {
        this.initRedTipUi();
    },

    initRedTipUi: function () {
        commonFunc.updateRedTip(this.bagNode, constant.redTipKeyObj.bag);
    },


    // start () {

    // },

    // update (dt) {},
});