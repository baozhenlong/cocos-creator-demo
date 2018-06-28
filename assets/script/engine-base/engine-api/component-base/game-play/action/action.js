cc.Class({
    extends: cc.Component,

    properties: {
        actionNode: cc.Node,
        followNode: cc.Node
    },

    onLoad() {
        //---Action类---所有动作类型的基类
        //1---cc.follow(followedNode, rect)
        //追踪目标节点的位置
        //Canvas下节点不动，根节点位置随followedNode变动
        //参数followedNode（Node）
        //可选参数rect（Rect）---rect = rect : cc.rect(0, 0, 0, 0)
        //返回值---Action|Null
        var followAction = cc.follow(this.followNode);
        this.node.runAction(followAction);

        //---FiniteTimeAction类型
        //有限时间动作，拥有时长duration属性；继承于Action

        //---节点动作函数
        //1---runAction(action)
        //执行并返回该执行的动作，该节点将会变成动作的目标；调用时，节点自身处于不激活状态将不会有任何效果
        //参数action（Action）
        // this.node.runAction(action);
        //2---stopAllActions()
        //停止并且移除所有正在运行的动作列表
        // this.node.stopAllActions();

    },

    onToRightClicked: function () {
        this.followNode.x += 100;
    }

    // start () {

    // },

    // update (dt) {},
});