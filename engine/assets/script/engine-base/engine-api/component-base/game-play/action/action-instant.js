cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---ActionInstant类型
        //即时动作，立即会执行；继承于FiniteTimeAction

        //---cc.callFunc(selector, selectorTarget = null, data = null)
        //执行回调函数
        //参数selector（Function）---回调函数---function(target, data){}
        //回调函数参数target（Object）---事件目标
        //回调函数参数data（Any）---参数中的data
        //参数selectorTarget（Object）---绑定回调函数的this
        //参数data（Any）---回调函数的参数
        //返回值（ActionInstant）
        var finish1 = cc.callFunc(function (target, data) {
            console.log('callFunc typeof target  = ' + (typeof target)); //Object
            console.log('callFunc target = ' + (target instanceof cc.Node)); //true
            console.log('callFunc target.name = ' + target.name); //cocos
            console.log('this.actionNode.name = ' + this.actionNode.name); //cocos---节点名字
            console.log('callFunc has data = ' + data); //callFunc
        }, this, 'callFunc');
        var finish2 = cc.callFunc(function (target, data) {
            console.log('callFunc no data no this');
            console.log('callFunc this = ' + this); //null                        
            console.log('callFunc data = ' + data); //null            
        });
        var finish3 = cc.callFunc(this.callFuncCallback, this, 'callFuncCallback'); //cocos, callFuncCallback     

        //---cc.hide()
        //立即隐藏
        //返回值（ActionInstant）

        //---cc.show()
        //立即显示
        //返回值（ActionInstant）

        //---cc.removeSelf(isNeedCleanup)
        //从父节点移除自身
        //参数isNeedCleanup（Boolean）
    },

    callFuncCallback: function (target, data) {
        console.log('target.name = ' + target.name);
        console.log('callFuncCallback data = ' + data);
    },

    // start() {},

    // update (dt) {}
});