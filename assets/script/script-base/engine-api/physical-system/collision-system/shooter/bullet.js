cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100
    },

    // onLoad() {

    // },

    setShooterJs: function (js) {
        this.shooterJs = js;
    },

    onCollisionEnter(other, own) {
        console.log('------bullet onCollisionEnter');
        this.shooterJs.releaseBullet(own.node);
        //等价
        // this.shooterJs.releaseBullet(this.node);
    },

    // start() {},

    update(dt) {
        this.node.y += this.speed * dt;
    }
});