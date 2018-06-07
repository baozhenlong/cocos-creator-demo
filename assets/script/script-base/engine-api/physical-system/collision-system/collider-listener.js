cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.touchingNum = 0;
    },

    onEnable: function () {
        //获取碰撞检测系统
        this.manager = cc.director.getCollisionManager();
        //开启碰撞检测系统；默认是禁用的
        this.manager.enabled = true;
        //开启debug绘制---可显示碰撞组件的碰撞检测范围；默认是禁用的
        this.manager.enabledDebugDraw = true;
        //显示碰撞组件的包围盒
        this.manager.enabledDrawBoundingBox = true;
    },

    onDisable: function () {
        this.manager.enabled = false;
        this.manager.enabledDebugDraw = false;
    },

    //----碰撞系统回调
    //other---产生碰撞的另一个碰撞组件
    //own---产生碰撞的自身的碰撞组件
    //1---当碰撞产生时调用
    onCollisionEnter: function (other, own) {
        this.node.color = cc.Color.RED;
        this.touchingNum++;
        console.log('node.name = ' + this.node.name);
        //---tag---当一个节点上有多个碰撞组件时，在发生碰撞时，可以使用标签tag来判断是节点上的哪个碰撞组件被碰撞了
        var tag = own.tag;

        //---world属性---碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到world这个属性里面
        var ownWorld = own.world;
        var otherWorld = other.world;

        // 碰撞组件的 aabb 碰撞框---{"x":0, "y":0,"width":0, "height":0}
        var ownAabb = ownWorld.aabb;
        var otherAabb = otherWorld.aabb;
        console.log('ownAabb = ' + JSON.stringify(ownAabb));
        // console.log('otherAabb = ' + JSON.stringify(otherAabb));
        // 上一次计算的碰撞组件的 aabb 碰撞框
        var ownPreAabb = ownWorld.preAabb.clone();
        console.log('ownPreAabb = ' + JSON.stringify(ownPreAabb));

        // 碰撞框的世界矩阵
        // var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        // var r = world.radius;
        // var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        // var ps = world.points;
    },
    //2---当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
    onCollisionStay: function (other, own) {

    },
    //3---当碰撞结束后调用
    onCollisionExit: function (other, own) {
        this.touchingNum--;
        if (this.touchingNum === 0) {
            this.node.color = cc.Color.WHITE;
        }
    },

    // start () {

    // },

    // update (dt) {},
});