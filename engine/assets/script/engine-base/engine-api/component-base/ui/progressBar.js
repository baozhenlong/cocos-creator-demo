cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---cc.ProgressBar

        //---barSprite
        //用来显示进度条比例的Sprite对象（Sprite）

        //---mode
        //进度条模式（Enum）
        //水平方向模式---cc.ProgressBar.Mode.HORIZONTAL---从左到右正向增加
        //垂直方向模式---cc.ProgressBar.Mode.VERTICAL---从下到上正向增加
        //填充模式---cc.ProgressBar.Mode.FILLED---根据barSprite的fillStart属性（填充起始点）逆时针增加

        //---totalLength
        //进度条实际的总长度（Number）=== barSprite.fillRange

        //---progress
        //当前进度值（Number）---[0,1]

        //---reverse
        //进度条是否进行反方向变化

    },

    // start() {},

    // update (dt) {}
});