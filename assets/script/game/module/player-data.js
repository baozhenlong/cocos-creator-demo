var playerData = cc.Class({

    properties: {
        userId: 0,
        userName: ""
    },


    onLoad() {

    },

    //更新玩家信息
    updatePlayerData: function(player) {
        this.userId = player.userId ? player.userId : this.userId;
        this.userName = player.userName ? player.userName : this.userName;
    }

    // start () {

    // },

    // update (dt) {},
});

module.exports = playerData;