cc.Class({
    extends: cc.Component,

    properties: {
        listNode: cc.Node
    },

    onLoad() {
        this.labelData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    },

    initUi: function() {
        this.listNode.getComponent('item-list-sup').init(this, this.labelData);
    }

    // start () {

    // },

    // update (dt) {},
});