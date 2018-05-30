cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //arguments对象---是一个对应于传递给函数的参数的类数组对象；只有length和索引属性
        //描述---是所有（非箭头）函数中都可用的局部变量
        this.testArguments(1, 2, 3);
        //arguments = {"0":1,"1":2,"2":3}
        //arguments[0] = 1
        //arguments["0"] = 1

        //2---apply()和call()
        //this---一般来说，总是指向调用某个方法的对象
        //使用apply()和call()方法，可以改变this的指向
        //作用---在特定的作用域中调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域
        //2.1---Function.apply(this, args|arguments)
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

        //2.2---Function.call(this, param...)
        //参数Function（函数指针）
        //参数this（Object）---函数运行的作用域，代替Function类里的this的对象
        //参数param...（参数列表）---参数列表，如param1,param2,param3...,作为参数传递给Function
    },

    testArguments: function (a, b, c) {
        console.log('arguments = ' + JSON.stringify(arguments));
        console.log('arguments[0] = ' + arguments[0]);
        console.log('arguments["0"] = ' + arguments['0']);
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