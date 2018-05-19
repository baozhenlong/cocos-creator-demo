cc.Class({

    extends: cc.Component,

    properties: {

    },


    onLoad() {

    },

    //实例方法
    createVec2: function() {
        //通过cc.p简便创建cc.Vec2对象的2种方式---cc.Vec2表示2D向量和坐标
        console.log("cc.p 1 = " + JSON.stringify(cc.p(1, 2))); //{"x":1,"y":2}
        console.log("cc.p 2 = " + JSON.stringify(cc.p({
            x: 1,
            y: 2
        }))); //{"x":1,"y":2}
    }

    // start () {

    // },

    // update (dt) {},
});