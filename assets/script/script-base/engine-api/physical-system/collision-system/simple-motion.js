cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,
        rotatianSpeed: 10
    },

    // onLoad() {

    // },

    // start() {

    // },

    update(dt) {
        this.node.x += dt * this.moveSpeed;
        this.node.rotation += dt * this.rotatianSpeed;
    },
});