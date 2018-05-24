//挂载在content节点---parentNode
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad() {

    },

    init: function(uiJs, dataList) {
        console.log('------item-list-sup init');
        this.clear();
        this.uiJs = uiJs;
        this.dataList = dataList;
        this.initList();
    },

    initList: function() {
        var self = this;
        this.dataList.forEach(function(ele, index) {
            self.addItem(ele, index);
        });
    },

    addItem: function(data, index) {
        var item = cc.instantiate(this.itemPrefab);
        item.getComponent('item-sup').init(this.uiJs, this.node, data, index);
        item.parent = this.node;
    },

    clear: function() {
        if (this.uiJs) {
            this.uiJs = null;
        }
        if (this.dataList) {
            this.dataList = null;
        }
        this.node.removeAllChildren();
    }

    // start () {

    // },

    // update (dt) {},
});