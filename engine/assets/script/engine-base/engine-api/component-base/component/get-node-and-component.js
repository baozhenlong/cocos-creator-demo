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
        console.log('this name = ' + this.name); //节点名<组件名>---getNodeAndComponent<get-node-and-component>

        //1---获得当前节点及其组件
        //1.1---获得组件所在的节点
        console.log('node name = ' + this.node.name); //getNodeAndComponent
        //1.2---获得同一节点上指定类型的组件---node.getComponent(typeOrClassName)
        //参数typeOrClassName（Function | String）---构造函数或脚本的名称
        //匹配构造函数，返回相应的组件
        //1.2.1---传入构造函数
        var lb = this.node.getComponent(cc.Label);
        var lb2 = this.getComponent(cc.Label); //实际上调用的是node.getComponent()
        console.log('lb string = ' + lb.string); //string
        console.log('lb2 string = ' + lb2.string); //string
        //1.2.2---传入脚本名称（类名），区分大小写
        var js = this.node.getComponent('get-node-and-component');
        console.log('js name = ' + js.name); //getNodeAndComponent<get-node-and-component>

        //2--获得其它节点及其组件
        //2.1---利用属性检查器设置节点
        //2.2---查找子节点
        //2.2.1---通过节点的children---[数组]
        var children = this.node.children;
        //2.2.2---通过getChildByName(name)---从chilren这个数组里查找
        //参数name（String）---节点名字
        var child = this.node.getChildByName('child');
        console.log('child name = ' + child.name); //child
        //2.3---全局查找
        //cc.find(path, referenceNode = cc.director.getScene())---按层次结构路径查找节点
        //参数path（String）---路径；通过使用'/'字符分割路径来遍历层次结构
        //可选参数referenceNode（Node）---参考节点，在该节点下查找；默认为当前场景，将从场景根节点开始查找，instanceof cc.Node == true
        //返回值---Node|null
        //---start
        // var match = referenceNode;
        // var startIndex = (path[0] !== '/') ? 0 : 1; // skip first '/'
        // var nameList = path.split('/');
        //parse path
        // for (var n = startIndex; n < nameList.length; n++) {
        //     var name = nameList[n];
        //     var children = match._children;
        //     match = null;
        //     for (var t = 0, len = children.length; t < len; ++t) {
        //         var subChild = children[t];
        //         //判断子节点中是否有节点的名字 匹配 当前层次路径
        //         if (subChild.name === name) {
        //             //将匹配的节点赋值给math；从math的子节点开始 匹配 下个层次路径
        //             match = subChild;
        //             break;
        //         }
        //     }
        //     if (!match) {
        //         return null;
        //     }
        // }
        // return match;
        //---end

        //3---常用组件接口
        //cc.Component是所有组件的基类，任何组件都包括如下的常用接口
        //在组件的脚本中，以this指代本组件
        //this.node---该组件所属的节点实例
        //this.enabled---是否每帧执行该组件的update方法，同时也用来控制渲染组件是否显示
        //onLoad()---在该组件所在节点进行初始化时执行（节点添加到节点树时）
        //start()---在该组件第一次update()之前执行，通常用于需要在所有组件的onLoad初始化完毕后执行的逻辑
        //update()---在该组件的enabled属性为true时，其中的代码会每帧执行
        //...
        //生命周期回调函数的执行顺序---onLoad→（onEnable→）start→update→lateUpdate

        //4---脚本执行顺序
        //4.1---控制同一个节点上的组件脚本执行顺序
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

    //onEnable()---当组件的enabled属性从false变为true时，或者所在节点的active属性从false变为true时，会激活onEable回调
    //如果节点第一次被创建且enabled为true，则会在onLoad之后，start之前被调用
    onEnable() {},

    //start()---会在组件第一次执行update之前触发
    //通常用于初始化一些中间状态的数据，这些数据可能在update时会发生变化，并且被频繁地enable和disable
    start() {},

    //update()---当this.enabled = true时，每帧执行；在所有动画更新前执行
    //参数dt---两帧之间的时间间隔---0.016~0.017s
    update(dt) {},

    //lateUpdate()---在update执行之后才执行
    lateUpdate(dt) {},

    //onDisable()---当组件的enabled属性从true变为false时，或者所在节点的active属性从true变为false时，会激活onDisable回调
    onDisable() {},

    //onDestroy()---当组件或者所在节点调用了destroy()，则会调用onDestroy()回调，并在当帧结束时统一回收组件
    onDestroy() {}
});