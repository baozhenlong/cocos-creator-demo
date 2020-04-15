const { ccclass, property } = cc._decorator;

@ccclass
export default class Stage extends cc.Component {

    /**
     *  后面（在左侧）的背景节点
     *
     * @type {cc.Node[]}
     * @memberof Stage
     */
    @property({
        type: [cc.Node]
    })
    backNodeArr: cc.Node[] = [];

    /**
     * 前面（在右侧）的背景节点
     *
     * @type {cc.Node[]}
     * @memberof Stage
     */
    @property({
        type: [cc.Node]
    })
    frontNodeArr: cc.Node[] = [];

    /**
     * 背景移动的速度
     *
     * @type {number}
     * @memberof Stage
     */
    @property({
        type: cc.Float
    })
    speed: number = 500;

    /**
     * 视图的宽度，用于适配
     *
     * @private
     * @type {number}
     * @memberof Stage
     */
    private _width: number = 0;

    onLoad() {
        this._adjustUI();
        if (cc.sys.isBrowser) {
            cc.view.setResizeCallback(() => {
                this._adjustUI();
            });
        }
    }

    /**
     * 根据视图区域的宽度调整背景节点的宽度和初始位置
     *
     * @private
     * @memberof Stage
     */
    private _adjustUI(): void {
        this._width = cc.view.getVisibleSize().width;
        cc.log('width', this._width);
        this.backNodeArr.forEach((node: cc.Node) => {
            node.width = this._width;
            node.x = 0;
        });
        this.frontNodeArr.forEach((node: cc.Node) => {
            node.width = this._width;
            node.x = this._width;
        });
    }

    /**
     * 刷新背景的位置
     *
     * @param {number} dt
     * @memberof Stage
     */
    update(dt: number) {
        let delta: number = dt * this.speed;
        // 当前面的背景快跑完时，复原背景的初始位置
        if (this.frontNodeArr[0].x - delta <= 0) {
            cc.log('复原', this.frontNodeArr[0].x);
            this.backNodeArr.forEach((node: cc.Node) => {
                node.x = this.frontNodeArr[0].x;
            });
            this.frontNodeArr.forEach((node: cc.Node) => {
                node.x = node.x + this._width;
            });
        }
        this.backNodeArr.forEach((node: cc.Node) => {
            node.x -= delta;
        });
        this.frontNodeArr.forEach((node: cc.Node) => {
            node.x -= delta;
        });
    }
}