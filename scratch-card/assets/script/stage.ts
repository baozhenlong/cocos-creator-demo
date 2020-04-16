const { ccclass, property } = cc._decorator;

enum TypeEnum {
    Circle,
    Line
}

@ccclass
export default class Stage extends cc.Component {

    @property({
        type: cc.Node
    })
    prizeNode: cc.Node = null;

    @property({
        type: cc.Label
    })
    descLb: cc.Label = null;

    /**
     * 遮罩
     *
     * @type {cc.Mask}
     * @memberof Stage
     */
    @property({
        type: cc.Mask
    })
    mask: cc.Mask = null;

    /**
     * 刮开点的半径
     *
     * @type {number}
     * @memberof Stage
     */
    @property({
        type: cc.Float
    })
    radius: number = 10;

    /**
     * 刮开提示信息
     *
     * @type {cc.Label}
     * @memberof Stage
     */
    @property({
        type: cc.Label
    })
    progressLb: cc.Label = null;

    /**
     * 刮开进度
     *
     * @private
     * @type {number}
     * @memberof Stage
     */
    private _progress: number = 0;

    /**
     * 触摸点数组
     *
     * @private
     * @type {cc.Vec2[]}
     * @memberof Stage
     */
    private _drawPointArr: cc.Vec2[] = [];

    /**
     * 刮开类型
     *
     * @type {TypeEnum}
     * @memberof Stage
     */
    @property({
        type: cc.Enum(TypeEnum)
    })
    type: TypeEnum = TypeEnum.Circle;

    /**
     * 刮开点的数据数组
     *
     * @private
     * @type {{ rect: cc.Rect, isHit: boolean, node: cc.Node }[]}
     * 点所在的矩形信息
     * isHit 是否被刮开
     * 辅助点
     * @memberof Stage
     */
    private _pointDataArr: { rect: cc.Rect, isHit: boolean, node: cc.Node }[] = [];

    /**
     * 辅助点父节点
     *
     * @type {cc.Node}
     * @memberof Stage
     */
    @property({
        type: cc.Node
    })
    auxiliaryPointParent: cc.Node = null;

    /**
     * 辅助点预制体
     *
     * @type {cc.Prefab}
     * @memberof Stage
     */
    @property({
        type: cc.Prefab
    })
    auxiliaryPointTemplate: cc.Prefab = null;

    /**
     * 辅助点的大小，用来记录刮开比例
     *
     * @type {cc.Size}
     * @memberof Stage
     */
    @property({})
    auxiliaryPointSize: cc.Size = cc.size(10, 10);

    onLoad() {
        this._init();
    }

    onEnable() {
        this.prizeNode.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        this.prizeNode.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
        this.prizeNode.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
    }

