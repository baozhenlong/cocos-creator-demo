cc.Class({
    extends: cc.Component,

    properties: {
        goldCoin: cc.Node
    },

    onLoad() {
        var parentNode = this.goldCoin.parent;
        console.log('originalPos = ' + JSON.stringify(this.goldCoin.position)); //{"x":400,"y":0}
        //----将一个点转换到世界空间坐标系
        //1---node.convertToWorldSpace(nodePoint)
        //参数nodePoint（Vec2）
        //返回值（Vec2）
        var worldPos = parentNode.convertToWorldSpace(cc.v2(this.goldCoin.x, this.goldCoin.y));
        console.log('worldPos = ' + JSON.stringify(worldPos)); //{"x":990.3199999999999,"y":310}
        //2---node.convertToWorldSpaceAR(nodePoint)
        //参数nodePoint（Vec2）
        //返回值（Vec2）---基于世界坐标
        var worldPosAR = parentNode.convertToWorldSpaceAR(cc.v2(this.goldCoin.x, this.goldCoin.y));
        console.log('worldPosAR = ' + JSON.stringify(worldPosAR)); //{"x":1040.32,"y":360}
        console.log((worldPos.x + parentNode.width * parentNode.anchorX) === worldPosAR.x); //true

        //---将一个点转换到节点坐标系
        //1---node.convertToNodeSpace(worldPoint)
        //参数worldPoint（Vec2）
        var nodePos = parentNode.convertToNodeSpace(worldPos);
        console.log('nodePos = ' + JSON.stringify(nodePos)); //{"x":400,"y":0}
        //2---node.convertToNodeSpaceAR(worldPoint)
        //参数worldPoint（Vec2）
        var nodePosAR = parentNode.convertToNodeSpaceAR(worldPosAR);
        console.log('nodePosAR = ' + JSON.stringify(nodePosAR)); //{"x":400,"y":0}




    },

    // start() {},

    // update (dt) {}
});