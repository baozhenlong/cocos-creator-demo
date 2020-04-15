cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---cc.Slider

        //---slider.handle
        //滑动器滑块按钮部件（Button）

        //---slider.direction
        //滑动器方向（Enum）
        //水平---cc.Slider.Direction.Horizontal
        //垂直---cc.Slider.Direction.Vertical

        //---slider.progress
        //当前进度值（Number）---[0,1]

    },

    //---slider.sliderEvents
    //滑动器组件事件回调函数
    onSliderEvent: function (sender, eventType) {
        console.log(sender.progress);
    }

    // start() {},

    // update (dt) {}
});