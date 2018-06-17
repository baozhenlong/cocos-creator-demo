cc.Class({
    extends: cc.Component,

    properties: {
        aNode: cc.Node,
        bNode: cc.Node,
        cNode: cc.Node,
        touchNode: cc.Node,
        eventManagerNode: cc.Node
    },

    onLoad() {
        var self = this;
        //---注册事件，监听事件，发射事件

        //---注册事件
        //事件处理是在节点（cc.Node）中完成的
        //对于组件，可以通过访问节点this.node来注册和监听事件
        //在节点上注册指定类型的回调函数，也可以设置target用于绑定响应函数的this对象，
        //同时可以将事件派发到父节点或者通过调用stopPropagation()拦截它
        //1---node.on(type, cb, target)--注册监听事件
        //参数type（String）---事件类型（事件名）
        //参数cb（Function）---回调函数（响应函数）
        //参数target（Objcet）---回调函数的this对象
        this.aNode.on('name', function (event) {
            console.log('a node');
            //event（cc.Event）---在事件监听回调中，收到的事件对象
            //事件对象---1---event.stopPropagation()---停止冒泡阶段，事件将不会继续向父节点传递，当前节点的剩余监听器仍然会接收到事件
            // event.stopPropagation();
            //type（String）---事件的类型（事件名）
            //事件对象---2---getType()，getEventName---获取事件的类型
            console.log('event type = ' + event.getType()); //name            
            console.log('event name = ' + event.getEventName()); //name
            //事件对象---3---getUserData()---获取自定义事件的信息
            console.log('event data = ' + JSON.stringify(event.getUserData())); //{"msg":"hello","who":"dammon"}
        }, this);
        //或者使用函数绑定回调函数的this值
        this.bNode.on('name', function (event) {
            console.log('b node');
        }.bind(this));
        //2---node.once()---在监听函数响应后就会关闭监听事件

        //---发射事件
        //1---node.emit(type, data)---不可以做事件传递
        //第一个参数type（String）---事件类型（事件名）
        //第二个参数data（any）---事件数据
        // this.node.emit('name', {
        //     msg: 'hello',
        //     who: 'dammon'
        // });
        //2---node.dispatchEvent()---派送事件
        //分发事件到事件流中---采用冒泡派送，将事件从事件发起节点，不断地向上传递给他的父节点，
        //直到到达根节点或者在某个节点的响应函数中做了中断处理event.stopPropagation()
        //2.1---new cc.Event.EventCustom(type, bubbles)---创建用户自定义事件
        //参数type（String）---事件类型(事件名)
        //参数bubbles（Boolean）---表示事件是否进行冒泡
        var event = new cc.Event.EventCustom('name', true);
        //2.2---设置自定义事件的信息
        event.setUserData({
            msg: 'hello',
            who: 'dammon'
        });
        //获取用户数据
        //发射事件
        this.bNode.dispatchEvent(event);

        //---关闭监听
        //node.off（type, cb, target）---off方法的参数必须与on方法的参数一一对应，才能完成关闭

        //---系统事件
        //1---节点系统事件
        //1.1---使用枚举类型来注册事件的监听器
        this.cNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('use enum');
        }, this);
        //1.2---使用事件名来注册事件的监听器
        this.cNode.on('touchstart', function (event) {
            console.log('use name');
        }, this);
        //1.3---触摸事件
        //1.3.1---触摸事件类型
        //事件名---'touchstart'
        //事件触发的时机---当手指触点落在目标节点区域内时
        this.touchNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log('touch start');
            //API---event.touch（cc.Touch）---当前事件关联的触点对象
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
            //API---parentNode.convertTouchToNodeSpaceAR(cc.Touch)---转换一个cc.Touch（世界坐标）到一个局部坐标，返回值基于节点坐标（基于锚点）
            // convertTouchToNodeSpaceAR (touch) {
            //     return this.convertToNodeSpaceAR(touch.getLocation());
            // },
            var nodePos = this.touchNode.convertTouchToNodeSpaceAR(touch); //基于锚点
            var nodePosTemp = this.touchNode.convertTouchToNodeSpace(touch); //基于左下角点
            console.log("nodePos = " + JSON.stringify(nodePos));
            // nodePos = {
            //     "x": -3.762376237623812,
            //     "y": -3.5643564356435604
            // }
            console.log("nodePosTemp = " + JSON.stringify(nodePosTemp));
            // nodePosTemp = {
            //     "x": 96.23762376237619,
            //     "y": 96.43564356435644
            // }
            //API---event.getTouches()---获取触摸点的列表，触点对象的数组
            var touchList = event.getTouches();
            console.log('touch === touchList[0]' + (touch === touchList[0])); //true
            //API---parentNode.convertToNodeSpaceAR(cc.Touch)---将一个点（Vec2）转换到局部（节点）坐标，返回值基于节点坐标（基于锚点）          
            var nodePos2 = this.touchNode.convertToNodeSpaceAR(touchList[0].getLocation());
            console.log("nodePos2 = " + JSON.stringify(nodePos2));
            // nodePos = {
            //     "x": -3.762376237623812,
            //     "y": -3.5643564356435604
            // }
            console.log('nodePos.x === nodePos2' + (nodePos.x === nodePos2.x)); //true
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
        });
        //事件名---'touchcancel'
        //事件触发的时机---当手指在目标节点区域外，离开屏幕时
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // console.log('touch cancel');
        });
        //1.3.2---事件冒泡
        //触摸事件支持节点树的事件冒泡，通过调用event的stopPropagation函数可以主动停止冒泡过程
        //2---全局系统事件---由cc.systemEvent来统一派发
        // cc.systemEvent.on(type, callback, target)
        //参数type（enum）---事件监听器类型
        // cc.SystemEvent.EventType.KEY_DOWN---(键盘按下)
        // cc.SystemEvent.EventType.KEY_UP---(键盘释放)
        // cc.SystemEvent.EventType.DEVICEMOTION---(设备重力传感)
        //参数callback（Function）---事件触发后的回调函数
        //参数target（Object）---绑定回调函数的this的对象
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        //---cc.eventManager
        //1---addListener(listener, nodeOrPriority)---将事件监听器添加到事件管理器中
        //参数listener（EventListener|Object）
        //参数nodeOrPriority（Node|Number）
        //Node---节点：优先级由node的渲染顺序决定，显示在上层的节点将优先收到事件
        //Number---数字：优先级则固定为该参数的数值，数字越小，优先级越高
        //返回值（EventListener）
        var touchListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                console.log('onTouchBegan');
                console.log('event.currentTarget.name = ' + event.currentTarget.name); //eventManager
            },
            onTouchMoved: function (touch, event) {
                console.log('onTouchMoved');
            },
            onTouchEnded: function (touch, event) {
                console.log('onTouchEnd');
            },
            onTouchCancelled: function (touch, event) {
                console.log('onTouchCancelled');
            }
        }, self.eventManagerNode);
        //2---removeListener(listener)---移除一个已添加的监听器
        //2.1---remove eventManager add Listener;
        // cc.eventManager.removeListener(touchListener);
        //2.2---remove eventListener create Listener;
        var keyboardListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyDown: function (keyCode, event) {
                console.log('onKeyDown = ' + keyCode);
            },
            onKeyUp: function (keyCode, event) {
                console.log('onKeyUp = ' + keyCode);
            },
        });
        // cc.eventManager.removeListener(mouseListener);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
                console.log('press a key');
                break;
        }
    },

    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
                console.log('release a key');
                break;
        }
    },

    // start () {

    // },

    // update (dt) {},
});