cc.Class({
    extends: cc.Component,

    properties: {
        confirmNode: cc.Node,
        cancelNode: cc.Node,
        descLb: cc.Label
    },


    onLoad() {

    },

    init: function(hint, confirmCb = null, cancelCb = null) {
        var self = this;
        this.node.active = true;
        this.descLb.string = hint;
        if (confirmCb) {
            this.confirmNode.on("click", function() {
                console.log("------hintBox click confirm");
                self.node.active = false;
                confirmCb();
            }, this);
        } else {
            this.confirmNode.active = false;
        }
        if (cancelCb) {
            this.cancelNode.on("click", function() {
                console.log("------hintBox click cancel");
                self.node.active = false;
                cancelCb();
            }, this);
        } else {
            this.cancelNode.active = false;
        }

    }


    // start () {

    // },

    // update (dt) {},
});