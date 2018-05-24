cc.Class({
    extends: cc.Component,


    properties: {
        bagContentNode: cc.Node,
        nameLb: cc.Label,
        detailLb: cc.Label,
        useNode: cc.Node
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
        this.getBagData();
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
        this.bagContentNode.getComponent('item-list-sup').init(this, this.propList);
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