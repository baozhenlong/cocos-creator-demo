cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---全局系统事件---由cc.systemEvent来统一派发
        //cc.systemEvent.on(type, callback, target)
        //参数type（CCClass）---事件监听器类型
        // cc.SystemEvent.EventType.KEY_DOWN---当按下按键时，触发的事件
        // cc.SystemEvent.EventType.KEY_UP---当松开按键时，触发的事件
        // cc.SystemEvent.EventType.DEVICEMOTION---重力感应
        //参数callback（Function）---事件触发后的回调函数
        //参数target（Object）---绑定回调函数的this的对象

        //---设备重力传感事件
        //启用加速度计事件
        // cc.systemEvent.setAccelerometerEnabled(true);
        // cc.inputManager.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);

        //---键盘事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    },

    onDestroy: function () {
        // cc.systemEvent.setAccelerometerEnabled(false);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDeviceMotionEvent(event) {
        console.log('onDeviceMotionEvent ' + event.acc.x + "   " + event.acc.y);
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

    // start() {},

    // update (dt) {}
});