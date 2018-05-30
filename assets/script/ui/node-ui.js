cc.Class({
    extends: cc.Component,

    properties: {
        isSelected: false,
        isVisible: true,
        targetSprite: cc.Sprite,
        normalSpriteFrame: cc.SpriteFrame,
        selectedSpriteFrame: cc.SpriteFrame
    },

    onLoad() {
        this.updateSelectedUi();
        this.updateVisibleUi();
    },

    updateSelectedUi: function () {
        if (this.targetSprite) {
            if (this.isSelected) {
                if (this.selectedSpriteFrame) {
                    this.targetSprite.spriteFrame = this.selectedSpriteFrame;
                }
            } else {
                if (this.normalSpriteFrame) {
                    this.targetSprite.spriteFrame = this.normalSpriteFrame;
                }
            }
        }
    },

    updateVisibleUi: function () {
        if (this.isVisible) {
            this.node.opacity = 255;
        } else {
            this.node.opacity = 100;
        }
    },

    setSelected: function (value) {
        if (this.isSelected === value) {
            return;
        }
        this.isSelected = value;
        this.updateSelectedUi();
    },

    setVisible: function (value) {
        if (this.isVisible === value) {
            return;
        }
        this.isVisible = value;
        this.updateVisibleUi();
    }

    // start () {

    // },

    // update (dt) {},
});