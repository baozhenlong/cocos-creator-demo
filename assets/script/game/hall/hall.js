var SceneSup = require('scene-sup');
cc.Class({
    extends: SceneSup,

    properties: {

    },

    onLoad() {
        this._super();
        console.log('------hall onLoad this.time = ' + this.time);
    },

    registerMsg: function () {
        this._super();
        console.log('------hall registerMsg');
    },

    unregisterMsg: function () {
        this._super();
        console.log('------hall unregisterMsg');
    },

    onBagClicked: function () {
        cc.vv.popupMgr.showPopup(constant.popupKeyObj.bag, {
            openFunc: function () {
                console.log('------execute Open');
            },
            isCleanup: true
        });
    },

    onJumpTipClicked: function () {
        cc.vv.popupMgr.showPopup(constant.popupKeyObj.jumpTip, {}, [
            'tip is tip tip tip tip',
            function goFunc() {
                console.log('execute go func');
            }
        ]);
    },

    onLabelListClicked: function () {
        cc.vv.popupMgr.showPopup(constant.popupKeyObj.labelList);
    },

    onBackClicked: function () {
        cc.director.loadScene('loading');
    },

    onEnterDdzClicked: function () {
        cc.director.loadScene('ddz');
    },

    start() {
        this.registerMsg();
    },

    onDestroy: function () {
        this.unregisterMsg();
    }

    // update(dt) {
    //     this._super(dt);
    // },
});