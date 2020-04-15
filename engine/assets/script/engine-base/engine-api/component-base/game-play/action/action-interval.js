cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---ActionInterval
        //时间间隔动作，在已定的时间内完成；继承于FiniteTimeAction

        //---效果
        //1---缓动运动
        //ActionInterval.easing(easeObj)
        //缓动运动
        //参数easeObj（Object）----缓动对象
        //缓动对象---cc.easeIn(rate)---创建缓动对象，由慢到快
        //参数rate（Number）---速度
        //返回值（Object）---缓动对象
        //缓动对象---cc.easeOut(rate)---创建缓动对象，由快到慢        
        //缓动对象---cc.easeInOut(rate)---创建缓动对象，慢-快-慢 


        //---cc.delayTime(d)
        //延迟指定的时间量
        //参数d（Number）---持续时间，以秒为单位
        var delayTime = cc.delayTime(2);
        //返回值（ActionInterval）

        //---cc.sequence(action|actionArray)
        //顺序执行动作，创建的动作将按顺序依次执行
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（ActionInterval）
        // var seq = cc.sequence(finish1, delayTime, finish2, finish3);
        // var seq = cc.sequence([finish1, delayTime, finish2, finish3]);
        // this.actionNode.runAction(seq);

        //---cc.repeat(action, times)
        //有限次数重复一个动作   
        //参数action（FiniteTimeAction）
        //参数times（Number）---次数
        //返回值（ActionInterval）

        //---cc.repeatForever(action)
        //永远重复一个动作；不能被添加到cc.sequence或cc.spawn中 
        //参数action（FiniteTimeAction）
        //返回值（ActionInterval）    

        //---cc.spawn(action|actionArray)
        //同步执行动作
        //参数action|actionArray（FiniteTimeAction|[FiniteTimeAction]）
        //返回值（FiniteTimeAction）

        //---move
        //移动到目标位置
        //1.1---cc.moveTo(duration, position)
        //1.2---cc.moveTo(duration, x, y)
        //---cc.moveBy()
        //移动指定的距离
        //参数duration（Number）---动作持续时间
        //参数position（Vec2）---位置|距离
        //参数x（Number）---x轴坐标
        //参数y（Number）---x轴坐标
        //返回值（ActionInterval）

        //---scale
        //1---cc.scaleTo(duration, sx, sy)
        //将节点大小缩放到目标倍数
        //2---cc.scaleBy(duration, sx, sy)
        //按指定的倍数缩放节点大小
        //参数duration（Number）---动作持续时间
        //参数sx（Number）---scaleX
        //参数sy（Number）---scaleY，(sy != undefined) ? sy : sx
        // var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeIn(3));
        // var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeOut(3));
        var scaleTo = cc.scaleTo(5, 1.5, 2).easing(cc.easeInOut(3));

        //---rotate
        //1---rotateTo(duration, deltaAngleX, delaAngleY)
        //旋转到目标角度
        //2---rotateBy(duration, deltaAngleX, delaAngleY)
        //旋转指定的角度
        //参数duration（Number）---动作持续时间
        //参数deltaAngleX---旋转的x轴角度
        //参数deltaAngleY---旋转的y轴角度，(deltaAngleY != undefined) ? deltaAngleY : deltaAngleX
        //deltaAngleX === deltaAngleY时，是平面旋转
        //返回值（ActionInterval）        
        var rotateBy = cc.rotateBy(5, 45);

        //---opacity
        //1---cc.fadeTo(duration, opacity)
        //修改透明度到指定值
        //参数duration（Number）
        //参数opacity（Number）---[0, 255]
        //返回值（ActionInterval）        
        //2---cc.fadeIn(duration)
        //渐显效果
        //参数duration（Number）
        //返回值（ActionInterval）  
        //3---cc.fadeOut(duration)
        //渐隐效果
        //参数duration（Number）
        //返回值（ActionInterval）  

        //---color
        //1---cc.tintTo(duration, red, green, blue)
        //修改颜色到指定值
        //参数duration（Number）
        //参数red（Number）---[0, 255]
        //参数green（Number）---[0, 255]
        //参数blue（Number）---[0, 255]
        //2---cc.tintBy(duration, deltaRed, deltaGreen, deltaBlue)
        //参数duration（Number）
        //参数deltaRed（Number）
        //参数deltaGreen（Number）
        //参数deltaBlue（Number）
        //按指定的增量修改颜色

        //返回值（ActionInterval）  

        //---bezierTo(t, c)
        //按贝塞尔曲线轨迹移动到目标位置
        //参数t（Number）---动作持续时间
        //参数c（[Vec2]）---贝塞尔曲线参考点
        //返回值（ActionInterval）        
        var startPos = cc.v2(-640, -320); //node当前位置
        this.node.setPosition(startPos);
        var controlPos = cc.v2(0, 0);
        var endPos = cc.v2(640, -320);
        var bezier = [startPos, controlPos, endPos];
        var bezierTo = cc.bezierTo(5, bezier);
        // this.node.runAction(cc.spawn(scaleTo, rotateBy, bezierTo));
        this.node.runAction(bezierTo);

    },

    // start() {},

    // update (dt) {}
});