cc.Class({
    extends: cc.Component,

    properties: {
        goldCoin: cc.Node
    },

    onLoad() {
        var parentNode = this.goldCoin.parent;
        //----将一个点转换到世界空间坐标系
        //1---node.convertToWorldSpace(nodePoint)
        //参数nodePoint（Vec2）
        //返回值（Vec2）
        var pos = parentNode.convertToWorldSpace(cc.v2(this.goldCoin.x, this.goldCoin.y));
        console.log('pos = ' + JSON.stringify(pos)); //{"x":990.3199999999999,"y":310}
        //2---node.convertToWorldSpaceAR(nodePoint)
        //参数nodePoint（Vec2）
        //返回值（Vec2）---基于世界坐标
        var posAR = parentNode.convertToWorldSpaceAR(cc.v2(this.goldCoin.x, this.goldCoin.y));
        console.log('posAR = ' + JSON.stringify(posAR)); //{"x":1040.32,"y":360}
        console.log((pos.x + parentNode.width * parentNode.anchorX) === posAR.x); //true

    },

    // start() {},

    // update (dt) {}
});