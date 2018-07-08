cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---简介
        //每个函数都是Function类型的实例；与其它引用类型一样，具有属性和方法
        //函数是对象，函数名是一个指向函数对象的指针，

        //---定义函数的2种方式
        //1---使用函数声明语法定义（需要名字）---使用function关键字来声明，后跟一组参数以及函数体
        //重要特征---函数声明提升：在执行代码之前会先读取函数声明；这意味着可以把函数声明放在调用它的语句后面
        function functionName(arg0, arg1) {
            console.log('execute function');
        }
        //2---使用函数表达式定义（名字可选）---创建没有名字的函数叫做匿名函数，也叫拉姆达函数
        var anonymityFunc = function () {};
        //定义一个匿名函数，并立即执行该匿名函数
        (function () {
            console.log('execute');
        })(); //()---必需；将函数声明转换成函数表达式
        var num = (function (num) {
            return num;
        })(1); //()---可选
        console.log('num = ' + num); //1

        //---函数名---仅仅是指向函数的指针
        function print() {
            console.log('print');
        }
        print(); //print
        var anotherPrint = print;
        anotherPrint(); //print
        print = null;
        //报错---此时print不再是函数---print();
        anotherPrint(); //print

        //---没有重载---声明同名函数，后面的函数会覆盖前面的函数

        //---调用---使用圆括号()
        var back = functionName(); //execute function

        //---返回值---使用return;，没有则返回undefined
        console.log('return = ' + back); //undefined

        //---函数内部属性
        console.log('\n------函数内部属性');
        //ECMAScript中没有函数签名的概念，因为其函数参数是以一个包含0个或多个值数组形式传递的，所以没有重载，后定义的函数会覆盖先定义的函数
        //所有参数传递的都是值，不可能通过引用传递参数
        //在函数体内可以通过arguments对象来访问参数
        //1---arguments对象---是一个对应于传递给函数的参数的类数组对象；只有length和索引属性
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
        //arguments = {"0":1,"1":2}
        //arguments[0] = 1
        //arguments["1"] = 2
        //arguments[0] = undefined     

        console.log('\n------函数属性和方法');
        //---函数属性和方法
        //1---属性
        //1.1---length---表示函数希望接收的命名参数的个数
        //0个命名参数
        function test0() {}
        console.log(test0.length); //0
        //2个命名参数
        function test2(a, b) {}
        console.log(test2.length); //2
        //1.2---prototype---原型属性：保存所有实例方法的所在
        //2---方法（非继承而来）apply()和call()
        //this---一般来说，总是指向调用某个方法的对象
        //使用apply()和call()方法，可以改变this的指向
        //作用---在特定的作用域中调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域
        //2.1---Function.apply(this, args|arguments)
        //参数Function（函数指针）
        //参数this（Object）---函数运行的作用域，代替Function类里的this的对象
        //参数args（Array）|arguments（Object）---参数数组|arguments对象，作为参数传递给Function
        function testApply(param1, param2) {
            console.log('param1 = ' + JSON.stringify(param1));
            console.log('param2 = ' + JSON.stringify(param2));
            // printArguments.apply(this, [param1, param2]);
            //等价
            printArguments.apply(this, arguments);
        }
        //输出arguments对象
        function printArguments() {
            console.log('print arguments = ' + JSON.stringify(arguments));
        }
        testApply();
        //param1 = undefined
        //param2 = undefined
        //print arguments = {}
        testApply(undefined);
        //param1 = undefined
        //param2 = undefined        
        //print arguments = {}
        testApply(null);
        //param1 = null
        //param2 = undefined        
        //print arguments = {"0":null}
        testApply(1, 2);
        //param1 = 1
        //param2 = 2       
        //print arguments = {"0":1,"1":2}
        testApply([1, 2, 3], 4);
        //param1 = [1,2,3]
        //param2 = 4        
        //print arguments = {"0":[1,2,3],"1":4}
        //2.2---Function.call(this, param...)
        //参数Function（函数指针）
        //参数this（Object）---函数运行的作用域，代替Function类里的this的对象
        //参数param...（参数列表）---参数列表，如param1,param2,param3...,作为参数传递给Function
        //2.3---Function.bind()

        console.log('\n------使用函数实现递归');
        //---使用函数实现递归
        //递归函数---一个函数通过名字调用自身
        function factorial(num) {
            if (num < 1) {
                return 1;
            } else {
                return num * factorial(num - 1);
            }
        }
        console.log('3! = ' + factorial(3)); //6
        var anotherFactorial = factorial;
        factorial = null; //此时factorial已经不是一个函数了
        //报错---console.log(anotherFactorial(3));//return里的factorial()不再是函数了
        //解决方式---使用命名函数表达式
        var factorial = function f(num) {
            if (num < 1) {
                return 1;
            } else {
                return num * f(num - 1);
            }
        };
        var anotherFactorial = factorial;
        factorial = null;
        console.log(anotherFactorial(3)); // 6

        console.log('\n------闭包');
        //---闭包---有权访问另一个函数作用域中的变量的函数
        //1---创建闭包的常见方式---在一个函数内部创建另一个函数
        //在后台执行环境中，闭包的作用域链包含着它自己的作用域，外部函数的作用，全局作用域
        //通常，函数的作用域及其所有变量都会在函数执行结束后被销毁
        //但是，当函数返回一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止
        function createComparisonFunc(propertyName) {
            return function (obj1, obj2) {
                var value1 = obj1[propertyName];
                var value2 = obj2[propertyName];
                return compare(value1, value2);
            }
        }
        //在内部函数中，访问了外部函数的变量propertyName；即使这个内部被返回了，而且在其他地方被调用了，但它仍可以访问变量propertyName
        //因为内部函数的作用域链中包含外部函数的作用域
        //当函数被调用时，会创建一个执行环境即相应的作用域链，然后使用arguments和其他命名参数的值来初始化函数的活动对象；但再作用域链中，其外部函数的活动对象处于该函数活动对象的后面（第2位）
        function compare(value1, value2) {
            if (value1 < value2) {
                return -1;
            } else if (value1 > value2) {
                return 1;
            } else {
                return 0;
            }
        }
        //创建函数---会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存再函数的[[Scope]]属性中
        //调用函数---会为函数创建一个执行环境，然后通过复制函数的[[Scope]]属性中的对象构建起执行环境的作用域链；此后，又有一个活动对象（在此作为变量对象使用）被创建并被推入执行环境作用域的前端；
        var func = createComparisonFunc('name');
        //作用域链---本质---是一个指向变量对象的指针列表，它只引用但不实际包含变量对象
        //createComparisonFunc的执行环境下的作用域链
        //作用域链1---全局对象
        //作用域链0---createComparisonFunc的活动对象：arguments（['name']），propertyName（'name'）
        //当createComparisonFunc执行完毕后，其执行环境的作用域链会被销毁，但它的活动对象仍然会留在内存中，直到匿名函数被销毁，它的活动对象才会被销毁
        //匿名函数的执行环境下的作用域链
        //作用域链3---全局对象
        //作用域链2---createComparisonFunc的活动对象
        //作用域链1---闭包的活动对象：arguments，obj1（{name: 'a'}），obj2（{name: 'b'}），compare的活动对象
        //作用域链0---compare的活动对象：arguments，value1，value2
        var result = func({
            name: 'a'
        }, {
            name: 'b'
        });
        console.log(result); //-1
        //解除对匿名函数的引用---以便释放内存，随着匿名函数的作用域链被销毁，其它作用域（除了全局作用域）也可以安全地销毁了
        // func = null;
        //2---问题---由于闭包会携带包含它的函数的作用域，因此会比其它函数占用更多的内存；过度使用闭包可能会导致内存占用过多
        //3---闭包与变量---闭包只能取得包含函数中任何变量的最后一个值
        //闭包所保存的是整个变量对象，而不是某个特殊的变量
        function createFunctions() {
            var result = new Array();
            for (var i = 0; i < 3; i++) {
                result[i] = function () {
                    return i;
                }
            }
            return result;
        }
        var funcs = createFunctions();
        //funcs---函数数组，每个函数的作用域中都保存着createFunctions的活动对象，所以它们引用的都是同一个变量i
        //当createFunctions执行完毕后，i的值为10
        for (let i = 0; i < funcs.length; i++) {
            console.log(funcs[i]()); //3,3,3
        }

        console.log('\n------私有变量');
        //---私有变量---任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量
        //特权方法---有权访问私有变量和私有函数的公有方法
        //严格来说，JavaScript中没有私有成员的概念，所有对象属性都是公有的
        //但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量
        //包括：函数的参数，局部变量，在函数内部定义的其他函数
        //1---实现自定义类型的特权方法
        //1.1---在构造函数中定义特权方法
        function MyObject(name) {
            //私有变量
            var privateVariable = 10;
            //私有函数
            function privateFunction() {
                return false;
            }
            //特权方法
            this.publicMethod = function () {
                privateVariable++;
                return privateFunction();
            };
            this.setName = function (value) {
                name = value;
            };
            this.getName = function () {
                return name;
            }
            //利用特权方法可以隐藏那些不应该被直接修改的数据
            //私有变量name在每个实例中都不相同，因为每次调用构造函数都会重新创建这2个方法
        }
        var myObject1 = new MyObject('damon');
        var myObject2 = new MyObject('stefan');
        console.log(myObject1.getName()); //damon
        console.log(myObject2.getName()); //stefan
        //缺点---必须使用构造函数模式来达到这个目的；构造函数模式的缺点是针对每个实例都会创建同样一组新方法
        //1.2---使用原型模式定义特权方法---在私有作用域中定义私有变量或函数
        //创建一个私有作用域
        (function () {
            //私有变量
            var name = '';
            var privateVariable = 10;
            //私有函数
            function privateFunction() {
                return false;
            }
            //构造函数
            var OtherObject = function (value) {
                name = value;
            }
            //特权方法
            OtherObject.prototype.publicMethod = function () {
                privateVariable++;
                return privateFunction();
            };
            OtherObject.prototype.getName = function () {
                return name;
            };
            OtherObject.prototype.setName = function (value) {
                name = value;
            };
            var other1 = new OtherObject('damon');
            console.log(other1.getName()); //damon
            var other2 = new OtherObject('stefan');
            console.log(other1.getName()); //stefan
            other1.setName('nicholas');
            console.log(other2.getName()); //nicholas
            //这个模式与在构造函数中定义特权方法的区别---私有变量和函数是由实例共享的
            //name是一个静态的、由所有实例共享的属性
        })();
        //2---实现单例的特权方法
        //单例---只有一个实例的对象
        //按照惯例，JavaScript是以对象字面量的方式来创建单例对象的
        var singleton = {
            name: 'name',
            method: function () {}
        };
        //2.1---模块模式
        //适合需要对单例进行某些初始化，同时又需要维护其私有变量
        var application = (function () {
            //私有变量和函数
            var components = new Array();
            //初始化
            components.push({
                name: 'one'
            });
            //公共
            return {
                printComponents: function () {
                    console.log(JSON.stringify(components));
                },
                getComponentCount: function () {
                    return components.length;
                },
                registerComponent: function (component) {
                    if (typeof component === 'object') {
                        components.push(component);
                    }
                }
            }
        })();
        application.printComponents(); //[{"name":"one"}]
        application.registerComponent({
            name: 'two'
        });
        application.printComponents(); //[{"name":"one"},{"name":"two"}]
        //2.2---增强的模块模式---在返回之前加入对齐增强的代码
        //适合那些单例必须是某种类型的实例，同时还必须添加某些属性和方法对其加以增强的情况
        function CustomType() {
            console.log('CustomType');
        }
        var app = (function () {
            //私有变量和函数
            var components = new Array();
            //初始化
            components.push({
                name: 'one'
            });
            //创建对象
            var obj = new CustomType(); //CustomType
            //添加特权属性和方法
            obj.printComponents = function () {
                console.log(JSON.stringify(components));
            };
            obj.getComponentCount = function () {
                return components.length;
            };
            obj.registerComponent = function (component) {
                if (typeof component === 'object') {
                    components.push(component);
                }
            };
            //返回这个对象
            return obj;
        })();
        app.printComponents(); //[{"name":"one"}]
        app.registerComponent({
            name: 'two'
        });
        app.printComponents(); //[{"name":"one"},{"name":"two"}]
    },

    // start () {

    // },

    // update (dt) {},
});