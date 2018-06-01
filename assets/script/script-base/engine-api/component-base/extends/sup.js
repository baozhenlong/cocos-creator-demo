//组件脚本
var Sup = cc.Class({

    extends: cc.Component,

    properties: {
        content: 'Content is sup'
    },

    ctor: function() {
        console.log('sup');
    },

    statics: {
        supName: 'supStatics',
        supRange: {
            w: 100,
            h: 100
        }
    },

    onLoad() {},

    printName: function() {
        console.log('print name = sup');
    },

    // start () {

    // },

    // update (dt) {},
});