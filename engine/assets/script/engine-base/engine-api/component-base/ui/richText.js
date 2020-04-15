cc.Class({
    extends: cc.Component,

    properties: {
        richText: cc.RichText,
        richText2: cc.RichText,
    },

    onLoad() {
        //---cc.RichText

        //---richText.string
        //富文本显示的文本内容（String）---使用BBcode来指定特定文本样式
        //<起始标签>显示的文字<结束标签>
        //起始标签：标签名字(小写)=属性值
        //结束标签：/+标签名字 或 /
        //1---颜色
        var color = '<color=#ff0000>颜色</color>';
        //2---大小
        var size = '<size=20>大小</>'
        //3---描边（颜色=白色 和 宽度=1）
        var outline = '<outline color=red width=4>描边颜色和宽度</>';
        //4---粗体
        var b = '<b>粗体</>';
        //5---斜体
        var i = '<i>斜体</>';
        //6---下划线
        var u = '<u>下划线</>';
        //7---插入一个空行
        var br = '<br/>空行</>';
        //8---指定一个点击事件处理函数
        //click处理函数的脚本需挂载有RichText组件的节点
        var clickOn = '<on click="onClick">on添加click属性</>';
        var clickColor = '<color=green click="colorClick">color添加click属性</>';
        var clickSize = '<size=30 click="sizeClick">size添加click属性</>';
        var clickOutline = '<outline color=yellow width=6 click="outlineClick">outlin添加click属性</>'
        //9---添加图片
        var img = '<img src="card_14" click="imgClick"/>图片<size=30>card</>'; //card_14---图集里的一个spriteFrame名称
        var img2 = '<img src="card_15"/>';
        var str = color + size + outline + b + i + u + br + br + clickOn + clickColor + clickSize + clickOutline + img + img2;
        this.richText.string = str;
        //10---嵌套的标签
        var str2 = '<size=30><color=red>Bule</></>';
        this.richText2.string = str2;

        //---richText.horizontalAlign
        //文本内容的水平对齐方式（Enum）
        //左---cc.TextAlignment.LEFT
        //中心---cc.TextAlignment.CENTER
        //右---cc.TextAlignment.RIGHT

        //---richText.font
        //富文本定制字体（cc.TTFFont）

        //---richText.fontSize
        //富文本字体大小（Number）

        //---richText.lineHeight
        //富文本行高（Number）

        //---richText.maxWidth
        //富文本的最大宽度（Number）
        //0-手动换行；描点会影响布局

        //---richText.imageAtlas
        //图集---（SpriteAtlas）---对于img标签里面的src属性名称，都需要在atlas里找到一个有效的spriteFrame，否则ing tag会判定为无效

    },

    onClick: function () {
        console.log('onClick');
    },

    colorClick: function () {
        console.log('colorClick');
    },

    sizeClick: function () {
        console.log('sizeClick');
    },

    outlineClick: function () {
        console.log('outlineClick');
    },

    imgClick: function () {
        console.log('imgClick');
    }

    // start() {},

    // update (dt) {}
});