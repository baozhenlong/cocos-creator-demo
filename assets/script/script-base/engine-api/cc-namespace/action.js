cc.Class({
    extends: cc.Component,

    properties: {
        actionNode: cc.Node
    },

    onLoad() {
        //Action类---所有动作类型的基类
        //FiniteTimeAction类型---有限时间动作，拥有时长duration属性；继承于Action

        //1---节点动作函数
        //1.1---runAction(action)---执行并返回该执行的动作，该节点将会变成动作的目标；调用时，节点自身处于不激活状态将不会有任何效果
        //参数action（Action）
        // this.node.runAction(action);
        //1.2---stopAllActions()---停止并且移除所有正在运行的动作列表
        // this.node.stopAllActions();

        //2---ActionInstant类型---即时动作，立即会执行；继承于FiniteTimeAction
        //2.1---cc.callFunc(selector, selectorTarget = null, data = null)---执行回调函数
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
        //2.2---cc.hide()---立即隐藏
        //返回值（ActionInstant）
        //2.3---cc.removeSelf(isNeedCleanup)---从父节点移除自身
        //参数isNeedCleanup（Boolean）

        //3---ActionInterval---时间间隔动作，在已定的时间内完成；继承于FiniteTimeAction
        //---start---缓动运动
        //ActionInterval.easing(easeObj)---缓动运动
        //参数easeObj（Object）----cc.easeIn(rate)或cc.easeOut(rate)的返回值
        //cc.easeIn(rate)---创建缓动对象，由慢到快
        //参数rate（Number）---速度
        //返回值（Object）
        //cc.easeOut(rate)---创建缓动对象，由快到慢        
        //cc.easeInOut(rate)---创建缓动对象，慢-快-慢 
        //---end---缓动运动              
        //3.1---cc.delayTime(d)---延迟指定的时间量
        //参数d（Number）---持续时间，以秒为单位
        var delayTime = cc.delayTime(2);
        //返回值（ActionInterval）
        //3.2---cc.sequence(action|actionArray)---顺序执行动作，创建的动作将按顺序依次执行
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（ActionInterval）
        var seq = cc.sequence(finish1, delayTime, finish2, finish3);
        // var seq = cc.sequence([finish1, delayTime, finish2, finish3]);
        // this.actionNode.runAction(seq);
        //3.3---cc.scaleTo(duration, sx, sy)---将节点大小缩放到指定的倍数
        //参数duration（Number）---动作持续时间
        //参数sx（Number）---scaleX
        //参数sy（Number）---scaleY，(sy != undefined) ? sy : sx
        // var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeIn(3));
        // var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeOut(3));
        var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeInOut(3));
        //3.4---rotateBy(duration, deltaAngleX, delaAngleY)---旋转指定的角度
        //参数duration（Number）---动作持续时间
        //参数deltaAngleX---旋转的x轴角度
        //参数deltaAngleY---旋转的y轴角度，(deltaAngleY != undefined) ? deltaAngleY : deltaAngleX
        //deltaAngleX === deltaAngleY时，是平面旋转
        var rotateBy = cc.rotateBy(5, 45);
        //3.5---bezierTo(t, c)---按贝塞尔曲线轨迹移动到目标位置
        //参数t（Number）---动作持续时间
        //参数c（[Vec2]）---贝塞尔曲线参考点
        var startPos = cc.p(0, 0);
        var endPos = cc.p(640, 320);
        var controlPos = cc.p(860, 480);
        var bezier = [startPos, controlPos, endPos];
        var bezierTo = cc.bezierTo(5, bezier);
        this.actionNode.runAction(cc.spawn(scaleTo, rotateBy, bezierTo));

        //4---cc.spawn(action|actionArray)---同步执行动作
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（FiniteTimeAction）

    },

    callFuncCallback: function (target, data) {
        console.log('target.name = ' + target.name);
        console.log('callFuncCallback data = ' + data);
    },

    // start () {

    // },

    // update (dt) {},
});