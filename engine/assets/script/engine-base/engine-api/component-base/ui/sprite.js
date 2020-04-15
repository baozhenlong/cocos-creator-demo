cc.Class({
    extends: cc.Component,

    properties: {
        horizontalSprite: cc.Sprite,
        verticalSprite: cc.Sprite,
        radialSprite: cc.Sprite
    },

    onLoad() {
        //---cc.Sprite

        //---sprite.spriteFrame
        //精灵的精灵帧（cc.SpriteFrame）

        //---sprite.type
        //精灵渲染类型（Enum）
        //普通---cc.Sprite.Type.SIMPLE---修改尺寸，会整体拉伸图像，适用于序列帧动画和普通图像
        //九宫格---cc.Sprite.Type.SLICED---修改尺寸，4个角的区域不会拉伸，适用于UI按钮和面板背景
        //平铺---cc.Sprite.Type.TILED---修改尺寸，会根据节点的size，不断平铺原始大小的图片
        //填充---cc.Sprite.Type.FILLED---设置一定的填充起始位置和方向，能以一定的比率裁剪显示图片
        console.log(this.horizontalSprite.type === cc.Sprite.Type.FILLED); //true

        //---当sprite.type === cc.Sprite.Type.FILLED时有效
        //1---sprite.fillType
        //精灵填充类型（Enum）
        //横向---cc.Sprite.FillType.HORIZONTAL
        //纵向---cc.Sprite.FillType.VERTICAL
        //扇形---cc.Sprite.FillType.RADIAL
        console.log(this.horizontalSprite.fillType === cc.Sprite.FillType.HORIZONTAL); //true
        //2---sprite.fillCenter
        //当sprite.fillType === cc.Sprite.FillType.RADIAL时有效
        //填充中心点（Vec2）
        //3---sprite.fillStart
        //填充起始点（Number）---[0, 1]
        //HORIZONTAL---0---最左边
        //HORIZONTAL---1---最右边
        //VERTICAL---0---最下边
        //VERTICAL---1---最上边
        //RADIAL---0,1---x正半轴
        //RADIAL---0.25---y正半轴
        //RADIAL---0.5---x负半轴
        //RADIAL---0.75---y负半轴
        //4---sprite.fillRange
        //填充范围（Number）---[-1, 1]
        //HORIZONTAL---负数---从起始点往左填充
        //HORIZONTAL---正数---从起始点往右填充
        //VERTICAL---负数---从起始点往下填充
        //VERTICAL---正数---从起始点往上填充
        //RADIAL---负数---顺时针填充
        //RADIAL---正数---逆时针填充

        //---sprite.sizeMode
        //精灵尺寸调整模式（Sprite.SizeMode）
        //表示自定义尺寸---cc.Sprite.SizeMode.CUSTOM
        //表示原始图片裁剪透明像素后的尺寸---cc.Sprite.SizeMode.TRIMMED
        //表示原始图片未裁剪的尺寸---cc.Sprite.SizeMode.CUSTOM.RAW

        //---sprite.trim
        //是否去除节点约束框内的透明区域（Boolean）


    },

    // start() {},

    // update (dt) {}
});