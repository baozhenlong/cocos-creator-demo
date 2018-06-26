cc.Class({
    extends: cc.Component,

    properties: {
        gridLayout: cc.Layout
    },

    onLoad() {
        //---cc.Layout
        //自动对它的所有子节点进行统一排版
        //不会考虑子节点的缩放和旋转
        //对Layout设置后结果需要到下一帧才会更新，除非手动调用updateLayout

        //---layout.type
        //布局类型（Enum）
        //取消布局---cc.Layout.Type.NONE
        //水平布局---cc.Layout.Type.HORIZONTAL
        //垂直布局---cc.Layout.Type.VERTICAL
        //网格布局---cc.Layout.Type.GRID

        //---layout.resizeMode
        //缩放模式（Enum）
        //不做任何缩放---cc.Layout.ResizeMode.NONE
        //自适应容器大小---cc.Layout.ResizeMode.CONTAINER---容器的大小会根据子节点的大小自动缩放
        //自适应子节点大小---cc.Layout.ResizeMode.CHILDREN---子节点的大小会随着容器的大小自动缩放

        //---layout.startAxis
        //起始轴方向（Enum）---当layout.type === cc.Layout.Type.GRID时有效
        //水平---cc.Layout.AxisDirection.HORIZONTAL
        //垂直---cc.Layout.AxisDirection.VERTICAL

        //---layout.cellSize
        //每个格子的大小（Size）
        //当layout.type === cc.Layout.Type.GRID且layout.resizeMode === cc.Layout.ResizeMode.CHILDREN时有效
        console.log(JSON.stringify(this.gridLayout.cellSize)); //{"width":40,"height":40}

        //---子节点间距
        //子节点之间的水平间距（Number）---layout.spacingX
        //子节点之间的水平间距（Number）---layout.spacingY

        //---layout.padding
        //容器内边距，该属性会在4个布局方向上生效（Number）---is deprecated，不赞成
        //layout.paddingLeft
        //容器内左边距（Number）---只会在一个布局方向上生效
        //layout.paddingRight
        //容器内右边距（Number）---只会在一个布局方向上生效       
        //layout.paddingTop
        //容器内上边距（Number）---只会在一个布局方向上生效
        //layout.paddingBottom
        //容器内下边距（Number）---只会在一个布局方向上生效

        //---排列子节点方向
        //水平排列---layout.horizontalDirection
        //从左往右排列---cc.Layout.HorizontalDirection.LEFT_TO_RIGHT
        //从右往左排列---cc.Layout.HorizontalDirection.RIGHT_TO_LEFT
        //垂直排列---layout.verticalDirection
        //从上到下排列---cc.Layout.VerticalDirection.TOP_TO_BOTTOM
        //从下到上排列---cc.Layout.VerticalDirection.BOTTOM_TO_TOP

        //---layout.updateLayout()
        //立即执行更新布局

    },

    // start() {},

    // update (dt) {}
});