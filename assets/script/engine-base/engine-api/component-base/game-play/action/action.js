cc.Class({
    extends: cc.Component,

    properties: {
        rootNode: cc.Node,
        followedNode: cc.Node,
        actionNode: cc.Node,
        particleNode: cc.Node
    },

    onLoad() {
        // --- Action 类---所有动作类型的基类
        // 1 --- cc.follow(followedNode, rect)
        // 追踪目标节点的位置
        // Canvas 下节点不动，根节点位置随 followedNode 变动
        // 参数 followedNode (Node)
        // 可选参数 rect (Rect) --- 边界，默认 cc.rect(0, 0, 0, 0) 待补充
        // 返回值--- Action | Null
        let winSize = cc.winSize;
        console.log('winSize', winSize);
        var followAction = cc.follow(this.followedNode);
        this.rootNode.runAction(followAction);

        // --- FiniteTimeAction 类型
        //有限时间动作，拥有时长 duration 属性；继承于 Action

        // --- 节点动作函数
        // 1--- runAction(action)
        // 执行并返回该执行的动作，该节点将会变成动作的目标；调用时，节点自身处于不激活状态将不会有任何效果
        // 参数 action (Action)
        // this.node.runAction(action);
        // 2 --- stopAllActions()
        // 停止并且移除所有正在运行的动作列表
        // this.node.stopAllActions();
    },

    onToRightClicked: function () {
        this.followedNode.x += 100;
    },

    // Action.TAG_INVALID = -1
    // 默认动作标签

    // Action.setTag(tag)
    // 设置标签，用于识别动作
    // 参数 tag (Number) --- 标签

    // Action.getTag()
    // 获取用于识别动作的标签
    // 返回值 tag (Number) --- 标签

    // Action.isDone()
    // 如果动作已完成就返回 true
    // 返回值 (Boolean)

    // Node.getActionByTag(tag)
    // 参数 tag (Number) --- 标签
    // 返回值 action (Action) --- 动作；当 tag 为 -1 时，返回 null
    // notice: 只能获得 runAction 下 的 action ，无法获得诸如嵌套在 sequence 中的 action

    createAction() {
        this.actionNode.stopAllActions();
        let currentPos = this.actionNode.getPosition();
        let movePos = {
            x: 0,
            y: currentPos.y
        };
        if (currentPos.x < 0) {
            movePos.x = 300;
        } else {
            movePos.x = -300;
        }
        let moveToAction = cc.moveTo(2, movePos.x, movePos.y);
        let scaleUpAction = cc.scaleTo(1, 2);
        let scaleDownAction = cc.scaleTo(1, 1);
        let action = cc.sequence(
            moveToAction,
            scaleUpAction,
            scaleDownAction
        );
        action.setTag(0);
        // console.log('moveToAction', moveToAction);
        // console.log('action', action._actions);
        // action._actions.forEach((x) => {
        //     if (x._actions) {
        //         x._actions.forEach((y) => {
        //             console.log('y', y);
        //         })
        //     } else {
        //         console.log('x', x);
        //     }
        // });
        // 可通过 _actions 获取子动作
        this.actionNode.runAction(action);
    },

    getAction() {
        let action = this.actionNode.getActionByTag(0);
        if (action) {
            if (action.isDone()) {
                console.log('isDone');
            } else {
                console.log('action', action);
            }
        }
        let inexistentAction = this.actionNode.getActionByTag(1);
        console.log('inexistentAction', inexistentAction); // null
    },

    testActiveAndPos() {
        // cc.log('false 前粒子位置', this.particleNode.getPosition());
        // this.particleNode.getComponent(cc.ParticleSystem).resetSystem();

        // 改变粒子位置，上次发射出去还存在的粒子会影响视觉效果

        // this.particleNode.active = false;
        let x = Math.random() * 400;
        let y = Math.random() * 400;
        this.particleNode.setPosition(x, y);
        // cc.log('false 后粒子位置', this.particleNode.getPosition());
        // this.scheduleOnce(() => {
        //     // this.particleNode.active = true;
        // }, 1);
    },

    // update() {
    //     cc.log('粒子位置', this.particleNode.getPosition());
    // }
});