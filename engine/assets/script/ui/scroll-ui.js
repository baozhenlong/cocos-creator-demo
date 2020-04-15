cc.Class({
    extends: cc.Component,

    properties: {
        parentNode: cc.Node,
        pageNodeList: [cc.Node],
        pagePrefab: cc.Prefab,
        pageCount: 5,
        pageSpace: 100,
        pageScale: 0.1,
        pageWidth: 500,
        pageHeight: 500,
        isLoop: true
    },

    onLoad() {
        var self = this;
        this.startPos = cc.v2(0, 0);
        this.movePos = cc.v2(0, 0);
        this.playingCount = 0;
        this.curPageIndex = 0;
        this.isMoving = false;
        this.pageCount = 5;
        this.initView();
        this.parentNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            //第三个参数target用于绑定响应函数的this对象
            // console.log("this.node.name = " + this.node.name);
            //获得当前触点对象
            // console.log("event.touch = " + JSON.stringify(event.touch));
            var touches = event.getTouches();
            //获取触摸点的列表，触点对象的数组
            // console.log("touches = " + JSON.stringify(touches));
            //获取触点位置的2种方式；touches[0] == event.touch
            //1
            var touchLoc = touches[0].getLocation();
            // console.log("touchLoc = " + JSON.stringify(touchLoc));
            //2
            // console.log("event touch Loc = " + JSON.stringify(event.touch.getLocation()));
            //转换成节点坐标的2种方式
            //1
            //将一个点转换到节点坐标系，结果以Vec2为单位，返回值将基于节点坐标
            var nodePos = this.parentNode.convertToNodeSpaceAR(touchLoc);
            // console.log("nodePos = " + nodePos);
            //2
            //把触摸点（cc.Touch）转换成本地坐标系中的位置，返回值基于节点坐标
            // console.log("touch node pos = " + this.parentNode.convertTouchToNodeSpaceAR(event.touch));
            this.startPos = nodePos;
            this.isMoving = true;
        }, this);

        this.parentNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var nodePos = this.parentNode.convertTouchToNodeSpaceAR(event.touch);
            this.movePos = nodePos;
        }, this);

        this.parentNode.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (Math.abs(this.movePos.x - this.startPos.x) > 50 && this.playingCount == 0) {
                console.log("xDiff = " + Math.abs(this.movePos.x - this.startPos.x));
                this.updateView();
            }
            this.isMoving = false;
        }, this);

        this.parentNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.isMoving = false;
        }, this);


    },

    getCurPageNode: function (index) {
        return this.pageNodeList[index];
    },

    updateView: function () {
        var diffIndex = 0
        if (!this.isMoving) {
            return;
        }
        console.log("updateView indexList before = " + JSON.stringify(this.indexList));
        var lastIndex = this.pageNodeList.length - 1;
        if (this.movePos.x > this.startPos.x) {
            diffIndex = 1;
            var lastPageIndex = this.indexList.pop();
            this.indexList.unshift(lastPageIndex);
        } else {
            diffIndex = -1;
            var firstPageIndex = this.indexList.shift();
            this.indexList.push(firstPageIndex);
        }
        console.log("updateView indexList now = " + JSON.stringify(this.indexList));
        this.initView(diffIndex);
    },

    initView: function (first = 0) {
        var self = this;
        var lastIndex = this.pageNodeList.length - 1;
        if (first === 0) {
            this.indexList = [];
            this.frameDataList = [];
            if (this.pageCount > 0) {
                for (var i = 0; i < this.pageCount; i++) {
                    var childNode = cc.instantiate(this.pagePrefab);
                    childNode.parent = this.parentNode;
                    this.pageNodeList.push(childNode);
                }
            }
            this.middleIndex = parseInt(this.pageNodeList.length / 2);
            console.log("middleIndex = " + this.middleIndex);
            this.pageNodeList.forEach(function (node, index) {
                self.indexList.push(index);
                self.frameDataList.push(self.setFrameData(index));
                if (index != self.middleIndex) {
                    node.zIndex = -1;
                } else {

                }
                var curIndex = self.indexList.indexOf(index);
                node.getChildByName(String(index)).getComponent(cc.Label).string = index;
                node.name = "frame" + index;
            });
        } else {
            this.pageNodeList.forEach(function (node, index) {
                //获取层级显示信息
                var index = self.indexList.indexOf(index);
                var frameData = self.getFrameData(index);
                node.zIndex = frameData.zIndex;
                //初始化节点操作
                self.moveEffect(node, frameData);
            });
        }
    },

    setFrameData: function (index) {
        //以中间为基准，设置缩放比例        
        var indexDiff = index - this.middleIndex;
        var scale = 1 - Math.abs(indexDiff * this.pageScale);
        // console.log("indexDiff = " + indexDiff);
        // console.log("scale = " + scale);
        //设置间距
        var xSpace = this.pageSpace;
        var xDiff = indexDiff * xSpace;
        if (indexDiff > 0) {
            // console.log("居右");
            // x += xDiff * (1 - scale);
            // xDiff += xSpace * (1 - scale);
        } else {
            // console.log("居左");
            // x += xDiff * (scale - 1);
            // xDiff += xSpace * (scale - 1);
        }
        var width = this.pageWidth * scale;
        // var width = this.pageWidth;
        var height = this.pageHeight * scale;
        // var height = this.pageHeight;
        var frameData = {
            nx: xDiff,
            ny: 0,
            nw: width,
            nh: height,
            zIndex: (-Math.abs(indexDiff)) + 1,
            scale: scale
        };
        // console.log("frameData = " + JSON.stringify(frameData));
        return frameData;
    },

    getFrameData: function (index) {
        return this.frameDataList[index];
    },

    moveEffect: function (node, frameData) {
        console.log("moveEffect");
        // console.log("frameData = " + JSON.stringify(frameData));
        console.log("node.zIndex = " + node.zIndex);
        var self = this;
        // console.log("start playingCount = " + this.playingCount);
        this.playingCount++;
        var moveTo = cc.moveTo(0.5, cc.v2(frameData.nx, frameData.ny));
        var scaleTo = cc.scaleTo(0.5, frameData.scale);
        var finish = cc.callFunc(() => {
            this.playingCount--;
            // console.log("finish playingCount = " + this.playingCount);
        }, this);
        node.runAction(cc.sequence(cc.spawn(moveTo, scaleTo), finish));
    },

    // start () {

    // },

    // update (dt) {},
});