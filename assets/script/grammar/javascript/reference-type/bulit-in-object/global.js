cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---在所有代码执行之前，作用域中就已经存在2个内置对象：Global和Math

        //---Global对象---全局对象
        //所有在全局作用域中定义的属性和函数，都是Global对象的属性

        //---window对象
        //JavaScript没有指出如何直接访问Global对象
        //但是web浏览器都是将它作为window对象的一部分加以实现的
        //因此，在全局作用域中声明的所有变量和函数，都称为window对象的属性

        //---URI编码方法

        //---eval()

        //---Global对象的属性
        //1---undefined---特殊值 undefined
        //2---Object---构造函数 Object
        //3---Function---构造函数 Function
        //4---Boolean---构造函数 Boolean
        //5---String---构造函数 String
        //6---Number---构造函数 Number
        //7---Date---构造函数 Date

    },

    // start() {},

    // update (dt) {}
});