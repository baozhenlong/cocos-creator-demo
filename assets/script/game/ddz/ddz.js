var RoomSup = require('room-sup');
cc.Class({
    extends: RoomSup,

    properties: {
        ddzUiNode: cc.Node
    },

    onLoad() {
        console.log('------ddz onLoad');
        this._super();
        this._gameControlJs.showTip('------ddz------');
        this.ddzUiJs = this.ddzUiNode.getComponent('ddz-ui');
    },

    registerMsg: function () {
        this._super();
        console.log('------ddz registerMsg');
        this._gameControlJs.node.on(c2s.ddzJoinTable, this.joinTableResp, this);
        this._gameControlJs.node.on(c2s.ddzReady, this.readyResp, this);
        this._gameControlJs.node.on(c2s.ddzJiao, this.jiaoResp, this);
        this._gameControlJs.node.on(c2s.ddzQiang, this.qiangResp, this);
        this._gameControlJs.node.on(c2s.ddzJiaBei, this.jiaBeiResp, this);
        this._gameControlJs.node.on(c2s.ddzStartNotify, this.startNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzJiaoNotify, this.jiaoNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzQiangNotify, this.qiangNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzStartJiaBeiNotify, this.startJiaBeiNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzJiaBeiNotify, this.jiaBeiNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzBeginOutNotify, this.beginOutNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzOutNotify, this.outNotifyResp, this);
        this._gameControlJs.node.on(c2s.ddzSendOutCard, this.sendOutCardResp, this);
        this._gameControlJs.node.on(c2s.ddzEndNotify, this.endNotifyResp, this);

    },

    unregisterMsg: function () {
        this._super();
        console.log('------ddz unregisterMsg');
        this._gameControlJs.node.off(c2s.ddzJoinTable, this.joinTableResp, this);
        this._gameControlJs.node.off(c2s.ddzReady, this.readyResp, this);
        this._gameControlJs.node.off(c2s.ddzJiao, this.jiaoResp, this);
        this._gameControlJs.node.off(c2s.ddzQiang, this.qiangResp, this);
        this._gameControlJs.node.off(c2s.ddzJiaBei, this.jiaBeiResp, this);
        this._gameControlJs.node.off(c2s.ddzStartNotify, this.startNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzJiaoNotify, this.jiaoNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzQiangNotify, this.qiangNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzStartJiaBeiNotify, this.startJiaBeiNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzJiaBeiNotify, this.jiaBeiNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzBeginOutNotify, this.beginOutNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzOutNotify, this.outNotifyResp, this);
        this._gameControlJs.node.off(c2s.ddzSendOutCard, this.sendOutCardResp, this);
        this._gameControlJs.node.off(c2s.ddzEndNotify, this.endNotifyResp, this);


    },

    //请求进入桌子
    joinTable: function () {

    },
    //进入桌子
    joinTableResp: function (event) {
        var data = event.getUserData();
        var info = true;
        if (info) {
            //等待游戏开始
            this.setGameWait(info);
        } else {
            //游戏开始，发牌阶段
            this.setGameDeal();
        }
    },

    //请求准备
    onReadyClicked: function () {},
    //准备
    readyResp: function (event) {
        var data = event.getUserData();
        this.setGameReady();
    },

    //游戏开始
    startNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameDeal();
    },

    //叫地主
    onJiaoClicked: function () {},

    jiaoNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameLandlord();
    },

    //抢地主
    onQiangClicked: function () {},

    qiangNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameLandlord();
    },

    startJiaBeiNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameLandlord();
    },

    //加倍
    onJiaBeiClicked: function () {},

    jiaBeiNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameLandlord();
    },

    //开始出牌通知
    beginOutNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameOutCard();
    },

    //出牌通知
    outNotifyResp: function (event) {
        var data = event.getUserData();
        this.setGameOutCard();
    },

    //出牌
    onSendOutCard: function () {},

    //游戏结束
    endNotifyResp: function () {
        var data = event.getUserData();
        this.setGameEnd();
    },

    //游戏界面逻辑
    //等待游戏开始
    setGameWait: function (data) {
        this.executeGameFunc(this.ddzUiJs.showWaitUi, this.ddzUiJs, [data]);
    },
    //准备界面
    setGameReady: function (data) {
        this.executeGameFunc(this.ddzUiJs.showReadyUi, this.ddzUiJs, [data]);
    },
    //游戏开始，发牌
    setGameDeal: function (data) {
        this.executeGameFunc(this.ddzUiJs.showDealUi, this.ddzUiJs, [data]);
    },
    //叫地主，抢地主，加倍
    setGameLandlord: function (data) {
        this.executeGameFunc(this.ddzUiJs.updateLandlordUi, this.ddzUiJs, [data]);
    },
    //出牌
    setGameOutCard: function (data) {
        this.executeGameFunc(this.ddzUiJs.showOutCardUi, this.ddzUiJs, [data]);
    },
    //游戏结束
    setGameEnd: function (data) {
        this.executeGameFunc(this.ddzUiJs.showEndUi, this.ddzUiJs, [data]);
    },

    onBackClicked: function () {
        this.back();
    }

    // start () {

    // },

    // update (dt) {},
});