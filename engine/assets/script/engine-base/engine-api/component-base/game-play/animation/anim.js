cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        sheepAtlas: cc.SpriteAtlas
    },

    onLoad() {
        this.count = 0;
        this.sheepDownAnimState = this.anim.getAnimationState('sheepDown');
        console.log('sheepDownAnimState', this.sheepDownAnimState);
    },

    onEnable() {
        // this.anim.on('stop', this.onAnimSheepDownStop, this);

        // 引擎 bug ，对单个 animationState 实现回调，先注册后播放无效
        // this.sheepDownAnimState.on('stop', this.onAnimStateSheepDownStop, this);
        // 可重写 animationState.onStop 解决
        // this.sheepDownAnimState.onStop = () => {
        //     this.onAnimStateSheepDownStop();
        // };
    },

    onDisable() {
        // this.anim.off('stop', this.onAnimSheepDownStop, this);
    },

    onAnimSheepDownStop() {
        this.count++;
        console.log('anim count =', this.count);
    },

    onAnimStateSheepDownStop() {
        this.count++;
        console.log('animState count =', this.count);
    },

    play() {
        // this.anim.once('stop', this.onSheepDownStop, this);
        this.anim.play('sheepDown');
        // 快速连续调用：stop callback 会执行相应次数，但视觉上只有一次完整的动画
        // 因为 play 会停止当前正在播放动画
        // 使用 once 监听，会立即执行相应次数的 stop callback
        // 使用 on 监听，会立即执行相应次数 - 1 的 stop callback ，最后一次会在动画播放完后执行
        // 对单个 animationState 实现回调，需先播放再注册回调
        this.sheepDownAnimState.on('stop', this.onAnimStateSheepDownStop, this);
    },

    playIfNeeded() {
        if (this.sheepDownAnimState.isPlaying) {
            console.log('当前动画正在播放');
        } else {
            this.play();
        }
    },

    stop() {
        let animState = this.anim.getAnimationState('sheepDown');
        if (animState.isPlaying) {
            console.log('停止动画');
            this.anim.stop('sheepDown');
        }
    },

    resetAnim() {
        this.anim.setCurrentTime(0, 'sheepDown');
    },

    // 动态创建 Animation Clip
    // cc.AnimationClip.createWithSpriteFrames(spriteFrames sample)
    // 使用一组序列帧图片来创建动画剪辑
    // 参数 spriteFrames ([SpriteFrame]) --- 序列帧图片
    // 参数 sample (Number) --- 动画的帧速率
    playSheepRun() {
        let clipArr = this.anim.getClips();
        let found = clipArr.find(clip => clip.name === 'sheepRun');
        if (found) {
            console.log('已有动画，直接播放动画');
            this.anim.play('sheepRun');
        } else {
            console.log('创建动画，并播放动画');
            let sample = 60;
            let frames = [];
            for (let i = 0; i <= 3; i++) {
                let frame = this.sheepAtlas.getSpriteFrame(`sheep_run_${i}`);
                frames.push(frame);
                // 1 / sample 处，插入帧图片
            }
            let clip = cc.AnimationClip.createWithSpriteFrames(frames, 60);
            clip.name = 'sheepRun';
            clip.speed = 0.2;
            clip.wrapMode = cc.WrapMode.Normal;

            // 添加帧事件
            // 帧事件所在的组件需加到 Animation 组件所在的节点
            clip.events.push({
                frame: 1 / sample * 3, // 帧事件触发秒数
                func: 'onSheepRunFrameEvent', // 回调函数名称
                params: ['hi', 'hello'] // 回调参数
            });

            console.log('clip', clip);
            this.anim.addClip(clip);
            this.anim.play('sheepRun');
        }
    }

});