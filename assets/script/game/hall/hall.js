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
    },

    onJumpTipClicked: function() {
        cc.vv.popupMgr.showPopup(constant.popupKeyObj.jumpTip, {}, [
            'tip is tip tip tip tip',
            function goFunc() {
                console.log('execute go func');
            }
        ]);
    }

    // start () {

    // },

    // update (dt) {},
});