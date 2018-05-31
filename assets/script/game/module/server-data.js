var serverData = cc.Class({

    properties: {
        serverId: 0
    },


    onLoad() {

    },

    //更新服务器信息
    updateServerData: function(server) {
        this.serverId = server.serverId ? server.serverId : this.serverId;
    }

    // start () {

    // },

    // update (dt) {},
});

module.exports = serverData;