cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---声明---使用function关键字来声明，后跟一组参数以及函数体
        function functionName(arg0, arg1) {
            console.log('execute function');
        }

        //---调用---函数名(参数)
        var back = functionName(); //execute function

        //---返回值---使用return;，没有则返回undefined
        console.log('return = ' + back); //undefined

        //---参数
        //ECMAScript中没有函数签名的概念，因为其函数参数是以一个包含0个或多个值数组形式传递的，所以没有重载，后定义的函数会覆盖先定义的函数
        //所有参数传递的都是值，不可能通过引用传递参数
        //在函数体内可以通过arguments对象来访问参数
        //arguments对象---是一个对应于传递给函数的参数的类数组对象；只有length和索引属性
        //描述---是所有（非箭头）函数中都可用的局部变量
        //arguments里的值与对应命名参数的值保持同步，但它们的内存空间是独立的
        //没有传递值的命名参数将自动被赋予undefined值
        function testArguments(a, b) {
            console.log('arguments = ' + JSON.stringify(arguments));
            console.log('arguments[0] = ' + arguments[0]);
            console.log('arguments["1"] = ' + arguments['1']);
            console.log('arguments[2] = ' + arguments[2]);
        }
        testArguments(1, 2);
        //arguments = {"0":1,"1":2,"2":3}
        //arguments[0] = 1
        //arguments["1"] = 2
        //arguments[0] = undefined        

        //---apply()和call()
        //this---一般来说，总是指向调用某个方法的对象
        //使用apply()和call()方法，可以改变this的指向
        //作用---在特定的作用域中调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域
        //1---Function.apply(this, args|arguments)
        //参数Function（函数指针）
        //参数this（Object）---函数运行的作用域，代替Function类里的this的对象
        //参数args（Array）|arguments（Object）---参数数组|arguments对象，作为参数传递给Function
        this.testApply();
        //param1 = undefined
        //param2 = undefined
        //print arguments = {}
        this.testApply(undefined);
        //param1 = undefined
        //param2 = undefined        
        //print arguments = {}
        this.testApply(null);
        //param1 = null
        //param2 = undefined        
        //print arguments = {"0":null}
        this.testApply(1, 2);
        //param1 = 1
        //param2 = 2       
        //print arguments = {"0":1,"1":2}
        this.testApply([1, 2, 3], 4);
        //param1 = [1,2,3]
        //param2 = 4        
        //print arguments = {"0":[1,2,3],"1":4}
        //2---Function.call(this, param...)
        //参数Function（函数指针）
        //参数this（Object）---函数运行的作用域，代替Function类里的this的对象
        //参数param...（参数列表）---参数列表，如param1,param2,param3...,作为参数传递给Function
    },

    testApply: function (param1, param2) {
        console.log('param1 = ' + JSON.stringify(param1));
        console.log('param2 = ' + JSON.stringify(param2));
        // this.printArguments.apply(this, [param1, param2]);
        //等价
        this.printArguments.apply(this, arguments);
    },

    printArguments: function () {
        console.log('print arguments = ' + JSON.stringify(arguments));
    }

    // start () {

    // },

    // update (dt) {},
});