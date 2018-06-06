cc.Class({
    extends: cc.Component,

    properties: {
        speed: 50,
        distance: 200
    },

    onLoad() {
        this._moveDistance = this.distance / 2;
        this._direction = 1;
    },

    // start () {

    // },

    update(dt) {
        var d = this.speed * this._direction * dt;
        var moveDistance = this._moveDistance + Math.abs(d);
        this._moveDistance += Math.abs(d);
        if (moveDistance > this.distance) {
            d = this.distance - moveDistance;
            this._moveDistance = 0;
            this._direction *= -1;
        } else {
            this._moveDistance = moveDistance;
        }
        this.node.x += d;
    }
});