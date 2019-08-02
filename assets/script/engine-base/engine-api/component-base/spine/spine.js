// 骨骼动画
cc.Class({
    extends: cc.Component,

    properties: {
        spineNode: cc.Node
    },

    onLoad() {
        this.spine = this.spineNode.getComponent(sp.Skeleton);
    },

    // 组件属性
    printComponentProperties() {
        // skeletonData --- 骨骼动画的数据文件
        // defaultSkin (String) --- 默认的皮肤名称
        // animation (String) --- 当前播放的动画名称
        // loop (Boolean) --- 是否循环播放当前骨骼动画
        // timeScale (Number) --- 当前骨骼中所有动画的时间缩放率
    },

    // 组件方法

    // setAnimation(trackIndex, animName, loop)
    // 设置当前动画，队列中的任何动画将被清除 （不包括 addAnimation 添加的动画）
    // 参数 trackIndex (Number) --- 轨道索引
    // 参数 animName (String) --- 动画名称
    // 参数 loop (Boolean) --- 是否循环
    // 返回值 trackEntry (sp.spine.TrackEntry) --- 一个 sp.spine.TrackEntry 对象
    playAnim() {
        console.log('last animation property', this.spine.animation);
        let animNameArr = ['DDAO2', 'SJ2', 'JQ2', 'LC2', 'LZS2'];
        let animName = animNameArr[Math.floor(Math.random() * animNameArr.length)];
        let entry = this.spine.setAnimation(0, animName, true);
        console.log('will display animation name', animName);
        console.log('current animation property', this.spine.animation);
        console.log('sp.spine.TrackEntry', entry);
        console.log('loop property', this.spine.loop); // 设置动画的循环状态并不会改变组件的 loop 属性
    },

    // addAnimation(trackIndex, animName, loop, delay) 
    // 往轨道添加一个动画到动画队列尾部，还可以延迟指定的秒数
    // 参数 trackIndex (Number) --- 轨道索引
    // 参数 animName (String) --- 动画名称
    // 参数 loop (Boolean) --- 是否循环
    // 参数 delay (Number) --- 延迟的秒数
    // 返回值 trackEntry (sp.spine.TrackEntry) --- 一个 sp.spine.TrackEntry 对象

    playMultipleAnim() {
        this.spine.clearTracks();
        // console.log('last animation property', this.spine.animation);
        this.spine.setAnimation(1, 'WQ2', true);
        this.spine.addAnimation(2, 'JF1', false, 3);
        // console.log('current animation property', this.spine.animation);
        // 播放一次 JF2 并延迟 3 秒后，会播放一次 JF2
        // fix me: 当连续使用 addAnimation 时，会出现奇奇怪怪的问题 （animation 属性未更新，setAnimation 被覆盖等）
        // 可使用 clearTracks() 解决，但 animation 属性会丢失
        // fix me： 连续切换 playAnim 、 playMultipleAnim 会出现动画卡住的现象
    },

    // clearTrack(trackIndex)
    // 清除指定 track 的动画状态
    // 参数 trackIndex (Number) 轨道索引
    clearAnim() {
        this.spine.clearTrack(0);
    },

    clearMultipleAnim() {
        this.spine.clearTrack(1);
        this.spine.clearTrack(2);
    },

    //clearTracks() 
    // 清除所有 track 的动画状态

});