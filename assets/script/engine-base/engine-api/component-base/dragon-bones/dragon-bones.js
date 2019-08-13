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
        dragonBone: dragonBones.ArmatureDisplay
    },

    onLoad() {
        this.printComponentProperties();
        this.printApi();
    },

    // 组件
    // dragonBones.ArmatureDisplay

    // 组件属性
    printComponentProperties() {
        // dragonAsset
        {
            // 骨骼数据
            console.log('骨骼数据', typeof this.dragonBone.dragonAsset); // object
        }
        // dragonAtlasAsset 
        {
            // 图集数据
            console.log('图集数据', typeof this.dragonBone.dragonAtlasAsset); // object
        }
        // armatureName
        {
            // 当前的 Armature 名称 --- String
            console.log('armatureName', this.dragonBone.armatureName); // mecha_1502b
        }
        // animationName
        {
            // 当前播放的动画名称 --- String
            // 默认为 ''
            console.log('animationName', this.dragonBone.animationName === ''); // true
        }
        // timeScale
        {
            // 当前播放的动画名称 --- Number
            // 默认为 1
            console.log('timeScale', this.dragonBone.timeScale);
        }
        // playTimes
        {
            // 播放默认动画的循环次数 --- Number
            // -1 ：表示使用配置文件中的默认值
            // 0 ：表示无限循环
            // >0 ：表示循环次数
            // 默认为 -1
            console.log('playTimes', this.dragonBone.playTimes);
        }
    },

    // 组件方法

    getArmature() {
        // comp.armature()
        // 获取 ArmatureDisplay 当前使用的 Armature 对象
        // 返回值 dragonBones.Armature 骨架，是骨骼动画系统的核心，由显示容器、骨骼、插槽、动画、事件系统构成
        this.currentArmature = this.dragonBone.armature();
        console.log('armature', this.currentArmature);
        // Armature 对象
        {
            // 属性
            {
                // animation (dragonBones.Animation)
                {
                    // 获得动画控制器
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

    // playAnimation(animName, playTimes = -1)
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
        this.walkState = this.dragonBone.playAnimation('walk', -1);
        console.log('walkState', this.walkState);
    },

    stopWalk() {
        if (this.walkState) {
            let isPlaying = this.walkState.isPlaying;
            if (isPlaying) {
                console.log('is walking to stop');
                this.walkState.stop();
            } else {
                console.log('is stop to walk');
                this.walkState.play();
            }
        } else {
            this.playWalk();
        }
    },

    playWalkFadeInNone() {
        let armature = this.dragonBone.armature();
        armature.animation.fadeIn('walk', -1, -1, 0, 'walkGroup', dragonBones.AnimationFadeOutMode.None);
    },

    playWalkFadeInAll() {
        let armature = this.dragonBone.armature();
        armature.animation.fadeIn('walk', -1, -1, 0, 'walkGroup', dragonBones.AnimationFadeOutMode.All);
    }

});