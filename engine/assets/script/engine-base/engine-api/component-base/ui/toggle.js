cc.Class({
    extends: cc.Component,

    properties: {
        radioButton: {
            default: [],
            type: [cc.Toggle]
        }
    },

    onLoad() {
        //---cc.Toggle
        //Toggle是一个CheckBox

        //---toggle.isChecked
        //设置checkMark组件的状态（Boolean）
        //true-checkMark组件处于enabled状态
        //false-checkMark组件处于disabled状态

        //---toggle.toggleGroup
        //可选---toggle所属的ToggleGroup
        //null-toggle是一个CheckBox
        //否则-toggle是一个RadioButton

        //---toggle.checkMark
        //toggle处于选中状态时显示的图片（Sprite）

        //--toggle.interactable
        //按钮是否可点击（Boolean）---false：按钮被禁用

        //---toggle.enableAutoGrayEffect
        //target是否可变灰（Boolean）---true：当interactable === false时，会使用内置shader让target节点的sprite组件变灰

        //---toggle.transition
        //同button

        //---toggle.check()
        //使toggle按钮处于选中状态

        //---toggle.uncheck()
        //使toggle按钮处于未选中状态


    },

    //---toggle.clickEvents
    //按钮的点击事件
    onRadioButtonClicked: function (sender) {
        console.log(sender); //toggle组件
        console.log(sender.target.name); //target节点名
        console.log(sender.interactable);
        console.log(sender.transition);
        console.log(sender instanceof cc.Toggle); //true
    }

    // start() {},

    // update (dt) {}
});