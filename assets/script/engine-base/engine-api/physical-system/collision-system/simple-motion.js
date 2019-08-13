cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,
        rotatianSpeed: 10
    },

    // 旋转
    printAngle() {
        // node.angle
        // 节点的旋转角度，正值为逆时针方向
    },

    update(dt) {
        this.node.x += dt * this.moveSpeed;
        this.node.angle += dt * this.rotatianSpeed;
    },
});