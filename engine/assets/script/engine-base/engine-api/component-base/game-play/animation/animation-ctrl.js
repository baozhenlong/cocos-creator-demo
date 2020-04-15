cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.animation = this.node.getComponent(cc.Animation);

        // --- animation.getClips()
        // 获取动画组件上的所有动画剪辑
        // 返回值 ([cc.AnimationClip])
        this.animClips = this.animation.getClips();

        // --- AnimationClip
        // 动画剪辑；用于存储动画数据
        // 1 --- animationClip.name
        // 动画名
        console.log('animationClip.name = ' + this.animClips[0].name); //anim-right-1
        // 2 --- animationClip.duration
        // 动画的持续时间 (Number)
        // 3 --- animationClip.sample
        // 动画的帧速率 (Number)
        // 4 --- animationClip.speed
        // 动画的播放速度 (Number)
        // 5 --- animationClip.wrapMode
        // 动画的循环模式 (Enum)
        // 默认 --- Default --- 向 Animation Component 或者 AnimationClip 查找 warpMode
        // 正向播放一遍 --- Normal --- 动画只播放一遍
        // 反向播放一遍 --- Reverse --- 从最后一帧或结束位置开始反向播放，到第一帧或开始位置停止
        // 循环播放 --- Loop
        // 反向循环播放 --- LoopReverse
        // 正向来回播放 --- PingPong --- 从第一帧播放到最后一帧，然后反向播放回第一帧，到第一帧再正向播放，如此循环
        // 反向来回播放 --- PingPongReverse --- 从最后一帧开始方向播放，其它同PingPong

        // --- animation.getAnimationState(name)
        // 获取 AnimationState ；获取当前或指定的动画状态
        // 参数 name (String) --- 动画名
        // 返回值 (AnimationState)
        var animState = this.animation.getAnimationState('anim-right-1');

        // --- AnimationState
        // AnimationClip 运行时的实例，它将动画数据解析为方便程序中做计算的数值；完全控制动画播放过程
        // 获取动画信息；可以利用这些信息修改动画
        // 1 --- AnimationState.clip
        // 获取动画关联的 clip (AnimationClip)
        var clip = animState.clip;
        // 2 --- AnimationState.name
        // 获取动画的名字 (String)
        var name = animState.name;
        console.log('name = ' + name); // anim-right-1
        // 3 --- AnimationState.speed
        // 获取动画的播放速率 (Number)
        var speed = animState.speed;
        // 4 --- AnimationState.duration
        // 获取动画的播放总时长 (Number) ---秒
        var duration = animState.duration;
        // 5 --- AnimationState.time
        // 获取动画的播放时间 (Number) ---秒
        var time = animState.time;
        // 6 --- AnimationState.repeatCount
        // 获取动画的重复次数 (Number)
        var repeatCount = animState.repeatCount;
        // 7 --- AnimationState.wrapMode
        // 获取动画的循环模式 (Enum)
        var wrapMode = animState.wrapMode;
        // 8 --- AnimationState.playing
        // 获取动画是否正在播放 (Boolean)
        var playing = animState.isPlaying;
        // 9 --- AnimationState.paused
        // 获取动画是否已经暂停 (Boolean)
        var paused = animState.isPaused;
        // 10 --- AnimationState.frameRate
        // 获取动画的帧率
        var frameRate = animState.frameRate;
    },

    onPlayOneAnimClicked: function () {
        //---animation | animationState.play(name, startTime)
        //播放指定的动画，并且停止当前正在播放动画；如果没有指定动画，则播放默认动画
        //参数name（String）---动画名
        //参数startTime（Number）---指定动画开始播放的时间
        //返回值（AnimationState）
        //播放规则---Animation对一个动画进行播放的时候会判断这个动画之前的播放状态来进行下一步操作：
        //状态---停止状态，则Animation会直接重新播放这个动画
        //状态---暂停状态，则Animation会恢复动画的播放，并从当前时间继续播放下去
        //状态---播放状态，则Animation会先停止这个动画，再重新播放动画
        //1---播放默认动画
        this.animation.play();
        //2---播放指定动画
        this.animation.play(this.animClips[0].name);
        this.animation.play('anim-right-1');
    },

    onPlayMoreAnimClicked: function () {
        //---animation | animationState.playAdditive(name, startTime)
        //返回值（AnimationState）
        //播放指定的动画（将不会停止当前播放的动画）；如果没有指定动画，则播放默认动画
        //1---播放默认动画
        this.animation.playAdditive();
        //2---播放指定动画
        this.animation.playAdditive('anim-right-2');
    },

    onPauseAnimClicked: function () {
        //---animation | animationState.pause(name)
        //暂停动画，暂时停止动画的播放
        //1---暂停当前动画
        this.animation.pause();
        //2---暂停指定的动画
        this.animation.pause('anim-right-1');
    },

    onResumeAnimClicked: function () {
        //---animation | animationState.resume(name)
        //恢复动画，动画会继续从当前时间往下播放
        //1---恢复当前动画
        this.animation.pause();
        //2---恢复指定的动画
        this.animation.remuse('anim-right-1');
    },

    onStopAnimClicked: function () {
        //---animation | animationState.stop(name)
        //停止动画，会终止动画的播放，再对这个动画进行播放的时候会重新从开始播放动画
        //1---停止当前动画
        this.animation.stop();
        //2---停止指定的动画
        this.animation.stop('anim-right-1');
    },

    // setCurrentTime(time, name)
    // 设定指定动画的播放时间；如果没有指定名字，则设置当前播放动画的播放时间
    // 参数 time (Number) --- 指定动画所在的时间
    // 参数 name (String) --- 动画名称
});