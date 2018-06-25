cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView
    },

    onLoad() {
        //---cc.ScrollView

        //--scrollView.content
        //可滚动展示内容的节点

        //---scrollView.horizontal
        //是否开启水平滚动（Boolean）

        //---scrollView.vertical
        //是否开启垂直滚动（Boolean）

        //---scrollView.inertia
        //是否开启滚动惯性

        //---scrollView.brake
        //刹车（Number）---[0,1]；开启惯性后，在用户停止触摸后滚动多快停止；0-永不停止，1-立即停止

        //---scrollView.elastic
        //回弹（Boolean）---是否允许滚动内容超过边界，并在停止触摸后回弹

        //---scrollView.bounceDuration
        //回弹持续时间（Number）---0-立即反弹

        //---ScrollBar
        //scrollView.horizontalScrollBar
        //水平滚动的ScrollBar
        //scrollView.verticalScrollBar
        //垂直滚动的ScrollBar
        //1---scrollBar.handle
        //作为当前滚动区域位置显示的滑块Sprite（Sprite）
        //2---scrollBar.direction
        //ScrollBar的滚动方向（Enum）
        //水平---cc.ScrollBar.Direction.HORIZONTAL
        //垂直---cc.ScrollBar.Direction.VERTICAL
        //3---scrollBar.enableAutoHide
        //自动隐藏ScrollBar（Boolean）---是否在没有滚动动作时自动隐藏ScrollBar
        //4---autoHideTime
        //当scrollBar.enableAutoHide === true时有效
        //隐藏触发时间（Number）---没有滚动动作后经过多久会自动隐藏

        //---scrollView.scrollToBottom(timeInSecond, attenuated)
        //视图内容将在规定时间内滚动到视图底部
        //可选参数timeInSecond（Number）---滚动的秒时间；不传，立即滚动到底部
        //可选参数attenuated（Boolean）---滚动加速度是否衰减

        //---scrollView.scrollToTop(timeInSecond, attenuated)
        //视图内容将在规定时间内滚动到视图顶部

        //---scrollView.getMaxScrollOffset()
        //获取滚动视图最大可以滚动的偏移量
        //返回值（Vec2）---maxScrollOffset = {"x":0,"y":150}

        //---scrollView.scrollToOffset(offset, timeInSecond, attenuated)
        //视图内容将在规定时间内滚动到相对左上角原点的偏移量
        //参数offset（Vec2）---0~maxScrollOffset之间的值-cc.p()

    },

    //---scrollView.scrollEvents
    //滚动视图的事件回调函数
    onScrollEvent: function (sender, event) {
        console.log('this.name = ' + this.name); //scrollView<scrollView>---节点名<组件名>
        //---sender
        //ScrollView组件
        console.log('sender.name = ' + sender.name); //SV<ScrollView>---节点名<组件名>
        console.log('sender.brake = ' + sender.brake);
        switch (event) {
            case 0:
                console.log('Scroll to Top');
                break;
            case 1:
                console.log('Scroll to Bottom');
                break;
            case 2:
                console.log('Scroll to Left');
                break;
            case 3:
                console.log('Scroll to Right');
                break;
            case 4:
                console.log('Scrolling');
                break;
            case 5:
                console.log('Bounce Top');
                break;
            case 6:
                console.log('Bounce bottom');
                break;
            case 7:
                console.log('Bounce left');
                break;
            case 8:
                console.log('Bounce right');
                break;
            case 9:
                console.log('Auto scroll ended');
                break;
        }
    }

    // start() {},

    // update (dt) {}
});