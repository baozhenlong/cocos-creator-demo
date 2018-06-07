cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab,
        initCount: 5
    },

    onLoad() {
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.manager.enabledDebugDraw = true;
        this.initNodePool();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    },

    initNodePool: function () {
        this.nodePool = new cc.NodePool();
        for (let i = 0; i < this.initCount; i++) {
            let bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('bullet').setShooterJs(this);
            this.nodePool.put(bullet);
        }
    },

    createBullet: function (pos) {
        var bullet = this.nodePool.get();
        if (!bullet) {
            console.log('nodePool is not enough');
            bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('bullet').setShooterJs(this);
        }
        bullet.position = pos;
        bullet.parent = this.node;
    },

    releaseBullet: function (bullet) {
        this.nodePool.put(bullet);
    },

    clearBullet: function () {
        this.nodePool.clear();
    },

    onTouchBegan: function (event) {
        // console.log('------touchBegan');
        var pos = this.node.convertTouchToNodeSpaceAR(event.touch);
        this.createBullet(pos);
    },

    onDisable: function () {
        this.manager.enabled = false;
        this.manager.enabledDebugDraw = false;
    }

    // start() {},

    // update(dt) {}
});