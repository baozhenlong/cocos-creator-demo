cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {},

    unuse: function() {
        console.log('------unuse');
    },

    reuse: function(data1, data2) {
        console.log('------reuse data1 = ' + data1 + '，data2 = ' + data2); //param1, param2
    },

    // start () {

    // },

    // update (dt) {},
});