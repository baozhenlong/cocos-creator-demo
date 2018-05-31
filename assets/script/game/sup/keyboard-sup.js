cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad() {

    // },

    registerMsg: function () {
        console.log('------keyboard-sup registerMsg');
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    unregisterMsg: function () {
        console.log('------keyboard-sup unregisterMsg');
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function (event) {
        console.log("------keyboard-sup onKeyDown event.keyCode = " + event.keyCode);
        if (event.keyCode === cc.KEY.back) {
            console.log('------keyboard-sup back');
        }
    }

    // start () {

    // },

    // update (dt) {},
});