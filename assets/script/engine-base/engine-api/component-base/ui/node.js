cc.Class({
    extends: cc.Component,

    properties: {
        aNode: cc.Node,
        bNode: cc.Node,
        cNode: cc.Node
    },

    onLoad() {
        //---节点状态和层级操作
        //1---激活/关闭节点
        //激活---如果该节点的所有父节点原先都已激活，此时执行下-this.node.active = true;
        //激活意味着---在场景中重新激活该节点和所有子节点，除非子节点单独设置过关闭
        //激活意味着---该节点和所有子节点上的所有组件都会被启用，他们中update方法之后每帧会执行
        //激活意味着---这些组件上如果有onEnable方法，这些方法将被执行
        //---关闭---1---如果该节点的任一父节点原先就关闭，此时执行-this.node.active = false;-就不会触发任何行为
        //---关闭---2---如果该节点的所有父节点原先都已激活，此时执行-this.node.active = false;
        //关闭---2---意味着---在场景中隐藏该节点和所有子节点
        //关闭---2---意味着---该节点和所有子节点上的所有组件都将被禁用，也就是不会再执行这些组件中的update中的代码
        //关闭---2---意味着---这些组件上如果有onDisable方法，这些方法将被执行
        //2---更改节点的父节点---假设父节点为parentNode，子节点为this.node
        //this.node.parent = parentNode;
        //this.node.removeFromParent(false); parentNode.addChild(this.node);
        //上述2种方法等价，removeFromParent()---默认会清空节点上绑定的事件和action等
        //3---索引节点的子节点---直接子节点
        //返回节点的所有子节点数组---this.node.children
        //返回节点的子节点数量---this.node.childrenCount

        //---更改节点的变换（位置，旋转，缩放，尺寸）
        //1---更改节点位置
        //---分别对x轴和y轴坐标赋值
        //this.node.x = 50; this.node.y = 100;
        //---使用setPosition()
        //this.node.setPosition(50, 100);
        //2---更改节点旋转
        //this.node.setRotation(10);
        //3---更改节点缩放
        //this.node.scaleX = 2; this.node.sacleY = 3;
        //this.node.setScale(2); //会同时修改scaleX和scaleY
        //this.node.setScale(2, 3);
        //4---更改节点尺寸
        //this.node.width = 100; this.node.height = 200;
        //this.node.setContentSize(100, 200);
        //5---更改节点锚点位置
        //this.node.anchorX = 1; this.node.anchor = 0;
        //this.node.setAnchorPoint(1, 0);

        //---颜色和不透明度
        //使用Sprite，Label这些基本的渲染组件时，修改颜色和不透明度的操作只能在节点的实例上进行
        //颜色---mySprite.node.color = cc.Color.RED;
        //不透明度---mySprite.node.opacity = 128;

        //---创建和销毁节点
        //1---创建新节点
        //通过new cc.Node()动态创建
        var newNode = new cc.Node();
        //2---克隆已有节点
        //cc.instantiate(original)---克隆指定的任意类型的对象，或者从Prefab实例化出新节点
        //参数original（Prefab | Node | Object）
        var cloneNode = cc.instantiate(newNode);
        //3---创建预制节点
        // var itemPrefab = cc.instantiate(this.itemPrefab);
        //4---销毁节点
        //node.destroy()---并不会立刻移除被移除，而是在当前帧逻辑更新结束后，统一执行
        //当一个节点销毁后，该节点就处于无效状态，可以通过cc.isValid()判断当前节点是否已经被销毁
        //cc.isValid(value)---检查value是否不为null并且尚未销毁
        //this.node.destroy(); var mark = cc.isValid(this.node);
        //destroy---不但会激活组件上的onDestroy，还会降低内存泄露的几率，同时减轻内存泄露时的后果
        //如果一个节点不再使用，直接调用它的destroy，不需要removeFromParent，也不需要设置parent为null

        //---节点同级索引
        //1---node.getSiblingIndex()---获取节点同级索引
        //返回值（Number）
        console.log('a index = ' + this.aNode.getSiblingIndex()); //0
        console.log('b index = ' + this.bNode.getSiblingIndex()); //1
        console.log('c index = ' + this.cNode.getSiblingIndex()); //2
        //2---node.setSiblingIndex(index)---设置节点同级索引
        //参数index（Number）
        this.aNode.setSiblingIndex(2);
        console.log('a index = ' + this.aNode.getSiblingIndex()); //2
        console.log('b index = ' + this.bNode.getSiblingIndex()); //0
        console.log('c index = ' + this.cNode.getSiblingIndex()); //1

        //---获取子节点的组件
        //1---node.getComponentInChildren(typeOrClassName)
        //递归查找所有子节点中第一个匹配指定类型的组件
        //参数typeOrClassName（Function | String）
        //返回值（Component）
        console.log(this.node.getComponentInChildren(cc.Label).string); //b
        //2---node.getComponentsInChildren(typeOrClassName)
        //递归查找自身或所有子节点中指定类型的组件
        //参数typeOrClassName（Function | String）
        //返回值（[Component]）
        var componentList = this.node.getComponentsInChildren(cc.Label);
        for (var value of componentList) {
            console.log(value.string); //node, b, c, a
        }

    },

    // start () {

    // },

    // update (dt) {},
});