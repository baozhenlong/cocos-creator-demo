cc.Class({
    extends: cc.Component,

    properties: {
        graphics: cc.Graphics
    },

    onLoad() {
        //---graphics.lineWidth
        //当前线条宽度（Number）
        this.graphics.lineWidth = 10;

        //---graphics.lineJoin
        //用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（Enum）
        //1---Graphics.LineJoin.BEVEL---三角形
        //2---Graphics.LineJoin.ROUND---扇形
        //3---Graphics.LineJoin.MITER---菱形

        //---graphics.lineCap
        //指定如何绘制每一条线段末端（Enum）
        //1---Graphics.LineCap.BUTT---方形
        //2---Graphics.LineCap.ROUND---圆形
        //3---Graphics.LineCap.SQUARE---方形，额外增加矩形区域

        //---graphics.strokeColor
        //线段颜色（Color）
        this.graphics.strokeColor = cc.Color.BLUE;


        //---graphics.fillColor
        //填充颜色（Color）
        this.graphics.fillColor = cc.Color.RED;

        //---graphics.miterLimit
        //设置斜接面限制比例（Number）

        //---graphics.clear()
        //擦除之前绘制的所有内容的方法

        //---graphics.moveTo(x, y)
        //移动路径起点到坐标(x,y)
        //参数x（Number）---终点x轴坐标
        //参数y（Number）---终点y轴坐标
        this.graphics.moveTo(-640, 0);

        //---graphics.lineTo(x, y)
        //绘制直线路径
        //参数x（Number）---终点x轴坐标
        //参数y（Number）---终点y轴坐标
        this.graphics.lineTo(-540, 100);
        this.graphics.lineTo(-440, 0);

        //---graphics.close()
        //将笔点返回到当前路径的起点，它尝试从当前点到起点绘制一条直线
        this.graphics.close();

        //---矩形
        //1---graphics.rect(x, y, w, h)
        //绘制矩形路径
        //参数x（Number）---矩形起始点的x轴坐标
        //参数y（Number）---矩形起始点的y轴坐标
        //参数w（Number）---矩形的宽
        //参数h（Number）---矩形的高
        this.graphics.rect(-200, -200, 100, 100);
        //2---graphics.roundRect(x, y, w, h, r)
        //绘制圆角矩形路径        
        //参数x（Number）---矩形起始点的x轴坐标
        //参数y（Number）---矩形起始点的y轴坐标
        //参数w（Number）---矩形的宽
        //参数h（Number）---矩形的高
        //参数r（Number）---矩形的半径
        this.graphics.roundRect(-100, -100, 100, 100, 50);
        //3---graphics.fillRect(x, y, w, h)
        //绘制填充矩形
        //参数x（Number）---矩形起始点的x轴坐标
        //参数y（Number）---矩形起始点的y轴坐标
        //参数w（Number）---矩形的宽
        //参数h（Number）---矩形的高
        this.graphics.fillRect(0, 0, 100, 100);

        //---graphics.stroke()
        //根据当前的画线样式，绘制当前或已经存在的路径
        this.graphics.stroke();

        //---graphics.fill()
        //根据当前的画线样式，填充当前或已经存在的路径
        this.graphics.fill();

        //---弧形（与矩形分用stroke，fill）
        //1---graphics.arc(cx, cy, r, startAngle, endAngle, counterclockwise = false)
        //绘制圆弧路径---圆弧路径的圆心在（cx, cy）位置，半径为r，根据counterclockwise指定的方向从startAngle开始绘制，到endAngle结束
        //参数cx（Number）---圆弧所在圆心的x轴坐标
        //参数cy（Number）---圆弧所在圆心的y轴坐标
        //参数startAngle（Number）---弧开始的角度，从正x轴顺时针方向测量，以弧度表示
        //参数endAngle（Number）---弧结束的角度，从正x轴顺时针方向测量，以弧度表示
        //参数counterclockwise（Boolean）---true：逆时针；false：顺时针
        //一周的弧度 === 2PI
        console.log('PI = ' + Math.PI);
        this.graphics.arc(-400, -200, 100, 0, Math.PI / 2, false);
        this.graphics.lineTo(-400, -200);
        this.graphics.close();
        this.graphics.arc(-400, 200, 100, 0, Math.PI / 2, true);
        this.graphics.lineTo(-400, 200);
        this.graphics.close();
        //2---graphics.ellipse(cx, cy, rx, ry)
        //绘制椭圆路径
        //参数cx（Number）---中心点x轴坐标
        //参数cy（Number）---中心点y轴坐标
        //参数rx（Number）---x轴半径
        //参数ry（Number）---y轴半径
        this.graphics.ellipse(200, 0, 50, 100);
        //3---graphics.circle(cx, cy, r)
        //绘制圆形路径
        //参数cx（Number）---中心点x轴坐标
        //参数cy（Number）---中心点y轴坐标
        //参数r（Number）---半径
        this.graphics.circle(400, 0, 100);

        this.graphics.stroke();
        this.graphics.fill();

        // this.initUi();
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