//脚本加载顺序
//1---Cocos2d引擎
//2---插件脚本（有多个的话按项目中的路径字母顺序一次加载）
//3---普通脚本（打包后只有一个文件，内部按require的依赖顺序依次初始化）

//每一个单独的脚本文件就构成一个模块
//每个模块都是一个单独的作用域
//以同步的require方法来引用其它模块
//设置module.exports为导出的变量

//1---require（name）---引用模块
//参数name（String）---模块的文件名，不包含路径，不包含后缀，大小写敏感
//返回值---require返回被模块导出的对象
//游戏开始时会自动require所有脚本，这时每个模块内部定义的代码就会被执行一次，之后无论又被require几次，返回的始终是同一份实例
var DefineComponent = require('define-component');
var DefineJavascript = require('define-javascript');
var DefineComponentAndJavascript = require('define-component-and-javascript');
var Exports = require('exports');
var EncapsulationPrivateVariable = require('encapsulation-private-variable');
//2---定义模块
//2.1---定义组件
//当在脚本中声明了一个组件，Creator会默认把它导出，其它脚本直接直接require这个模块就能使用这个组件
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //访问组件模块---DefineComponent本身是一个构造函数
        console.log('typeof DefineComponent = ' + typeof DefineComponent); //function        
        var defineComponent = new DefineComponent();
        console.log('DefineComponent introduce = ' + defineComponent.introduce); //defineCompent
        //访问普通JavaScript模块
        console.log('DefineJavascript introduce = ' + DefineJavascript.introduce); //defineJavascript
        console.log('Exports introduce = ' + Exports.introduce); //exports
        Exports.funcA(); //funcA
        console.log('DefineComponentAndJavascript javascript introduce = ' + DefineComponentAndJavascript.javascript.introduce); //javascript
        var component = new DefineComponentAndJavascript.component();
        console.log('DefineComponentAndJavascript component introduce = ' + component.introduce); //component
        console.log('EncapsulationPrivateVariable data = ' + EncapsulationPrivateVariable.data); //undefined   
        EncapsulationPrivateVariable.setData('msg');
        console.log('EncapsulationPrivateVariable getData() = ' + EncapsulationPrivateVariable.getData()); //msg   
    },

    // start () {

    // },

    // update (dt) {},
});
//2.2---定义普通JavaScript模块
// var config = {
//     name: 'config'
// };
// module.exports = config;
//module.expors默认是一个空对象（{}），可以直接往里面增加新的字段
//等价于
// module.exports.config = {
//     name: 'config'
// };
//module.exports的默认值---当module.exports没有任何定义时，Creator会自动优先将exports设置为脚本中定义的Component