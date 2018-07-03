var PoolHandlerComp = require('pool-handler-comp');
cc.Class({
    extends: cc.Component,

    properties: {
        eg: cc.Prefab,
        parentNode: cc.Node
    },

    onLoad() {
        //在运行时进行节点的创建（cc.instantiate）和销毁（node.destroy）操作是非常耗费性能的
        //因此在比较复杂的场景中，通常只有在场景初始化逻辑（onLoad）中才会进行节点的创建，在切换场景时才会进行节点的销毁
        //当有大量节点需要反复创建和销毁时，需要使用对象池

        //---对象池：一组可回收的节点对象
        //cc.NodePool---用于管理节点对象的对象缓存池，适用于优化对象的反复创建和销毁
        //新的NodePool需要实例化之后才能使用，每种不同的节点（不同的Prefab）对象池需要一个不同的对象池实例

        //---使用对象池的一般工作流程
        //1---准备Prefab预制
        //2---初始化对象池
        //在场景加载的初始化脚本中，将需要数量的节点创建出来，并放进对象池
        //new cc.NodePool(poolHandlerComp)
        //使用构造函数创建一个节点专用的对象池，该脚本需挂载在预制上
        //参数poolHandlerComp（Function|String）---组件类型|名称，作为挂载在节点上用于处理节点回收和复用时的事件逻辑
        //---function body start
        // this.poolHandlerComp = poolHandlerComp;
        // this._pool = []
        //---function body send
        //2.1使用名称（String）作为poolHandlerComp---脚本名
        this.nodePool = new cc.NodePool('pool-handler-comp');
        //2.2使用构造函数（Function）作为poolHandlerComp---require出来的构造函数    
        // this.nodePool = new cc.NodePool(PoolHandlerComp);
        let initCount = 5; //初始节点数量可以根据游戏的需要来控制，即使对初始化节点数量的预估不准确也不要紧，后面会处理
        for (let i = 0; i < initCount; i++) {
            let node = cc.instantiate(this.eg);
            this.nodePool.put(node); //通过putInPool接口放入对象池
            //nodePool.put(obj)
            //向缓冲池中存入一个不再需要的节点对象
            //put函数会自动将目标节点从父节点上移除，但不会进行cleanup操作
            //put函数会调用poolHandlerComp的unuse函数，如果组件和函数都存在的话
            //参数obj（Node）
            //---function body start            
            // if (obj && this._pool.indexOf(obj) === -1) {
            //     // Remove from parent, but don't cleanup
            //     obj.removeFromParent(false);
            //     // Invoke pool handler
            //     var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;
            //     if (handler && handler.unuse) {
            //         handler.unuse();
            //     }
            //     this._pool.push(obj);
            // }
            //---function body end
        }
        //3---获取对象池中存储的对象
        // createNode
        //4---将对象返回对象池
        //releaseNode
        //5---使用组件来处理回收和复用的事件（事件的注册和反注册）
        //在使用构造函数创建对象池时，指定组件脚本
        //get时，调用组件脚本的的reuse方法---get还以传入任意数量类型的参数
        //put时，调用组件脚本的的unuse方法
        //6---清除对象池
        //clearNode
        //在切换场景或其它不需要对象池的时候手动调用来清空缓存节点
        this.createNode(this.parentNode);
    },

    createNode: function (parentNode) {
        //---nodepool.get(params)
        //获取对象池中的对象，如果对象池没有可以对象，则返回空
        //这个函数会调用poolHandlerComp的reuse函数，如果组件和函数都存在的话
        //可选参数params（Any）---可以传入任意数量类型的参数，这些参数会被原样原地给reuse方法
        //返回值（Node|null）
        //---function body start        
        // var last = this._pool.length-1;
        // if (last < 0) {
        //     return null;
        // }
        // else {
        //     // Pop the last object in pool
        //     var obj = this._pool[last];
        //     this._pool.length = last;
        //     // Invoke pool handler
        //     var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;
        //     if (handler && handler.reuse) {
        //         handler.reuse.apply(handler, arguments);
        //     }
        //     return obj;
        // }
        //---function body end        
        let node = this.nodePool.get('param1', ' param2');
        //如果没有空闲对象，即对象池中备用对象不够时，用cc.instantiate重新创建
        if (!node) {
            node = cc.instantiate(this.eg);
        }
        node.parent = parentNode; //将生成的节点加入节点树
    },

    onKillClicked: function () {
        var children = this.parentNode.children;
        if (children.length !== 0) {
            this.releaseNode(children[0]);
        }
    },

    releaseNode: function (node) {
        this.nodePool.put(node);
    },

    clearNode: function () {
        //---nodePool.clear()
        //销毁对象池中缓存的所有节点
        //---function body start
        // var count = this._pool.length;
        // for (var i = 0; i < count; ++i) {
        //     this._pool[i].destroy();
        // }
        // this._pool.length = 0;
        //---function body end                
        this.nodePool.clear();
    }

    // start () {

    // },

    // update (dt) {},
});