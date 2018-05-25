cc.Class({

    extends: cc.Component,

    properties: {

    },


    onLoad() {
        //1---cc.game---是Game的实例，用来驱动整个游戏
        //1.1---cc.game.EVENT_HIDE（String）---游戏进入后台时触发的事件
        //1.2---cc.game.EVENT_SHOW（String）---游戏进入前台运行时触发的事件
        //1.3---cc.game.on---注册事件目标的特定事件类型回调
        //1.4---cc.game.off---删除之前用同类型、回调、目标、或useCapture注册的事件监听器；如果只传递type，将会删除type类型的所有事件监听器
    },

    //实例方法
    createVec2: function () {
        //通过cc.p简便创建cc.Vec2对象的2种方式---cc.Vec2表示2D向量和坐标
        console.log("cc.p 1 = " + JSON.stringify(cc.p(1, 2))); //{"x":1,"y":2}
        console.log("cc.p 2 = " + JSON.stringify(cc.p({
            x: 1,
            y: 2
        }))); //{"x":1,"y":2}
    }

    // start () {

    // },

    // update (dt) {},
});