cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Button
    },

    onLoad() {
        //---cc.Button

        //---button.interactable
        //按钮可否点击（Boolean）---false为禁用

        //---button.transition
        //按钮状态改变时的过渡方法（Enum）
        //1---NONE
        //不做任何过渡
        //2---COLOR
        //颜色过渡
        //普通---button.normalColor（Color）---普通状态下按钮所显示的颜色
        //按下---button.pressedlColor（Color）---按下状态下按钮所显示的颜色
        //悬停---button.hoverColor（Color）---悬停状态下按钮所显示的颜色
        //禁用---button.disabledColor（Color）---禁用状态下按钮所显示的颜色
        //过渡时间---button.duration（Number）---颜色过渡时所需时间
        //3---SPRITE
        //精灵过渡
        //普通---button.normalSprite（SpriteFrame）---普通状态下按钮所显示的Sprite
        //按下---button.pressedlSprite（SpriteFrame）---按下状态下按钮所显示的Sprite
        //悬停---button.hoverSprite（SpriteFrame）---悬停状态下按钮所显示的Sprite
        //禁用---button.disabledSprite（SpriteFrame）---禁用状态下按钮所显示的Sprite
        //4---SCALE
        //缩放过渡
        //过渡时间---button.duration（Number）---缩放过渡时所需时间
        //缩放值---button.zoomScale（Number）---点击按钮后的缩放值，这个值 = 原始scale * zoomScale

        //---button.target
        //需要过渡的目标（Node）

    },

    //---clickEvents
    onClicked: function (event, customEventData) {
        console.log(event);
        //event = EventTouch  {
        //     type: "touchend",
        //     bubbles: true,
        //     target: cc_Node,
        //     currentTarget: cc_Node,
        // }
        console.log(event.target.name); //Btn---目标节点名

        //---customEventData
        //自定义事件数据（String）
        console.log(customEventData); //1

    }

    // start() {},

    // update (dt) {}
});