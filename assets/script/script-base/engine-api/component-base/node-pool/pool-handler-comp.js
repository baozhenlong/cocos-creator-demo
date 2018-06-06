cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {},

    //调用put函数时，会调用unuse
    unuse: function () {
        console.log('------unuse');
    },

    //调用get函数时，会调用reuse    
    reuse: function (data1, data2) {
        console.log('------reuse data1 = ' + data1 + '，data2 = ' + data2); //param1, param2
    },

    // start () {

    // },

    // update (dt) {}
});