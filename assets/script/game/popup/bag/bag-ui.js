cc.Class({
    extends: cc.Component,


    properties: {
        bagContentNode: cc.Node,
        nameLb: cc.Label,
        detailLb: cc.Label,
        useNode: cc.Node,
        bagItemPrefab: cc.Prefab
    },

    onLoad() {
        this.propConfig = {
            "1": {
                "id": "1",
                "name": "喇叭卡",
                "detail": "在喇叭频道发言",
                "use": true
            },
            "2": {
                "id": "2",
                "name": "炸弹",
                "detail": "在房间使用",
                "use": true
            },
            "3": {
                "id": "3",
                "name": "烟花",
                "detail": "送给好友",
                "use": true
            },
            "4": {
                "id": "4",
                "name": "444444",
                "detail": "biubiu",
                "use": false
            },
            "5": {
                "id": "5",
                "name": "55555",
                "detail": "win",
                "use": false
            }
        };
        this.list = ['1', '2', '3', '4', '5'];
        this.getCurDate();
        this.getBagData();
    },

    getCurDate: function() {

    },

    getBagData: function() {
        console.log("getBagData");
        this.propList = [];
        for (var i = 0; i < this.list.length; i++) {
            var prop = this.propConfig[this.list[i]];
            if (prop) {
                this.propList.push(this.propConfig[this.list[i]]);
            }
        }
        console.log("propList = " + JSON.stringify(this.propList));
        console.log("propList length = " + this.propList.length);
    },

    initUi: function() {
        var self = this;
        this.bagContentNode.removeAllChildren();
        this.propList.forEach(function(ele, index) {
            self.addBagItem(ele, index);
        });
    },

    addBagItem: function(data, index) {
        var item = cc.instantiate(this.bagItemPrefab);
        item.getComponent('bag-item').init(this, data, index);
        item.parent = this.bagContentNode;
    },

    updateCheckMark: function(index) {
        var children = this.bagContentNode.children;
        for (let i = 0; i < children.length; i++) {
            children[i].getComponent('bag-item').setCheck(i === index);
        }
    },

    updateDetailUi: function(name, detail, isVisible) {
        this.nameLb.string = name;
        this.detailLb.string = detail;
        this.useNode.getComponent('node-ui').setVisible(isVisible);
    },

    // start () {

    // },

    // update (dt) {},
});