cc.Class({
    extends: cc.Component,

    properties: {
        checkMarkNode: cc.Node,
        isChecked: false
    },

    onLoad() {},

    registerTouchEvent: function() {
        // console.log('------sup registerTouchEvent');
        this.node.on('touchend', this.touchHandle, this);
    },

    unregisterTouchEvent: function() {
        // console.log('------sup unregisterTouchEvent');
        this.node.off('touchend', this.touchHandle, this);
    },

    setCheck: function(value) {
        this.isChecked = value;
        this.checkMarkNode.active = value;
    }

    // start () {

    // },

    // update (dt) {},
});