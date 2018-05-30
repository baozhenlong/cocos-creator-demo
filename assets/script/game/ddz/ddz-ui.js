cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad() {

    // },

    //展示等待界面
    showWaitUi: function () {},

    //展示准备界面    
    showReadyUi: function () {},

    //展示游戏开始，发牌界面    
    showDealUi: function () {},

    //叫地主，抢地主，加倍界面
    updateLandlordUi: function () {
        //1---叫地主
        // this.jiaoHandle();
        //2---抢地主
        // this.qiangHandle();
        //3---加倍
        // this.jiaBeiHandle();
        //4---更新地主牌
        //this.showLandlordCard();
    },

    //叫分处理
    jiaoHandle: function () {},

    //抢地主处理
    qiangHandle: function () {},

    //加倍处理
    jiaBeiHandle: function () {},

    //展示地主牌
    showLandlordCard: function () {},

    //出牌界面
    showOutCardUi: function () {
        //1---游戏首轮出牌通知处理
        // this.beginOutHandle();
        //2---出牌通知
        // this.outHandle();
    },

    //游戏首轮出牌通知处理
    beginOutHandle: function () {},

    //出牌通知处理
    outHandle: function () {},

    //游戏结束界面
    showEndUi: function () {
        this.endHandle();
    },
    //游戏结束处理
    endHandle: function () {}

    // start () {

    // },

    // update (dt) {},
});