// 缓动系统
// cc.tween 能够对对象的任意属性进行缓动
cc.Class({
    extends: cc.Component,
    properties: {

    },

    // 链式 API
    // cc.tween 的每一个 API 都会在内部生成一个 action ，并将这个 action 添加到内部队列中
    // 在 API 调用完后再返回自身实例，这样就可以通过链式调用的方式来组织代码
    // cc.tween 在调用 start 时会将之前生成的 action 队列重新组合成一个 cc.sequence 队列
    // 所以 cc.tween 的链式结构是依次执行每一个 API 的，也就是会执行完一个 API 再执行下一个 API

    // start() ：运行当前 tween
    // stop() ：停止当前 tween
    // then() ：插入一个 tween 到队列中
    // sequence() ：添加一个队列 action
    // parallel() ：添加一个并行 action
    // call(()=>{}) ：回调
    // delay(1) ：延迟执行
    // repeat(10) ：对前一个动画重复执行 10 次
    // repeat(10, tween)
    // repeatForever() ：添加一个永久重复 action ，这个 action 会将前一个动作作为他的参数

    testNode() {
        cc.tween(this.node)
            .stop()
            // 0s 时， node scale 还是 1
            .to(1, {
                scale: 2
            })
            // 1s 时，执行完第一个 action ， scale 为 2
            .to(1, {
                scale: 3
            })
            // 2s 时，执行完第二个 action ， scale 为 3
            .call(() => {
                console.log('node.scale', this.node.scale);
            })
            .start();
        // 调用 start 开始执行 cc.tween
    },

    // 设置缓动属性
    // to ：对属性进行绝对值计算，最终的运行结果即是设置的属性值
    // by ：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时的属性值

    // 支持缓动任意对象的任意属性
    testObj() {
        let obj = {
            a: 0
        };
        cc.tween(obj)
            .stop()
            .to(1, {
                a: Math.floor(Math.random() * 100)
            })
            .call(() => {
                console.log('obj', obj);
            })
            .start();
    },

    // 同时执行多个属性
    testNodeMulti() {
        this.node.setPosition(0, 0);
        cc.tween(this.node)
            .stop()
            .to(1, {
                scale: 2,
                position: cc.v2(100, 100),
                angle: 90
            })
            .to(1, {
                angle: 0
            })
            .start();
    },

    // easing
    testEasing() {
        // 传入 easing 名字，直接使用内置 easing 函数
        cc.tween(this.node)
            .to(1, {
                scale: 2
            }, {
                easing: 'sineOutIn'
            });

        // 只对单个属性使用 easing 函数
        // value 必须与 easing 或 progress 函数配合使用
        cc.tween(this.node)
            .to(1, {
                scale: 3,
                position: {
                    value: cc.v2(100, 100),
                    easing: 'sineOuyIn'
                }
            });
    },

    // 插入其他的缓动到队列
    testInsert() {
        // 事先创建一些固定的缓动，然后通过这些缓动形成新的缓动来减少代码的编写
        this.node.setPosition(0, 0);
        let scale = cc.tween().to(1, {
            scale: 2
        });
        let rotate = cc.tween().to(1, {
            angle: 90
        });
        let move = cc.tween().to(1, {
            position: cc.v2(100, 100)
        });
        // 先缩放，再旋转，再移动
        cc.tween(this.node).stop().then(scale).then(rotate).then(move);
    },

    // 并行执行缓动
    testParallel() {
        this.node.setPosition(0, 0);
        this.node.scale = 1;
        cc.tween(this.node)
            .stop()
            .parallel(
                cc.tween().to(1, {
                    scale: 2
                }),
                cc.tween().to(2, {
                    position: cc.v2(100, 100)
                })
            )
            .call(() => {
                console.log('All tweens finished');
            })
            .start();
    },

    testRunAction() {
        this.node.stopAllActions();
        this.node.runAction(
            cc.sequence(
                cc.delayTime(2),
                cc.callFunc(() => {
                    console.log('run');
                })
            )
        );
    },

    testTween() {
        cc.tween(this.node)
            .stop()
            .delay(2)
            .call(() => {
                console.log('tween');
            })
            .start();
    }
});