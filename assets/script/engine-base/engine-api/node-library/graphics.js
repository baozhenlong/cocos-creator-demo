cc.Class({
    extends: cc.Component,

    properties: {
        graphics: cc.Graphics
    },

    onLoad() {
        //1---lineWidth（Number）---当前线条宽度

        //2---lineJoin（Enum）---用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性
        //2.1---Graphics.LineJoin.BEVEL---三角形
        //2.2---Graphics.LineJoin.ROUND---扇形
        //2.3---Graphics.LineJoin.MITER---菱形

        //3---lineCap（Enum）---指定如何绘制每一条线段末端
        //3.1---Graphics.LineCap.BUTT---方形
        //3.2---Graphics.LineCap.ROUND---圆形
        //3.3---Graphics.LineCap.SQUARE---方形，额外增加矩形区域

        //4---strokeColor（Color）---线段颜色

        //5---fillColor（Color）---填充颜色

        //6---miterLimit（Number）---设置斜接面限制比例

        //7---clear()---擦除之前绘制的所有内容的方法

        //8---moveTo(x, y)---移动路径起点到坐标(x,y)

        //9---lineTo()---绘制直线路径

        //10---stroke()---根据当前的画线样式，绘制当前或已经存在的路径

        //11---close()---将笔点返回到当前路径的起点，它尝试从当前点到起点绘制一条直线

        //12---circle(cx, cy, r)---绘制圆形路径
        //参数cx（Number）---终点坐标的x轴
        //参数cy（Number）---终点坐标的y轴
        //参数r（Number）---圆的半径

        //13---fill()---根据当前的画线样式，填充当前或已经存在的路径

        this.initUi();
    },

    initUi: function () {
        var x = [200, 400, 600, 800, 1000];
        var y = [400, 700, 100, 500, 300];
        this.graphics.strokeColor = cc.hexToColor('#FF0000');
        this.graphics.moveTo(50, 50);
        for (var i = 0; i < x.length; i++) {
            this.graphics.lineTo(x[i], y[i]);
            if (i === x.length - 1) {
                this.graphics.close();
            }
        }
        this.graphics.stroke();
        this.graphics.fillColor = cc.hexToColor('#0000FF');
        for (let i = 0; i <= x.length; i++) {
            this.graphics.moveTo(x[i], y[i]);
            this.graphics.circle(x[i], y[i], 10);
        }
        this.graphics.fill();
    }

    // start () {

    // },

    // update (dt) {},
});