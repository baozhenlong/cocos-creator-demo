var ItemSup = require('item-sup');
cc.Class({
    extends: ItemSup,

    properties: {
        checkMarkNode: cc.Node,
        isChecked: false
    },

    onLoad() {},

    registerTouchEvent: function() {
        // console.log('------toggle-group-sup registerTouchEvent');
        this.node.on('touchend', this.touchHandle, this);
    },

    unregisterTouchEvent: function() {
        // console.log('------toggle-group-sup unregisterTouchEvent');
        this.node.off('touchend', this.touchHandle, this);
    },

    touchHandle: function() {
        console.log('------toggle-group-sup touchHandle');
        this.updateCheckMark(this.index);
    },

    updateCheckMark: function(index) {
        console.log('------updateCheckMark index = ' + index);
        var children = this.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            children[i].getComponent('item-sup').setCheck(i === index);
        }
    },

    setCheck: function(value) {
        this.isChecked = value;
        this.checkMarkNode.active = value;
    }

    // start () {

    // },

    // update (dt) {},
});