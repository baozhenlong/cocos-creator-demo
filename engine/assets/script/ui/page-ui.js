cc.Class({
    extends: cc.Component,

    properties: {
        targetNode: cc.Node,
        itemPrefab: cc.Prefab,
        itemHeight: 300,
        scrollSpeed: 1
    },


    onLoad() {
        this.targetNode.removeAllChildren();
        this.initUi();
        this.addTouchEvent();
    },

    addTouchEvent: function () {
        var self = this;
        this.targetNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('------touch start');
            self.autoScroll = false;
            self.startPos = self.targetNode.convertTouchToNodeSpaceAR(event.touch);
            self.movePos = self.startPos;
        }, this);
        this.targetNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log('------touch move');
            self.movePos = self.targetNode.convertTouchToNodeSpaceAR(event.touch);
        }, this);
        this.targetNode.on(cc.Node.EventType.TOUCH_END, function () {
            console.log('------touch end');
            if (Math.abs(self.movePos.y - self.startPos.y) > 50) {
                console.log('------scollAction diff = ' + Math.abs(self.movePos.y - self.startPos.y));
                self.updateUi();
            } else {
                console.log('------click Event');
                self.executeClick();
            }
            self.autoScroll = true;
        }, this);
        this.targetNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            console.log('------touch cancel');
            self.autoScroll = true;
        }, this);
    },

    initUi: function () {
        this.autoScroll = true;
        this.nodePosList = [];
        this.nodeList = [];
        for (var index = 0; index < 5; index++) {
            this.addItem(index);
        }
        console.log('nodePosList = ' + JSON.stringify(this.nodePosList));
    },

    addItem: function (index) {
        var item = cc.instantiate(this.itemPrefab);
        item.getChildByName('Lb_index').getComponent(cc.Label).string = index + '';
        item.parent = this.targetNode;
        var pos = cc.v2(0, 0);
        if (index !== 0) {
            pos = cc.v2(0, this.itemHeight * index);
        }
        item.setPosition(pos);
        item.tag = index;
        this.nodePosList.push(pos);
        this.nodeList.push(item);
    },

    scrollUi: function (value) {
        for (var i = 0; i < this.nodeList.length; i++) {
            var ele = this.nodeList[i];
            var diff = value !== undefined ? value : this.scrollSpeed;
            ele.y -= this.scrollSpeed;
        }
    },

    checkReset: function () {
        if (this.nodeList[0].y <= (0 - this.itemHeight)) {
            var preNode = this.nodeList.shift();
            this.nodeList.push(preNode);
            this.nodeList[this.nodeList.length - 1].setPosition(this.nodePosList[this.nodePosList.length - 1]);
        }
    },

    updateUi: function () {
        if (this.autoScroll) {
            return;
        }
        var self = this;
        console.log('------updateUi');
        if (this.startPos.y > this.movePos.y) {
            console.log('------updateUi 向-下-滑动');
            var firstNode = this.nodeList.shift();
            this.nodeList.push(firstNode);
        } else {
            console.log('------updateUi 向-上-滑动');
            var lastNode = this.nodeList.pop();
            this.nodeList.unshift(lastNode);
        }
        this.nodeList.forEach(function (node, index) {
            node.setPosition(self.nodePosList[index]);
        });
    },

    executeClick: function () {
        var posY = this.nodeList[0].y;
        console.log('------executeClick posY = ' + posY);
        console.log('------executeClick -itemHeight = ' + (-this.itemHeight / 2));
        var index = 0;
        if (posY >= -this.itemHeight / 2) {
            index = this.nodeList[0].tag;
        } else {
            index = this.nodeList[1].tag;
        }
        console.log('------executeClick index = ' + index);
    },

    update(dt) {
        if (this.autoScroll) {
            this.scrollUi();
        }
        this.checkReset();
    },

    // start () {

    // },

});