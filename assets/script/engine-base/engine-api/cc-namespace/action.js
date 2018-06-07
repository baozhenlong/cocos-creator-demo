cc.Class({
    extends: cc.Component,

    properties: {
        actionNode: cc.Node,
        followNode: cc.Node
    },

    onLoad() {
        //---Action类---所有动作类型的基类
        //1---cc.follow(followedNode, rect)---追踪目标节点的位置
        //Canvas下节点不动，根节点位置随followedNode变动
        //参数followedNode（Node）
        //可选参数rect（Rect）---rect = rect : cc.rect(0, 0, 0, 0)
        //返回值---Action|Null
        var followAction = cc.follow(this.followNode);
        this.node.runAction(followAction);

        //---FiniteTimeAction类型---有限时间动作，拥有时长duration属性；继承于Action

        //---节点动作函数
        //1---runAction(action)---执行并返回该执行的动作，该节点将会变成动作的目标；调用时，节点自身处于不激活状态将不会有任何效果
        //参数action（Action）
        // this.node.runAction(action);
        //2---stopAllActions()---停止并且移除所有正在运行的动作列表
        // this.node.stopAllActions();

        //---ActionInstant类型---即时动作，立即会执行；继承于FiniteTimeAction
        //1---cc.callFunc(selector, selectorTarget = null, data = null)---执行回调函数
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
        //2---cc.hide()---立即隐藏
        //返回值（ActionInstant）
        //3---cc.removeSelf(isNeedCleanup)---从父节点移除自身
        //参数isNeedCleanup（Boolean）

        //---ActionInterval---时间间隔动作，在已定的时间内完成；继承于FiniteTimeAction
        //1---start---缓动运动
        //ActionInterval.easing(easeObj)---缓动运动
        //参数easeObj（Object）----cc.easeIn(rate)或cc.easeOut(rate)的返回值
        //cc.easeIn(rate)---创建缓动对象，由慢到快
        //参数rate（Number）---速度
        //返回值（Object）
        //cc.easeOut(rate)---创建缓动对象，由快到慢        
        //cc.easeInOut(rate)---创建缓动对象，慢-快-慢 
        //1---end---缓动运动              
        //2---cc.delayTime(d)---延迟指定的时间量
        //参数d（Number）---持续时间，以秒为单位
        var delayTime = cc.delayTime(2);
        //返回值（ActionInterval）
        //3---cc.sequence(action|actionArray)---顺序执行动作，创建的动作将按顺序依次执行
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（ActionInterval）
        var seq = cc.sequence(finish1, delayTime, finish2, finish3);
        // var seq = cc.sequence([finish1, delayTime, finish2, finish3]);
        // this.actionNode.runAction(seq);
        //4---cc.scaleTo(duration, sx, sy)---将节点大小缩放到目标倍数
        //---cc.scaleBy(duration, sx, sy)---按目标倍数缩放节点大小
        //参数duration（Number）---动作持续时间
        //参数sx（Number）---scaleX
        //参数sy（Number）---scaleY，(sy != undefined) ? sy : sx
        // var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeIn(3));
        // var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeOut(3));
        var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeInOut(3));
        //5---rotateBy(duration, deltaAngleX, delaAngleY)---旋转目标角度
        //---rotateTo(duration, deltaAngleX, delaAngleY)---旋转到目标角度
        //参数duration（Number）---动作持续时间
        //参数deltaAngleX---旋转的x轴角度
        //参数deltaAngleY---旋转的y轴角度，(deltaAngleY != undefined) ? deltaAngleY : deltaAngleX
        //deltaAngleX === deltaAngleY时，是平面旋转
        //返回值（ActionInterval）        
        var rotateBy = cc.rotateBy(5, 45);
        //6---bezierTo(t, c)---按贝塞尔曲线轨迹移动到目标位置
        //参数t（Number）---动作持续时间
        //参数c（[Vec2]）---贝塞尔曲线参考点
        //返回值（ActionInterval）        
        var startPos = cc.p(0, 0);
        var endPos = cc.p(640, 320);
        var controlPos = cc.p(860, 480);
        var bezier = [startPos, controlPos, endPos];
        var bezierTo = cc.bezierTo(5, bezier);
        this.actionNode.runAction(cc.spawn(scaleTo, rotateBy, bezierTo));
        //7---1---moveTo(duration, position)---移动到目标位置
        //7---2---moveTo(duration, x, y)---移动到目标位置
        //---moveBy()---移动目标距离
        //参数duration（Number）---动作持续时间
        //参数position（Vec2）---位置|距离
        //参数x（Number）---x轴坐标
        //参数y（Number）---x轴坐标
        //返回值（ActionInterval）
        //8---repeat(action, times)---有限次数重复一个动作   
        //参数action（FiniteTimeAction）
        //参数times（Number）---次数
        //返回值（ActionInterval）
        //9---repeatForever(action)---永远重复一个动作；不能被添加到cc.sequence或cc.spawn中 
        //参数action（FiniteTimeAction）
        //返回值（ActionInterval）    

        //---cc.spawn(action|actionArray)---同步执行动作
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（FiniteTimeAction）
    },

    callFuncCallback: function (target, data) {
        console.log('target.name = ' + target.name);
        console.log('callFuncCallback data = ' + data);
    },

    onToRightClicked: function () {
        this.followNode.x += 100;
    }

    // start () {

    // },

    // update (dt) {},
});