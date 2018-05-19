cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
        //1---AnimationClip---动画数据的承载
        //getClips()获取动画组件上的所有动画剪辑
        //返回值（[cc.AnimationClip]）---动画剪辑
        this.animClips = this.anim.getClips();
        console.log('animationClip.name = ' + this.animClips[0].name); //anim-right-1

        //2---AnimationState---AnimationClip运行时的实例，它将动画数据解析为方便程序中做计算的数值
        //2.1---获取AnimationState
        var animState = this.anim.getAnimationState('anim-right-1');
        //2.2---获取动画信息---可以利用这些信息修改动画
        //2.2.1---clip---获取动画关联的clip
        var clip = animState.clip;
        //2.2.2---name---获取动画的名字
        var name = animState.name;
        console.log('name = ' + name); //anim-right-1
        //2.2.3--speed---获取动画的播放速度
        var speed = animState.speed;
        //2.2.4--duration---获取动画的播放总时长
        var duration = animState.duration;
        //2.2.5--time---获取动画的播放时间
        var time = animState.time;
        //2.2.6--repeatCount---获取动画的重复次数
        var repeatCount = animState.repeatCount;
        //2.2.7--wrapMode---获取动画的循环模式
        var wrapMode = animState.wrapMode;
        //2.2.8--playing---获取动画是否正在播放
        var playing = animState.playing;
        //2.2.9--paused---获取动画是否已经暂停
        var paused = animState.paused;
        //2.2.10--frameRate---获取动画的帧率
        var frameRate = animState.frameRate;
    },

    //3---注册动画回调
    onEnable: function() {
        //注册
        this.anim.on('play', this.onPlay, this);
        this.anim.on('stop', this.onStop, this);
        this.anim.on('lastframe', this.onLastFrame, this);
        this.anim.on('finished', this.onFinished, this);
        this.anim.on('pause', this.onPause, this);
        this.anim.on('resume', this.onResume, this);
        //对单个cc.AnimationState注册回调
        var animState = this.anim.getAnimationState('anim-right-1');
        animState.on('play', this.onPlay, this);
    },

    onDisable: function() {
        //取消注册
        this.anim.off('play', this.onPlay, this);
        this.anim.off('stop', this.onStop, this);
        this.anim.off('lastframe', this.onLastFrame, this);
        this.anim.off('finished', this.onFinished, this);
        this.anim.off('pause', this.onPause, this);
        this.anim.off('resume', this.onResume, this);

        var animState = this.anim.getAnimationState('anim-right-1');
        animState.off('play', this.onPlay, this);
    },

    onPlayOneAnimClicked: function() {
        //1---play(name, startTime)---播放指定的动画，并且停止当前正在播放动画；如果没有指定动画，则播放默认动画
        //参数name（String）---动画名
        //参数startTime（Number）---指定动画开始播放的时间
        //1.1---Animation对一个动画进行播放的时候会判断这个动画之前的播放状态来进行下一步操作：
        //1.1.1---停止状态，则Animation会直接重新播放这个动画
        //1.1.2---暂停状态，则Animation会恢复动画的播放，并从当前时间继续播放下去
        //1.1.3---播放状态，则Animation会先停止这个动画，再重新播放动画
        // anim.play();
        this.anim.play(this.animClips[0].name);
        this.anim.play('anim-right-1');
    },

    onPlayMoreAnimClicked: function() {
        //2---playAdditive(name, startTime)---播放指定的动画（将不会停止当前播放的动画）；如果没有指定动画，则播放默认动画
        this.anim.playAdditive('anim-right-1');
        this.anim.playAdditive('anim-right-2');
    },

    onPauseAnimClicked: function() {
        //3---pause(name)---暂停动画，暂时停止动画的播放
        //3.1---暂停当前动画
        this.anim.pause();
        //3.2---暂停指定的动画
        this.anim.pause('anim-right-1');
    },

    onResumeAnimClicked: function() {
        //3---resume(name)---恢复动画，动画会继续从当前时间往下播放
        //3.1---恢复当前动画
        this.anim.pause();
        //3.2---恢复指定的动画
        this.anim.remuse('anim-right-1');
    },

    onStopAnimClicked: function() {
        //3---stop(name)---停止动画，会终止动画的播放，再对这个动画进行播放的时候会重新从开始播放动画
        //3.1---停止当前动画
        this.anim.stop();
        //3.2---停止指定的动画
        this.anim.stop('anim-right-1');
    },

    onPlay: function() {},
    onStop: function() {},
    onLastFrame: function() {},
    onFinished: function() {},
    onPause: function() {},
    onResume: function() {}

    // start () {

    // },

    // update (dt) {},
});