    onDisable() {
        this.prizeNode.off(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        this.prizeNode.off(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
        this.prizeNode.off(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
    }

    private _touchStart(touch: cc.Touch): void {
        let point: cc.Vec2 = this.prizeNode.convertToNodeSpaceAR(touch.getLocation());
        this._drawMask(point);
    }

    private _touchEnd(): void {
        this._updateProgress();
    }

    private _touchMove(touch: cc.Touch): void {
        let point: cc.Vec2 = this.prizeNode.convertToNodeSpaceAR(touch.getLocation());
        this._drawMask(point);
    }

    private _getGraphics(): cc.Graphics {
        return (this.mask as any)._graphics;
    }

    onClickChangeToLineType(): void {
        if (this.type !== TypeEnum.Line) {
            this.type = TypeEnum.Line;
        }
    }

    onClickChangeToCircleType(): void {
        if (this.type !== TypeEnum.Circle) {
            this.type = TypeEnum.Circle;
        }
    }

    onClickSmart(): void {
        if (this.descLb.string !== '聪明') {
            this.descLb.string = '聪明';
        }
    }

    onClickStupid(): void {
        if (this.descLb.string !== '笨') {
            this.descLb.string = '笨';
        }
    }

    onClickReset(): void {
        this._reset();
    }

    /**
     * 更新刮开比例提示
     *
     * @private
     * @param {number} progress
     * @memberof Stage
     */
    private _updateProgressTip(progress: number): void {
        this.progressLb.string = '已经刮开\n' + progress + ' %';
    }

    /**
     * 更新刮开比列
     *
     * @private
     * @memberof Stage
     */
    private _updateProgress(): void {
        let hitNum: number = 0;
        this._pointDataArr.forEach(({
            isHit
        }) => {
            if (isHit) {
                hitNum++;
            }
        });
        // cc.log('hitNum', hitNum);
        let progress: number = Math.floor(hitNum / this._pointDataArr.length * 10000) / 100;
        if (this._progress !== progress) {
            this._progress = progress;
            this._updateProgressTip(progress);
        }
    }

    /**
     * 初始化数据，界面
     *
     * @private
     * @memberof Stage
     */
    private _init(): void {
        this.mask.node.y = this.prizeNode.y;
        this.mask.node.width = 0;
        this.mask.node.height = 0;
        this._progress = 0;
        this._updateProgressTip(0);
        this._drawPointArr = [];
        this._pointDataArr = [];
        let originX: number = -(this.prizeNode.width / 2);
        let originY: number = -(this.prizeNode.height / 2);
        this.auxiliaryPointParent.removeAllChildren();
        for (let x = 0; x <= this.prizeNode.width; x += this.auxiliaryPointSize.width) {
            for (let y = 0; y < this.prizeNode.height; y += this.auxiliaryPointSize.height) {
                let node: cc.Node = cc.instantiate(this.auxiliaryPointTemplate);
                let posX: number = originX + x;
                let posY: number = originY + y;
                this._pointDataArr.push({
                    rect: cc.rect(posX, posY, this.auxiliaryPointSize.width, this.auxiliaryPointSize.height),
                    isHit: false,
                    node
                });
                node.width = this.auxiliaryPointSize.width;
                node.height = this.auxiliaryPointSize.height;
                node.setPosition(posX, posY);
                node.color = cc.color(255, 255, 255, 255);
                this.auxiliaryPointParent.addChild(node);
            }
        }
    }

    /**
     * 重置界面即数据
     *
     * @private
     * @memberof Stage
     */
    private _reset(): void {
        this._progress = 0;
        this._updateProgressTip(0);
        this._getGraphics().clear();
        this._drawPointArr = [];
        this._pointDataArr.forEach((value) => {
            if (value.isHit) {
                value.isHit = false;
            }
            value.node.color = cc.color(255, 255, 255, 255);
        });
    }

    /**
     * 用点刮开图层
     *
     * @private
     * @param {cc.Graphics} graphics
     * @param {cc.Vec2} point 触摸点
     * @memberof Stage
     */
    private _drawPointWithCircle(graphics: cc.Graphics, point: cc.Vec2): void {
        graphics.circle(point.x, point.y, this.radius);
        graphics.fill();
        for (let i = 0; i < this._pointDataArr.length; i++) {
            let {
                rect,
                isHit
            } = this._pointDataArr[i];
            if (isHit) {
                continue;
            }
            if (cc.Intersection.polygonCircle(
                [
                    cc.v2(rect.x, rect.y),
                    cc.v2(rect.x, rect.y + rect.height),
                    cc.v2(rect.x + rect.width, rect.y + rect.height),
                    cc.v2(rect.x + rect.width, rect.y)
                ],
                {
                    position: cc.v2(point.x, point.y),
                    radius: this.radius
                }
            )) {
                this._pointDataArr[i].isHit = true;
                this._pointDataArr[i].node.color = cc.color(0, 0, 255, 255);
            }
        }
    }

    /**
     * 用线刮开图层
     *
     * @private
     * @param {cc.Graphics} graphics
     * @param {number} len 触摸点的个数
     * @memberof Stage
     */
    private _drawPointWithLine(graphics: cc.Graphics, len: number): void {
        let previousPoint: cc.Vec2 = this._drawPointArr[len - 2];
        let currentPoint: cc.Vec2 = this._drawPointArr[len - 1];
        graphics.lineWidth = this.radius * 2;
        graphics.lineCap = cc.Graphics.LineCap.ROUND;
        graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        graphics.strokeColor = cc.color(255, 255, 255, 255);
        graphics.moveTo(previousPoint.x, previousPoint.y);
        graphics.lineTo(currentPoint.x, currentPoint.y);
        graphics.stroke();
        for (let i = 0; i < this._pointDataArr.length; i++) {
            let {
                rect,
                isHit
            } = this._pointDataArr[i];
            if (isHit) {
                continue;
            }
            if (cc.Intersection.lineRect(previousPoint, currentPoint, rect)) {
                this._pointDataArr[i].isHit = true;
                this._pointDataArr[i].node.color = cc.color(0, 0, 255, 255);
            }
        }
    }

    /**
     * 刮开图层并记录刮开点
     *
     * @private
     * @param {cc.Vec2} point 触摸点
     * @memberof Stage
     */
    private _drawMask(point: cc.Vec2): void {
        let len: number = this._drawPointArr.length;
        this._drawPointArr.push(point);
        let graphics: cc.Graphics = this._getGraphics();
        if (len <= 1) {
            // if (true) {
            this._drawPointWithCircle(graphics, point);
        } else {
            if (this.type === TypeEnum.Circle) {
                this._drawPointWithCircle(graphics, point);
            } else if (this.type === TypeEnum.Line) {
                this._drawPointWithLine(graphics, len);
            }
        }
    }

}