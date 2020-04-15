cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label //中心对齐
    },

    onLoad() {
        //---cc.Label

        //---对齐
        //1---label.horizontalAlign
        //水平对齐（Enum）
        //左对齐---cc.Label.HorizontalAlign.LEFT
        //居中对齐---cc.Label.HorizontalAlign.CENTER
        //右对齐---cc.Label.HorizontalAlign.RIGHT
        console.log(this.label.horizontalAlign); //1
        console.log(cc.Label.HorizontalAlign.LEFT); //0
        //2---label.verticalAlign
        //垂直对齐（Enum）
        //顶部对齐---cc.Label.VerticalAlign.TOP
        //居中对齐---cc.Label.VerticalAlign.CENTER
        //底部对齐---cc.Label.VerticalAlign.BOTTOM
        console.log(this.label.verticalAlign); //1
        console.log(cc.Label.VerticalAlign.TOP); //0

        //---label.overflow
        //文字显示超出节点范围时的处理方式（Enum）
        //不做任何限制---cc.Label.Overflow.NONE
        //截断节点外的文字---cc.Label.Overflow.CLAMP---当文本内容超出边界框时，多余的会被截断
        //根据节点缩小文字---cc.Label.Overflow.SHRINK---字体大小会适应内容大小
        //根据文本更新节点高度---cc.Label.Overflow.RESIZE_HEIGHT---只能改变文本的宽度，高度是自动改变的

        //---label.enableWrapText
        //当label.overflow === cc.Label.Overflow.CLAMP || cc.Label.Overflow.SHRINK时有效
        //是否自动换行（Boolean）
    },

    // start() {},

    // update (dt) {}
});