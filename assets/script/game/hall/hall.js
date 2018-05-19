cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    onBagClicked: function() {
        cc.vv.popupMgr.showPopup(constant.popupKeyObj.bag, {
            openFunc: function() {
                console.log('------execute Open');
            },
            isCleanup: true
        });
    }

    // start () {

    // },

    // update (dt) {},
});