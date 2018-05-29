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

        //3---Action类---所有动作类型的基类
        //3.1---FiniteTimeAction类型---有限时间动作，拥有时长duration属性；继承于Action
        //3.1.1---ActionInstant类型---即时动作，立即会执行；继承于FiniteTimeAction
        //3.1.1.1---cc.callFunc(selector, selectorTarget = null, data = null)---执行回调函数
        //参数selector（Function）---回调函数---function(target, data){}
        //回调函数参数target（Object）---事件目标
        //回调函数参数data（Any）---参数中的data
        //参数selectorTarget（Object）---绑定回调函数的this
        //参数data（Any）---回调函数的参数
        //返回值（ActionInstant）
        var finish1 = cc.callFunc(function (target, data) {
            console.log('callFunc typeof target  = ' + (typeof target)); //Object
            console.log('callFunc target = ' + (target instanceof cc.Node)); //true
            console.log('callFunc target.name = ' + target.name); //cocos
            console.log('this.actionNode.name = ' + this.actionNode.name); //cocos---节点名字
            console.log('callFunc has data = ' + data); //callFunc
        }, this, 'callFunc');
        var finish2 = cc.callFunc(function (target, data) {
            console.log('callFunc no data no this');
            console.log('callFunc this = ' + this); //null                        
            console.log('callFunc data = ' + data); //null            
        });
        var finish3 = cc.callFunc(this.callFuncCallback, this, 'callFuncCallback'); //cocos, callFuncCallback     
        //3.1.2---ActionInterval---时间间隔动作，在已定的时间内完成；继承于FiniteTimeAction
        //3.1.2.1---cc.delayTime(d)---延迟指定的时间量
        //参数d（Number）---持续时间，以秒为单位
        var delayTime = cc.delayTime(2);
        //返回值（ActionInterval）
        //3.1.2.2---cc.sequence(action|actionArray)---顺序执行动作，创建的动作将按顺序依次执行
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（ActionInterval）
        var seq = cc.sequence(finish1, delayTime, finish2, finish3);
        // var seq = cc.sequence([finish1, delayTime, finish2, finish3]);
        this.actionNode.runAction(seq);
        //3.1.2.3---cc.scaleTo(duration, sx, sy)---将节点大小缩放到指定的倍数
        //参数duration（Number）
        //参数sx（Number）---scaleX
        //参数sy（Number）---scaleY，(sy != null) ? sy : sx
        var scale = cc.scaleTo(2, 1.5, 2);
        this.actionNode.runAction(scale);
    },

    callFuncCallback: function (target, data) {
        console.log('target.name = ' + target.name);
        console.log('callFuncCallback data = ' + data);
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