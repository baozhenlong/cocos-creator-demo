cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---this.animation（cc.Animation）
    },


    onEnable: function () {
        //---注册动画回调事件
        //开始播放时
        this.animation.on('play', this.onPlay, this);
        //停止播放时
        this.animation.on('stop', this.onStop, this);
        //假如动画循环次数 > 1，当动画播放到最后一帧时
        this.animation.on('lastframe', this.onLastFrame, this);
        //播放完成时
        this.animation.on('finished', this.onFinished, this);
        //暂停播放时
        this.animation.on('pause', this.onPause, this);
        //恢复播放时
        this.animation.on('resume', this.onResume, this);
        //对单个cc.AnimationState注册回调
        var animState = this.animation.getAnimationState('animation-right-1');
        animState.on('play', this.onPlay, this);
    },

    onDisable: function () {
        //取消注册动画回调
        this.animation.off('play', this.onPlay, this);
        this.animation.off('stop', this.onStop, this);
        this.animation.off('lastframe', this.onLastFrame, this);
        this.animation.off('finished', this.onFinished, this);
        this.animation.off('pause', this.onPause, this);
        this.animation.off('resume', this.onResume, this);

        var animState = this.animation.getAnimationState('animation-right-1');
        animState.off('play', this.onPlay, this);
    },

    onPlay: function () {},
    onStop: function () {},
    onLastFrame: function () {},
    onFinished: function () {},
    onPause: function () {},
    onResume: function () {}

    // start() {},

    // update (dt) {}
});