var ItemSup = require('item-sup');
cc.Class({
    extends: ItemSup,

    properties: {
        label: cc.Label
    },

    onLoad() {

    },

    init: function(uiJs, parentNode, data, index) {
        this._super(uiJs, parentNode, data, index);
        this.label.string = data;
    },

    // start () {

    // },

    // update (dt) {},
});