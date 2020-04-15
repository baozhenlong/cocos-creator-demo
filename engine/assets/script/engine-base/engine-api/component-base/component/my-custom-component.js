cc.Class({
    extends: cc.Component,

    properties: {
        desc: 'myCustomComponent'
    },

    // onLoad() {

    // },

    printDesc: function () {
        console.log('desc = ' + this.desc);
    }

    // start() {},

    // update (dt) {}
});