var playerData = cc.Class({

    properties: {
        userId: 0,
        userName: ""
    },


    // onLoad() {

    // },

    ctor: function () {
        this.initParseMsgFunc();
    },

    initParseMsgFunc: function () {
        this.parseMsgFunc = {
            test: {
                route: 'test',
                func: this.onTest
            },
            coinChange: {
                route: 'coinChange',
                func: this.onCoinChange
            }
        }
    },

    onTest: function () {
        console.log('------onTest');
    },

    onCoinChange: function () {
        console.log('------onCoinChange');
    },

    storeMsg: function (route, msg) {
        for (var key in this.parseMsgFunc) {
            var ele = this.parseMsgFunc[key];
            if (ele.route === route) {
                ele.func(msg);
            }
        }
    },

    //更新玩家信息
    updatePlayerData: function (player) {
        this.userId = player.userId ? player.userId : this.userId;
        this.userName = player.userName ? player.userName : this.userName;
    }

    // start () {

    // },

    // update (dt) {},
});

module.exports = playerData;