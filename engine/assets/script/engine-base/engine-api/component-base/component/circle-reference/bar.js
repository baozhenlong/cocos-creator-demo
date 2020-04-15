cc.Class({
    extends: cc.Component,

    properties: () => ({
        fooJs: require('foo'),
        desc: 'desc is bar'
    }),


    onLoad() {
        console.log('in bar has reference ' + this.fooJs.desc);
        //in bar has reference this is foo
    },

    // start() {},

    // update (dt) {}
});