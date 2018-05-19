cc.Class({
    extends: cc.Component,

    properties: {
        descLb: cc.Label,
        showTime: 1,
        flyHeight: 250
    },


    onLoad() {

    },

    init: function(tip) {
        var self = this;
        this.descLb.string = tip;
        this.node.active = true;
        //动作
        this.node.runAction(cc.sequence(
            cc.delayTime(self.showTime),
            cc.moveBy(self.showTime, cc.p(0, self.flyHeight)),
            //从父节点移除自身
            cc.removeSelf(true)
        ))
    }

    // start () {

    // },

    // update (dt) {},
});