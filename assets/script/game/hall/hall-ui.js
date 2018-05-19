cc.Class({
    extends: cc.Component,

    properties: {
        bagNode: cc.Node,
        nobleNode: cc.Node
    },

    onLoad() {
        this.initRedTipUi();
    },

    initRedTipUi: function() {
        commonFunc.updateRedTip(this.bagNode, constant.redTipKeyObj.bag);
        commonFunc.updateRedTip(this.nobleNode, constant.redTipKeyObj.noble);
    },


    // start () {

    // },

    // update (dt) {},
});