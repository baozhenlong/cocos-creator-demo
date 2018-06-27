cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---cc.Mask

        //---mask.type
        //遮罩类型（Enum）
        //1---矩形---cc.Mask.Type.RECT
        //2---椭圆---cc.Mask.Type.ELLIPSE
        //mask.segements
        //椭圆遮罩的曲线细分数（Numer）
        //3---图像模板---cc.Mask.Type.IMAGE_STENCIL
        //mask.spriteFrame
        //遮罩所需要的贴图（SpriteFrame）
        //mask.alphaThreshold
        //Alpha值（Number）---[0, 1]；不支持Canvas，只有当模板的像素的alpha > alphaThreshold时，才会绘制内容

        //---mask.inverted
        //反向遮罩（Boolean）---不支持Canvas

    },

    // start() {},

    // update (dt) {}
});