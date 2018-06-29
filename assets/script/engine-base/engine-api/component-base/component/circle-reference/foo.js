cc.Class({
    extends: cc.Component,

    properties: () => ({
        barJs: require('bar'),
        desc: 'desc is foo'
    }),

    onLoad() {
        console.log('in foo has reference ' + this.barJs.desc);
        //in foo has reference this is bar
    },

    // start() {},

    // update (dt) {}
});