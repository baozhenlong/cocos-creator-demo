cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---类和原型
        //在JavaScript中，类的实现是基于其原型继承机制的；类的所有实例对象都从同一个原型对象上继承属性；因此原型对象是类的核心

        //---类和构造函数
        //构造函数---用来初始化新创建的的对象
        //使用关键字new调用构造函数会自动创建一个新对象，因此构造函数本身只需初始化这个新对象的状态即可
        //调用构造函数的一个重要特征：构造函数的prototype属性会被用作新对象的原型
        //这意味着通过同一个构造函数创建的所有对象都将继承自一个相同的对象，因此它们都是同一个类的成员
        //这是一个构造函数，用以初始化新创建的"范围对象""
        function Range(from, to) {
            //这两个属性是不可继承的，每个对象都拥有唯一的属性
            this.from = from;
            this.to = to;
        }
        //所有的范围对象"都继承自这个对象
        Range.prototype = {
            //使用对象字面量重写prototype，不含有constructor属性，可以显式给原型添加一个构造函数
            constructor: Range, //显式设置构造函数反向引用
            //如果x在范围内，则返回true，否则返回false
            includes: function (x) {
                return this.from <= x && x <= this.to;
            },
            //返回表示这个范围的字符串
            toString: function () {
                return '(' + this.from + '...' + this.to + ')';
            }
        }
        var r = new Range(1, 3); //创建一个范围对象
        console.log(r.includes(2)); //true：2在这个范围内
        console.log(r.toString()); //(1...3)
        //这里遵循了一个常见的编程约定：从某种意义上讲，定义构造函数既是定义类，并且类名首字母要大写
        //通过new关键字调用构造函数，在调用构造函数之前就已经创建了新对象，通过this关键字可以获取这个对象
        //构造函数只不过是初始化this而已
        //构造函数甚至不必显式使用return返回这个新创建的对象，构造函数会自动创建对象，然后将构造函数作为这个对象的方法来调用一次，最后默认返回这个新对象

        //---构造函数和类的标识
        //原型对象是类的唯一标识：当且仅当两个对象继承自同一个原型对象时，它们才是属于同一个类的实例
        //而初始化对象的状态的构造函数则不能作为类的标识，两个构造函数的prototype属性可能指向同一个原型对象，那么这两个构造函数创建的实例是属于同一个类的
        //构造函数是类的"外在表现"，构造函数的名字通常用做类名

        //---constructor属性
        //任何JavaScript函数都可以用做构造函数，并且调用构造函数时需要用到一个prototype属性
        //因此，每个JavaScript函数（Function.bind()方法返回的函数除外）都自动拥有一个prototype属性
        //prototype属性的值是一个对象，这个对象包含唯一一个不可枚举属性constructor；当重写prototype时，需显式添加constructor属性
        //constructor属性的值是一个函数对象：通常指代它们的构造函数
        var F = function () {}; //这是一个函数对象
        var p = F.prototype; //这是F相关联的原型对象
        var c = p.constructor; //这是与原型相关联的函数
        console.log(c === F); //true：对于任意函数F.prototype.consturctor === F
        //由于构造函数是类的"公共标识"，因此这个constructor属性为对象提供了类
        var o = new F(); //创建类F的一个对象
        console.log(o.constructor === F); //true：constructor属性指代这个类

        //---JavaScript中Java式的类继承
        //1---Java或其它类似强类型面向对象语言的类成员
        //实例字段---基于实例的属性或变量，用以保存独立对象的状态
        //实例方法---类的所有实例所共享的方法，由每个独立的实例调用
        //类字段---这些属性或变量是属于类的，而不是属于类的某个实例的
        //类方法---这些方法是属于类的，而不是属于类的某个实例的
        //2---JavaScript中的函数都是以值的形式出现的，方法和字段之间没有太大的区别
        //如果属性值是函数，那么这个属性就定义一个方法；否则，它只是一个普通的属性或"字段"
        //构造函数对象---构造函数为JavaScript的类定义了名字，任何添加到这个构造函数对象中的属性都是类字段和类方法（如果属性值是函数的话就是类方法）
        //原型对象---原型对象的属性被类的所有实例所继承，如果原型对象的属性值是函数的话，这个函数就作为类的实例的方法来调用
        //实例对象---类的每个实例都是一个独立的对象，直接给这个实例定义的属性是不会为所有实例对象所共享的；定义在实例上的非函数属性，实际上是实例的字段
        //在JavaScript中定义类的步骤
        //步骤1---先定义一个构造函数，并设置初始化新对象的实例属性
        //步骤2---给构造函数的prototype对象定义实例的方法
        //步骤3---给构造函数定义类字段和类属性
        //表示复数的类
        function Complex(real, imaginary) {
            if (isNaN(real) || isNaN(imaginary)) {
                return; //确保两个实参都是数字
            }
            //---实例字段
            this.r = real; //复数的实部
            this.i = imaginary; //复数的虚部
        }
        //这个构造函数为它所创建的每个实例定义了实例字段r和i
        //这两个字段分别保存着复数的实部和虚部；它们是对象的状态
        //---实例方法
        Complex.prototype.toString = function () {
            return '{ ' + this.r + ', ' + this.i + ' }'; //将复数对象转换为一个字符串
        }
        //类的实例方法定义为原型对象的函数值属性
        //这里定义的方法可以被所有实例继承，并为它们提供共享的行为
        //需要注意的是，JavaScript的实例方法必须使用关键字this来存取实例的字段
        //---类字段和类方法
        Complex.ZERO = new Complex(0, 0); //大写命名，用以表示是常量
        Complex._introduction = 'complex'; //下划线前缀表明它是类内部使用的，而不属于类的共有API的部分
        Complex.showIntroduction = function () {
            console.log('介绍 = ' + Complex._introduction);
        }
        //类字段和类方法直接定义为构造函数的属性
        //需要注意的是，类的方法通常不使用关键字this，它们只对其参数进行操作
        var c = new Complex(2, 3); //使用构造函数创建新的对象
        console.log(c.r); //2：使用了实例属性
        console.log(c.toString()); //{ 2, 3 }：使用了实例方法
        console.log(Complex.ZERO.toString()); //{ 0, 0 }：使用类字段
        Complex.showIntroduction(); //介绍 = complex：使用类方法
        //JavaScript中没有final，private等关键字，可以使用一些命名写法上的约定来给出一些暗示：
        //成员不能修改---使用大写字母命名
        //成员在外部不可见---使用下划线为前缀命名

        //---类的扩充
        //JavaScript中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后，原型的属性发生改变，也会影响到继承这个原型的所有实例对象
        //这意味着我们可以通过给原型对象添加新方法来扩充JavaScript类

        //---类和类型
        //1--instanceof运算符
        //待检测的其类的对象 instanceof 定义类的构造函数（在原型链上搜索）
        //实际上检测的是对象的继承关系，而不是检测创建对象的构造函数
        //构造函数是类的公共标识，但原型是唯一的标识
        //缺点---无法通过对象来获得类名，只能检测对象是否属于指定的类名
        //2---constructor属性
        //3---构造函数的名称
        //在多个执行上下文中存在构造函数的多个副本时，instanceof运算符和constructor属性的检测结果会出错
        //解决方案---使用构造函数的名字而不是构造函数本身作为类的标识符
        //问题：并不是所有的函数都有名字
        function HaveName() {}
        console.log(HaveName.name); //HaveName

        //---鸭式辩型
        //不关注对象的类是什么，而是关注对象能做什么

        //---JavaScript中面向对象技术
        //1---集合类
        //集合是一种数据结构，用以表示非重复值的无序集合
        //值的任意集合
        function Set() { //这是一个构造函数
            this.values = {}; //集合数据保存在对象的属性里
            this.n = 0; //集合中值的个数
            this.add.apply(this, arguments); //把所有参数都添加进这个集合
        }
        //将每个参数都添加止集合中
        Set.prototype.add = function () {
            for (var i = 0; i < arguments.length; i++) {
                var value = arguments[i];
                var str = value + '';
                if (!this.values.hasOwnProperty(str)) {
                    this.values[str] = value;
                    this.n++;
                }
            }
            return this; //支持链式方法调用
        };
        //从集合删除元素，这些元素由参数指定
        Set.prototype.remove = function () {
            for (var i = 0; i < arguments.length; i++) {
                var str = Set._v2s(arguments[i]);
                if (this.values.hasOwnProperty(str)) {
                    delete this.values[str];
                    this.n--;
                }
            }
        };
        //如果集合包含这个值，则返回true，否则，返回false
        Set.prototype.contains = function (value) {
            return this.values.hasOwnProperty(Set._v2s(value));
        };
        //返回集合的大小
        Set.prototype.size = function () {
            return this.n;
        };
        //遍历几个中的所有元素，在指定的上下文中调用f
        Set.prototype.foreach = function (f, context) {
            for (var str in this.values) {
                if (this.values.hasOwnProperty(str)) { //忽略继承元素
                    f.call(context, this.values[str]);
                }
            }
        };
        //这是一个内部函数，将任意JavaScript值和唯一的字符串对应起来
        Set._v2s = function (value) {
            switch (value) {
                //特殊值的原始值
                case undefined:
                    return 'u';
                case null:
                    return 'n';
                case true: //布尔值
                    return 't';
                case false: //布尔值
                    return 'f';
                default:
                    switch (typeof value) {
                        case 'number': //数字
                            return '#' + value;
                        case 'string': //字符串
                            return '"' + value;
                        default: //函数或对象
                            return '@' + objectId(value);
                    };
            }

            function objectId(o) {
                var prop = '|**objectid**|'; //私有属性，存放id
                if (!o.hasOwnProperty(prop)) {
                    o[prop].Set._v2s.next++;
                }
                return o[prop];
            }
        };
        Set._v2s.next = 100; //设置id初始id的值

        //2---枚举类型
        //值的有限集合

        //---比较方法
        //JavaScript的相等运算符比较对象时，比较的是引用，而不是值
        var obj1 = {
            name: 'name'
        };
        var obj2 = {
            name: 'name'
        };
        console.log(obj1 === obj2); //false

        //子类
        //在面向对象编程中，类B可以继承自另外一个类A；我们将A称为父类，将B称为子类
        //B的实例从A继承了所有的实例方法
        //类B可以定义自己的实例方法，有些方法可以重载类A中的同名方法
        //如果B的方法重载了A中的方法，B中的重载方法可能调用A中的重载方法，这种做法称为"方法链"
        //子类的构造函数B()有时需要调用父类的构造函数A()，这种做法称为"构造函数链"
        //子类还可以有子类，当涉及类的层次结构时，往往需要定义抽象类
        //抽象类中定义的方法没有实现，抽象类中的抽象方法是在抽象类的具体子类中实现的
        //1---定义子类
        //JavaScript的对象可以从类的原型对象中继承属性（通常继承的是方法）
        //如果O是类B的实例，B是A的子类，那么O也一定从A中继承了属性
        //为此，首先要确保B的原型对象继承A的原型对象
        //2---构造函数和方法链

    },

    // start() {},

    // update (dt) {}
});