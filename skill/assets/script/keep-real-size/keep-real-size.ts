const { ccclass, property } = cc._decorator;

@ccclass
export default class KeepRealSize extends cc.Component {

    private _lastScaleX: number = 0;
    private _lastScaleY: number = 0;
    private _originalScaleX: number = 0;
    private _originalScaleY: number = 0;

    onLoad() {
        // 保存旧值，因为编辑器编辑的时候，本节点的缩放值不一定是 1
        this._originalScaleX = this.node.scaleX;
        this._originalScaleY = this.node.scaleY;
        this._lastScaleX = cc.view.getScaleX();
        this._lastScaleY = cc.view.getScaleY();
        this._adjustSize();
    }

    _adjustSize(): void {
        this.node.scaleX = this._originalScaleX / cc.view.getScaleX();
        this.node.scaleY = this._originalScaleY / cc.view.getScaleY();
    }

    update(): void {
        let scaleX: number = cc.view.getScaleX();
        let scaleY: number = cc.view.getScaleX();
        if (this._lastScaleX !== scaleX || this._lastScaleY !== scaleY) {
            this._adjustSize();
            this._lastScaleX = scaleX;
            this._lastScaleY = scaleY;
        }
    }
}