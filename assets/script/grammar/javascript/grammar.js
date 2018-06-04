cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //区分大小写

        //标志符
        //1---概念---变量、属性、函数、函数参数的名字
        //2---形式---按照下列格式规则组合起来的一个或多个字符：字母、下划线（_）、（美元符号$）、数字（数字不能是第一个字符）
        //3---规范---采用驼峰大小写格式：第一个字母小写，剩下的每个单词的首字母大写，如：myCar
        //4---限制---不能把关键字、保留字、true、false、null用作标志符
        //关键字和保留字---用于表示控制语句的开始或结束，或用于执行特定操作等

        //注释
        //1---单行注释
        //2---多行注释（块级注释）
        /*
         *
         */

        //语句---以分号结尾；如果省略分号，则由解析器确定语句的结尾

        //变量---仅仅是一个用于保存值的占位符
        //1---松散类型---可以用来保存任何值；未经过初始化的变量，保存一个特殊值：undefined
        //2---形式
        //2.1---定义单个变量
        var oneVariable; //undefined
        //2.2---定义多个变量
        var a = 'a',
            b = 'b',
            c = 'c';

        //typeof---操作符（不是一个函数），检测给定变量的数据类型
        //返回值---对一个值使用typeof操作符可能返回下列某个字符串
        //1---'undefined'---未定义
        //2---'boolean'---布尔值
        //3---'string'---字符串
        //4---'number'---数值
        //5---'object'---对象或null；特殊值null：表示一个空的对象引用
        //6---'function'---函数
        //形式
        var hi = 'hi';
        console.log(typeof hi); //string
        console.log(typeof (hi)); //string---圆括号不是必需的

        var {
            name,
            age
        } = {
            name: 'name'
        };
        console.log('name = ' + name); //name
        console.log('age = ' + age); //undefined
        var [param1, param2] = [1];
        console.log('param1 = ' + param1); //1
        console.log('param2 = ' + param2); //undefined
        var [param3, param4] = [3, 4, 5];
        console.log('param3 = ' + param3); //3
        console.log('param4 = ' + param4); //4
    },

    // start () {

    // },

    // update (dt) {},
});