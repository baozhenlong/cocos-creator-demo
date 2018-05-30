cc.Class({

    extends: cc.Component,

    properties: {
        actionNode: cc.Node
    },

    onLoad() {
        //cc---Cocos引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义

        //1---cc.game---是Game的实例，用来驱动整个游戏
        //1.1---cc.game.EVENT_HIDE（String）---游戏进入后台时触发的事件
        //1.2---cc.game.EVENT_SHOW（String）---游戏进入前台运行时触发的事件
        //1.3---cc.game.on---注册事件目标的特定事件类型回调
        //1.4---cc.game.off---删除之前用同类型、回调、目标、或useCapture注册的事件监听器；如果只传递type，将会删除type类型的所有事件监听器

        //2---cc.Enum(obj)---定义一个枚举类型，可以把枚举值设为任意的整数，如果设为-1，系统将会分配为上一个枚举值+1
        //参数obj（Object）
        var direction = cc.Enum({
            up: -1,
            down: -1,
            left: 4,
            right: -1
        });
        console.log('direction.up = ' + direction.up); //0
        console.log('direction.down = ' + direction.down); //0+1
        console.log('direction = ' + JSON.stringify(direction));
        //direction = {"up":0,"down":1,"left":4,"right":5}

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