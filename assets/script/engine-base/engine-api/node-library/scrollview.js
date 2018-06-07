cc.Class({
    extends: cc.Component,

    properties: {
        sv: cc.ScrollView
    },

    onLoad() {

    },

    onToBottomClicked: function () {
        //scrollToBottom(timeInSecond, attenuated)---视图内容将在规定时间内滚动到视图底部
        //可选参数timeInSecond（Number）---滚动的秒时间；不传，立即滚动到底部
        //可选参数attenuated（Boolean）---滚动加速度是否衰减
        this.sv.scrollToBottom();
    },

    onToTopClicked: function () {
        //scrollToTop(timeInSecond, attenuated)---视图内容将在规定时间内滚动到视图顶部
        this.sv.scrollToTop();
    },

    onToMiddleClicked: function () {
        //getMaxScrollOffset()---获取滚动视图最大可以滚动的偏移量
        //返回值（Vec2）
        var maxScrollOffset = this.sv.getMaxScrollOffset();
        console.log('maxScrollOffset = ' + JSON.stringify(maxScrollOffset)); //{"x":0,"y":150}
        //scrollToOffset(offset, timeInSecond, attenuated)---视图内容将在规定时间内滚动到相对左上角原点的偏移量
        //参数offset（Vec2）---0~maxScrollOffset之间的值
        this.sv.scrollToOffset(cc.p(maxScrollOffset.x / 2, 0), 0.1);
    }

    // start () {

    // },

    // update (dt) {},
});