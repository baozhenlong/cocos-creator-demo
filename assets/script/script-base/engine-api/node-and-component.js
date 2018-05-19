//访问已有变量里的值
//1---通过全局变量访问
window.name = 'hero';
console.log('window name = ' + window.name); //hero
//2---通过模块访问
//每个脚本都能用require(文件名---不含路径)来获取对方exports的对象
//如果exports的是一个构造函数，需先使用new操作符new出一个对象
var constant = require('constant');
console.log('constant gameName = ' + constant.gameName); //demo

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    //Cocos Creator为组件脚本提供了生命周期的回调函数；用户只要定义特定的回调函数，Creator就会在特定的时期自动执行相关脚本
    //生命周期回调函数---只有在把脚本挂到节点上才会执行
    //onLoad()---在组件首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下
    //在onLoad阶段，保证了可以获取到场景中的其它节点，以及节点关联的资源数据
    //onLoad先于start方法调用
    //通常会做一些初始化相关的操作
    onLoad() {
        //this---指代本组件
        console.log('this name = ' + this.name); //节点名<组件名>---nodeAndComponent<node-and-component>


        //获得当前节点及其组件
        //1---获得组件所在的节点
        console.log('node name = ' + this.node.name);
        //2---获得同一节点上指定类型的组件---node.getComponent(typeOrClassName)
        //参数typeOrClassName（Function | String）---构造函数或脚本的名称
        //调用者可以是这个节点或这个节点上的任一组件
        //传入构造函数
        var lb = this.node.getComponent(cc.Label);
        var lb2 = this.getComponent(cc.Label); //实际上调用的是node.getComponent()
        console.log('lb string = ' + lb.string);
        console.log('lb2 string = ' + lb2.string);
        //传入脚本名称
        var js = lb.getComponent('node-and-component');
        console.log('js name = ' + js.name); //nodeAndComponent<node-and-component>


        //获得其它节点及其组件
        //1---利用属性检查器设置节点
        //2---查找子节点
        //通过节点的children---[数组]
        var children = this.node.children;
        //通过getChildByName(name)---从chilren这个数组里查找
        //参数name（String）---节点名字
        var child = this.node.getChildByName('child');
        console.log('child name = ' + child.name); //child
        //3---全局查找
        //cc.find(path, referenceNode)
        //第一个参数path（String）---节点名字
        //第二个可选参数referenceNode（Node）---参考节点，在该节点下查找
        //第二个参数省略时，referenceNode = scene(当前场景，cc.director.getScene(),instanceof cc.Node == true)，将从场景根节点开始查找


        //常用节点和组件接口

        //1---节点状态和层级操作
        //1.1---激活/关闭节点
        //1.1.1---激活---如果该节点的所有父节点原先都已激活，此时执行下-this.node.active = true;-就意味着
        //意味着---在场景中重新激活该节点和所有子节点，除非子节点单独设置过关闭
        //意味着---该节点和所有子节点上的所有组件都会被启用，他们中update方法之后每帧会执行
        //意味着---这些组件上如果有onEnable方法，这些方法将被执行
        //1.1.2---关闭---如果该节点的任一父节点原先就关闭，此时执行-this.node.active = false;-就不会触发任何行为
        //关闭---如果该节点的所有父节点原先都已激活，此时执行-this.node.active = false;-就意味着
        //意味着---在场景中隐藏该节点和所有子节点
        //意味着---该节点和所有子节点上的所有组件都将被禁用，也就是不会再执行这些组件中的update中的代码
        //意味着---这些组件上如果有onDisable方法，这些方法将被执行
        //1.2---更改节点的父节点---假设父节点为parentNode，子节点为this.node
        //this.node.parent = parentNode;
        //this.node.removeFromParent(false); parentNode.addChild(this.node);
        //上述2种方法等价，removeFromParent()---默认会清空节点上绑定的事件和action等
        //1.3---索引节点的子节点---直接子节点
        //返回节点的所有子节点数组---this.node.children
        //返回节点的子节点数量---this.node.childrenCount

        //2---更改节点的变换（位置，旋转，缩放，尺寸）
        //2.1---更改节点位置
        //分别对x轴和y轴坐标赋值
        //this.node.x = 50; this.node.y = 100;
        //使用setPosition()
        //this.node.setPosition(50, 100);
        //2.2---更改节点旋转
        //this.node.setRotation(10);
        //2.3---更改节点缩放
        //this.node.scaleX = 2; this.node.sacleY = 3;
        //this.node.setScale(2); //会同时修改scaleX和scaleY
        //this.node.setScale(2, 3);
        //2.4---更改节点尺寸
        //this.node.width = 100; this.node.height = 200;
        //this.node.setContentSize(100, 200);
        //2.5---更改节点锚点位置
        //this.node.anchorX = 1; this.node.anchor = 0;
        //this.node.setAnchorPoint(1, 0);
        //2.6---颜色和不透明度
        //使用Sprite，Label这些基本的渲染组件时，修改颜色和不透明度的操作只能在节点的实例上进行
        //颜色---mySprite.node.color = cc.Color.RED;
        //不透明度---mySprite.node.opacity = 128;

        //3---常用组件接口
        //cc.Component是所有组件的基类，任何组件都包括如下的常用接口
        //在组件的脚本中，以this指代本组件
        //this.node---该组件所属的节点实例
        //this.enabled---是否每帧执行该组件的update方法，同时也用来控制渲染组件是否显示
        //onLoad()---在该组件所在节点进行初始化时执行（节点添加到节点树时）
        //start()---在该组件第一次update()之前执行，通常用于需要在所有组件的onLoad初始化完毕后执行的逻辑
        //update()---在该组件的enabled属性为true时，其中的代码会每帧执行


        //创建和销毁节点
        //1---创建新节点
        //通过new cc.Node()动态创建
        var newNode = new cc.Node();
        //2---克隆已有节点
        //cc.instantiate(original)---克隆指定的任意类型的对象，或者从Prefab实例化出新节点
        //参数original（Prefab | Node | Object）
        var cloneNode = cc.instantiate(newNode);
        //3---创建预制节点
        var itemPrefab = cc.instantiate(this.itemPrefab);
        //4---销毁节点
        //node.destroy()---并不会立刻移除被移除，而是在当前帧逻辑更新结束后，统一执行
        //当一个节点销毁后，该节点就处于无效状态，可以通过cc.isValid()判断当前节点是否已经被销毁
        //cc.isValid(value)---检查value是否不为null并且尚未销毁
        //this.node.destroy(); var mark = cc.isValid(this.node);
        //destroy---不但会激活组件上的onDestroy，还会降低内存泄露的几率，同时减轻内存泄露时的后果
        //如果一个节点不再使用，直接调用它的destroy，不需要removeFromParent，也不需要设置parent为null


        //脚本执行顺序
        //1---控制同一个节点上的组件脚本执行顺序
        //在同一个节点上的组件脚本执行顺序，可以通过组件在属性检查器里的排列顺序来控制，通过Move Up和Move Down菜单来调整
        //排列在上的组件脚本会先于排列在下的组件脚本执行
        //CompA.js---Up
        //CompB.js---Down
        // CompA onLoad!
        // CompB onLoad!
        // CompA start!
        // CompB start!
        // CompA update!
        // CompB update!
    },

    //start()---会在组件第一次执行update之前触发
    //通常用于初始化一些中间状态的数据，这些数据可能在update时会发生变化，并且被频繁地enable和disable
    start() {

    },

    //update()---当this.enabled = true时，每帧执行；在所有动画更新前执行
    update(dt) {

    },

    //lateUpdate()---在update执行之后才执行
    lateUpdate(dt) {

    },

    //onEnable()---当组件的enabled属性从false变为true时，或者所在节点的active属性从false变为true时，会激活onEable回调
    //如果节点第一次被创建且enabled为true，则会在onLoad之后，start之前被调用
    onEnable() {

    },

    //onDisable()---当组件的enabled属性从true变为false时，或者所在节点的active属性从true变为false时，会激活onDisable回调
    onDisable() {

    },

    //onDestroy()---当组件或者所在节点调用了destroy()，则会调用onDestroy()回调，并在当帧结束时统一回收组件
    onDestroy() {

    }
});