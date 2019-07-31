cc.Class({
    extends: cc.Component,

    properties: {

    },

    onSheepRunFrameEvent() {
        let animState = this.node.getComponent(cc.Animation).getAnimationState('sheepRun');
        console.log('onSheepRunFrameEvent time', animState.time); // 0.050188999995589255
        console.log('args', arguments);
    }

});