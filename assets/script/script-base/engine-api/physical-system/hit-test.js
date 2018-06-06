cc.Class({
    extends: cc.Component,

    properties: {
        titleLb: cc.Label,
        collider: cc.PolygonCollider
    },

    onLoad() {
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.manager.enabledDebugDraw = true;
        this.titleLb.string = 'normal';
        //this.collider.points---相对于节点坐标系
        console.log('this.collider.points' + JSON.stringify(this.collider.points));
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                console.log('------touchBegan');
                var touchLoc = touch.getLocation();
                //如果是其它类型的碰撞组件也可以再cc.Intersection中找到相应的测试函数
                //---pointInPolygon(point, polygon)---测试一个点是否再一个多边形中
                //参数point（Vec2）---测试点
                //参数polygon（[Vec2]）---多边形
                //---collider.world.points---碰撞系统计算出碰撞组件在世界坐标系下的相关值，并放到world属性里
                console.log('this.collider.world.points' + JSON.stringify(this.collider.world.points));
                if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
                    this.titleLb.string = 'Hit';
                } else {
                    this.titleLb.string = 'Not hit';
                }
                return true;
            },
        }, this.node);
    },

    onDisable: function () {
        this.manager.enabled = false;
        this.manager.enabledDebugDraw = false;
    }

    // start () {

    // },

    // update (dt) {}
});