cc.Class({
    extends: cc.Component,

    properties: {
        touchNode: cc.Node
    },

    onLoad() {
        //---触摸事件

        var self = this;
        this.isMoving = false;
        this.moveToPos = cc.v2(0, 0);

        //---注册方式


        //事件名---'touchstart'
        //事件触发的时机---当手指触点落在目标节点区域内时
        this.touchNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log('touch start');
            this.isMoving = true;

            //---event.touch
            //当前事件关联的触点对象
            //返回值（cc.Touch）
            var touch = event.touch;
            console.log("event.touch = " + JSON.stringify(touch));
            // event.touch = {
            //     "__instanceId": 433,
            //     "_lastModified": 1527760291087,
            //     "_prevPoint": {
            //         "x": 636.2376237623762,
            //         "y": 356.43564356435644
            //     },
            //     "_point": {
            //         "x": 636.2376237623762,
            //         "y": 356.43564356435644
            //     },
            //     "_startPoint": {
            //         "x": 636.2376237623762,
            //         "y": 356.43564356435644
            //     },
            //     "_startPointCaptured": true
            // }

            //---parentNode.convertTouchToNodeSpaceAR(cc.Touch)
            //转换一个cc.Touch（世界坐标）到一个局部坐标，返回值基于节点坐标（基于锚点）
            // convertTouchToNodeSpaceAR (touch) {
            //     return this.convertToNodeSpaceAR(touch.getLocation());
            // },
            var nodePosAR = this.touchNode.convertTouchToNodeSpaceAR(touch); //基于锚点
            var nodePos = this.touchNode.convertTouchToNodeSpace(touch); //基于左下角点
            console.log("nodePosAR = " + JSON.stringify(nodePosAR));
            // nodePosAR = {
            //     "x": -3.762376237623812,
            //     "y": -3.5643564356435604
            // }
            console.log("nodePos = " + JSON.stringify(nodePos));
            // nodePos = {
            //     "x": 96.23762376237619,
            //     "y": 96.43564356435644
            // }

            //---event.getTouches()
            //获取触摸点的列表，触点对象的数组
            //返回值（[cc.Touch]）
            var touchList = event.getTouches();
            console.log('touch === touchList[0]   ' + (touch === touchList[0])); //true

            //---parentNode.convertToNodeSpaceAR(cc.Touch)
            //将一个点（Vec2）转换到局部（节点）坐标，返回值基于节点坐标（基于锚点）          
            var nodePosAR2 = this.touchNode.convertToNodeSpaceAR(touchList[0].getLocation());
            console.log("nodePosAR2 = " + JSON.stringify(nodePosAR2));
            // nodePosAR = {
            //     "x": -3.762376237623812,
            //     "y": -3.5643564356435604
            // }
            console.log('nodePosAR === nodePosAR2   ' + (nodePosAR === nodePosAR2)); //false
            console.log('nodePosAR.x === nodePosAR2.x   ' + (nodePosAR.x === nodePosAR2.x)); //true
        }, this);

        //事件名---'touchmove'
        //事件触发的时机---当手指在目标节点区域内移动时
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // console.log('touch move');
        });

        //事件名---'touchend'
        //事件触发的时机---当手指在目标节点区域内，离开屏幕时
        this.touchNode.on(cc.Node.EventType.TOUCH_END, function (event) {
            // console.log('touch end');
            this.isMoving = false;
        });

        //事件名---'touchcancel'
        //事件触发的时机---当手指在目标节点区域外，离开屏幕时
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // console.log('touch cancel');
            this.isMoving = false;
        });

        //---事件冒泡
        //触摸事件支持节点树的事件冒泡，通过调用event的stopPropagation函数可以主动停止冒泡过程

    },

    // start() {},

    // update (dt) {}
});