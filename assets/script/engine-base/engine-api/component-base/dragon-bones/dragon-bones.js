// dragonBones 骨骼动画
// 动画资源
{
    // .json 骨骼数据
    // .json 图集数据
    // .png 图集纹理
}
cc.Class({
    extends: cc.Component,

    properties: {
        dragonBones: dragonBones.ArmatureDisplay
    },

    onLoad() {
        this.printComponentProperties();
        this.printApi();
        this.dragonBones.playAnimation('walk', 0);
    },

    onEnable() {
        this.dragonBones.on(dragonBones.EventObject.COMPLETE, this.onComplete, this);
        this.dragonBones.on(dragonBones.EventObject.LOOP_COMPLETE, this.onLoopComplete, this);
    },

    onDisable() {
        this.dragonBones.off(dragonBones.EventObject.COMPLETE, this.onComplete, this);
        this.dragonBones.off(dragonBones.EventObject.LOOP_COMPLETE, this.onLoopComplete, this);
    },

    onComplete() {
        console.log('播放完成');
    },

    onLoopComplete() {
        console.log('动画循环播放完成一次');
    },

    // 组件
    // dragonBones.ArmatureDisplay

    // 组件属性
    printComponentProperties() {
        // dragonAsset
        {
            // 骨骼数据
            console.log('骨骼数据', typeof this.dragonBones.dragonAsset); // object
        }
        // dragonAtlasAsset 
        {
            // 图集数据
            console.log('图集数据', typeof this.dragonBones.dragonAtlasAsset); // object
        }
        // armatureName
        {
            // 当前的 Armature 名称 --- String
            console.log('armatureName', this.dragonBones.armatureName); // mecha_1502b
        }
        // animationName
        {
            // 当前播放的动画名称 --- String
            // 默认为 ''
            console.log('animationName', this.dragonBones.animationName);
        }
        // timeScale
        {
            // 当前播放的动画名称 --- Number
            // 默认为 1
            console.log('timeScale', this.dragonBones.timeScale);
        }
        // playTimes
        {
            // 播放默认动画的循环次数 --- Number
            // -1 ：表示使用配置文件中的默认值
            // 0 ：表示无限循环
            // >0 ：表示循环次数
            // 默认为 -1
            console.log('playTimes', this.dragonBones.playTimes);
        }
    },

    // 组件方法

    getArmature() {
        // comp.armature()
        // 获取 ArmatureDisplay 当前使用的 Armature 对象
        // 返回值 dragonBones.Armature 骨架，是骨骼动画系统的核心，由显示容器、骨骼、插槽、动画、事件系统构成
        this.currentArmature = this.dragonBones.armature();
        console.log('armature', this.currentArmature);
        // Armature 对象
        {
            // 属性
            {
                // animation (dragonBones.Animation)
                {
                    // 动画控制器，用来播放动画数据，管理动画状态
                    // animation.play(animationName: string | null, playTimes:number): dragonBones.AnimationState | null
                    {
                        // 播放动画
                        // 参数 animationName ：动画数据名称，如果未设置，则播放默认动画，或将暂停状态切换为播放状态(重新播放)，或重新播放上一个正在播放的动画
                        // 参数 playTimes ：播放次数；[-1 ：使用动画数据默认值； 0 ：无限循环播放； [1-N] ：循环播放 N 次]
                        // 返回值：对应的动画数据
                    }
                    // animation.stop(animationName: string | null): void
                    {
                        // 暂停播放动画
                        // 参数 animationName 动画状态的名称，如果未设置，则暂停所有动画状态
                    }
                    // animation.reset(): void
                    {
                        // 清除所有动画状态
                    }
                    // 停止动画
                    {
                        // animation.gotoAndStopByFrame(animationName: string, frame: number): dragonBones.AnimationState | null
                        {
                            // 将动画停止到指定的帧
                            // 参数 animationName ：动画数据的名称
                            // 参数 frame ：帧数
                            // 返回值：对应的动画状态
                        }
                    }
                }
            }
            // 方法
            {
                // getSlot(name)
                {
                    // 获取插槽
                    // 参数 name (String) 插槽的名字
                    // 返回值 dragonBones.Slot
                }
                // getSlots()
                {
                    // 获取所有插槽
                    // 返回值 dragonBones.Slot[]
                    console.log('slots', this.currentArmature.getSlots());
                }
            }
        }

        // comp.buildArmature(armatureName, node)
        {
            // 构建指定名称的 armature 对象
            // 参数 armatureName (String) 后续会作为节点的名字
            // 参数 node (Node) node || new cc.Node()
            // 返回值 dragonBones.ArmatureDisplay
        }
    },

    // comp.getAnimationNames(armatureName)
    getAnimNames() {
        // 获取指定的 armature 的所有动画名称
        // 参数 armatureName (String)
        // 返回值 animationNames[String]
        let armature = this.dragonBones.armature();
        let animNames = this.dragonBones.getAnimationNames(armature.name);
        console.log('animNames', animNames);
    },

    // playAnimation(animName, playTimes = -1)
    // 实际调用的是 animation.play()
    // 播放指定的动画；从头播放
    // 参数 animName (String) 指定播放动画的名称
    // 参数 playTimes (Number) 指定播放动画的次数
    // 返回值 dragonBones.AnimationState

    // on, off(type, listener, target)
    // 添加，移除事件监听器
    // 参数 type (String) 类型
    // 参数 listener (Function) 回调函数
    // 参数 target (Object) 回调函数的 this 值

    // Api
    printApi() {
        // dragonBones.AnimationFadeOutMode
        {
            // 动画混合的淡出方式
            console.log('AnimationFadeOutMode', dragonBones.AnimationFadeOutMode);
            // Number
            // All : 4 ，淡出所有动画
            // None : 0 ，不淡出动画
            // SameGroup : 2 ，淡出同组的动画
            // SameLayer : 1 ，淡出同层的动画
            // SameLayerAndGroup : 3 ，淡出同层并且同组的动画
        }
        // dragonBones.Animation.fadeIn(animationName, fadeInTime, playTimes, layer, group, fadeOutMode)
        {
            // 参数 animationName (String) 动画数据的名称
            // 参数 fadeInTime (Number) 淡入时间； -1 ：使用动画数据默认值； [0,N] ：淡入时间（以秒为单位）
            // 参数 playTimes (Number) 播放次数； -1 ：使用动画默认数据； 0 ：无限循环； [1,N] ：循环次数
            // 参数 layer (Number) 混合图层。图层高会优先获取混合权重
            // 参数 group (String) 混合组，用于动画状态编组，方便控制淡出
            // 参数 fadeOutMode (dragonBones.AnimationFadeOutMode) 淡出模式
            // 返回值 dragonBones.AnimationState 对应的动画状态
        }
        // dragonBones.AnimationState
        {
            // 动画状态，播放动画时产生，可以对每个播放的动画进行更细致的控制和调节
            // 属性
            {
                // isPlaying (boolean) 是否正在播放，只读
                // isCompleted (boolean) 是否播放完毕，只读
                // layer (number) 混合图层，只读
                // group (number) 混合组，只读
                // name (string) 动画名称，只读
                // playTimes (number) 播放次数
                // currentPlayTimes (number) 当前播放次数
                // currentTime (number) 动画播放的时间
                // timeScale (number) 播放速度
                // totalTime (number) 动画的总时间，只读
                // weight (number) 混合权重
            }
            // 方法
            {
                // play(): void
                {
                    // 继续播放
                }
                // stop(): void
                {
                    // 暂停播放
                }
            }
        }
        // dragonBones.Slot
        {
            // 属性
            {
                // childArmature
                {
                    // 此时显示的子骨架
                    // dragonBones.Armature
                }
            }
        }
    },

    playWalk() {
        this.walkState = this.dragonBones.playAnimation('walk', -1);
        console.log('walkState', this.walkState);
        console.log('animationName', this.dragonBones.animationName);
    },

    playWalkByAnimation() {
        let animation = this.dragonBones.armature().animation;
        this.walkState = animation.play('walk', -1);
    },

    stopWalkByAnimationState() {
        if (this.walkState) {
            let isPlaying = this.walkState.isPlaying;
            if (isPlaying) {
                console.log('is walking to stop');
                this.walkState.stop();
            } else {
                console.log('is stop to walk');
            }
        } else {
            this.playWalk();
        }
    },

    stopWalkByAnimation() {
        let animation = this.dragonBones.armature().animation;
        animation.stop('walk');
    },

    stopWalkByAnimationGotoFrame() {
        let animation = this.dragonBones.armature().animation;
        animation.gotoAndStopByFrame('walk', 0);
    },

    playWalkFadeInNone() {
        let armature = this.dragonBones.armature();
        armature.animation.fadeIn('walk', -1, -1, 0, 'walkGroup', dragonBones.AnimationFadeOutMode.None);
    },

    playWalkFadeInAll() {
        let armature = this.dragonBones.armature();
        armature.animation.fadeIn('walk', -1, -1, 0, 'walkGroup', dragonBones.AnimationFadeOutMode.All);
    }

});