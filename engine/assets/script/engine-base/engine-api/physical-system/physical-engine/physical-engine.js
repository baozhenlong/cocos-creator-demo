cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---物理系统
        //物理系统将box2d作为内部物理系统，并且隐藏了大部分box2d实现细节（比如创建刚体，同步刚体信息到节点中等）

        //---物理系统相关设置
        //1---开启物理系统；默认是关闭的
        cc.director.getPhysicsManager().enabled = true;
        //2---绘制物理调试信息，默认不会绘制任何调试信息
        //2.1---开启绘制
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit;
        //2.2---关闭绘制---设置标志位为0
        cc.director.getPhysicsManager().debugDrawFlags = 0;
        //3---物理单位到像素单位的转换
        //box2d使用米-千克-秒（MDS）单位制，box2d在这样的单位制下运算的表现是最佳的
        //在游戏运算中一般使用像素来作为长度单位制
        //一般设置转换比率：像素单位/物理单位 = 32；这个值（只读）可以通过cc.PhysicsManager.PIM_RADIO获取
        //通常用户不需要关心这个值，物理系统内部会自动对物理单位与像素单位进行转换，用户访问和设置的都是进行2d游戏开发中所熟悉的像素单位
        //4---设置物理重力
        //默认的重力加速度是（0, -320）像素/秒^2，按照上述的转换规则，即（0, -10）米/秒^2
        //4.1---设置重力加速度为0
        cc.director.getPhysicsManager().gravity = cc.v2(); //cc.v2(0,0)
        //4.2---设置重力加速度为其它值，比如每秒加速降落640像素
        cc.director.getPhysicsManager().gravity = cc.v2(0, -640);

        //查询物体---查找某个区域中有哪些物体
        //1---点测试---将测试是否有碰撞体会包含一个世界坐标系下的点，如果测试成功，则会返回一个包含这个点的碰撞体；如果有多个，返回一个随机的结果
        var collider = cc.director.getPhysicsManager().testPoint(cc.v2(0, 0));
        //2---矩形测试---将测试指定的一个世界坐标系下的矩形，如果一个碰撞体的包围盒与这个矩形有重叠部分，则这个碰撞体会给添加到返回列表中
        var colliderList = cc.director.getPhysicsManager().testAABB(cc.rect(10, 10, 10, 10));
        //3---射线测试---将测试给定的线段穿过哪些碰撞体；还可以获取到碰撞体在线段穿过碰撞体的那个点的法线向量和其他一些有用的信息
        var p1 = cc.v2(0, 0);
        var p2 = cc.v2(10, 10);
        var type = cc.RayCastType.Any;
        //参数type---指定检测的类型，射线检测支持4中类型
        //type---1---cc.RayCastType.Any---检测射线路径上任意的碰撞体，一旦检测到任何碰撞体，将立即结束检测，最快
        //type---2---cc.RayCastType.Closest---检测射线路径上最近的碰撞体，这是射线检测的默认值，稍慢
        //type---3---cc.RayCastType.All----检测射线路径上的所有碰撞体，检测到的结果顺序不是固定的
        //在这种检测类型下，一个碰撞体可能返回多个结果；因为box2d是通过检测夹具（fixture）来进行物体检测的，而一个碰撞体中可能由多个夹具组成，慢
        //type---4---cc.RayCastType.AllClosest---检测射线路径上所有的碰撞体，但是会对返回值进行删选，只返回每一个碰撞体距离射线起始点最近的那个点的相关信息，最慢
        var results = cc.director.getPhysicsManager().rayCast(p1, p2, type);
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            //射线检测的结果
            var collider = result.collider; //指定射线穿过的是哪一个碰撞体
            var point = result.point; //指定射线与穿过的碰撞体在哪一点相交
            var normal = result.normal; //指定碰撞体在相交点的表面的法线向量
            var fraction = result.fraction; //指定相交点在射线上的分数
        }


    },

    // start() {},

    // update (dt) {}
});