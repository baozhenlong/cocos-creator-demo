cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---创建对象

        //1---工厂模式---一种设计模式，抽象了创建具体对象的过程
        //使用简单的函数创建对象，为对象添加属性和方法，然后返回对象
        //解决了创建多个相似对象的问题，但没有解决对象的识别问题（即怎样知道一个对象的类型）
        function createPerson(name, age) {
            var o = new Object();
            o.name = name;
            o.age = age;
            o.sayName = function () {
                console.log(this.name);
            }
            return o;
        }
        var person = createPerson('damon', 25);
        person.sayName(); //damon

        //2---构造函数模式---ECMAScript中的构造函数可用来创建特定类型的对象
        //缺点---每个成员无法得到复用，包括函数
        //开发人员可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法
        //没有显式地创建对象，直接将属性和方法赋给了this对象
        //没有return语句，默认返回新对象实例
        //函数名使用大写字母P---按照惯例，构造函数始终都应该以大写字母开头，而非构造函数则应该以小写字母开头
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.sayName = function () {
                console.log(this.name);
            }
        }
        //使用new + 构造函数创建新实例，实际经历的4个步骤
        //步骤---1---创建一个新的对象
        //步骤---2---将构造函数的作用域赋给新的对象：this指向这个新对象
        //步骤---3---执行构造函数中的代码：为这个新对象添加属性
        //步骤---4---返回新对象
        //可以将实例标识为一种特定的类型        
        var person = new Person('stefan', 23);
        person.sayName(); //stefan
        console.log(person.constructor === Person); //true；创建的对象有一个构造函数属性（constructor），该属性指向Person
        console.log(person instanceof Object); //true；创建的对象是Object的实例
        console.log(person instanceof Person); //true；创建的对象是Person的实例
        //构造函数与其它函数的唯一区别，在于调用它们的方式不同
        //作为构造函数调用，使用new操作符来调用
        //作为普通函数调用，不使用new
        var testObj = new Object();
        Person.call(testObj, 'damon', 26);
        testObj.sayName(); //damon
        //问题---每个方法都要在每个实例上创建一遍（ECMAScript中函数是对象，因此，每定义一个函数，也就是实例化了一个对象）
        //不同实例上的同名函数是不相等的
        var anotherPerson = new Person('damon', 26);
        console.log(person.sayName === anotherPerson.sayName); //false

        //3---原型模式---使用构造函数的prototype属性来指定那些应该共享的属性和方法
        //3.1---理解原型对象
        //3.1.1---构造函数.prototype---指向原型对象的指针
        //只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个原型属性：prototype
        //这个属性指向函数的原型对象；这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法
        //3.1.2---prototype.constructor---指向构造函数的指针
        //在默认情况下，所有原型对象都会自动获得一个constructor属性（构造函数），这个属性是指向prototype属性所在函数的指针
        //创建了自定义的构造函数之后
        //使用原型对象的好处
        //好处---1---让所有对象实例共享它所包含的属性和方法
        //好处---2---不必再构造函数中定义对象实例的信息，而是可以将这些直接添加到原型对象中
        function Student() {}
        Student.prototype.name = 'damon';
        Student.prototype.age = 26;
        Student.prototype.sayName = function () {
            console.log(this.name);
        }
        //3.1.3---对象实例.[[Prototype]]
        //当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向原型对象的指针
        var student1 = new Student();
        var student2 = new Student();
        console.log(student1.sayName === student2.sayName); //true        
        //3.1.4---获取原型对象---Object.getPrototypeOf(obj)
        //参数obj---引用原型的对象
        //返回值---obj的原型，原型也是对象
        console.log(Object.getPrototypeOf(student1) === Student.prototype); //true
        //3.1.5---读取属性---每当代码读取每个对象的某个属性时，都会执行一次搜索，目标是给定名字的属性
        //搜索步骤---1---搜索首先从对象实例本身开始
        //搜索步骤---2---如果在实例中找到了具有给定名字的属性，则返回该属性的值
        //搜索步骤---3---如果没找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
        //搜索步骤---4---如果再原型对象中找到了这个属性，则返会该属性的值
        //3.1.6---可以通过对象实例访问保存在原型对象的值，但不能通过对象实例重写原型中的值
        //如果在实例中添加了一个属性（与实例原型中的一个属性同名），那么就在该实例中创建该属性，该属性会屏蔽原型中的同名属性
        //使用delete操作符可以完全删除实例属性，从而可以重新访问原型中的属性
        student1.name = 'stefan';
        console.log(student1.name); //stefan---来自实例
        console.log(student2.name); //damon---来自原型
        delete student1.name;
        console.log(student1.name); //damon---来自原型
        //3.1.7---检测属性---obj.hasOwnProperty(propertyName)---可以检测一个属性是存在实例中，还是存在于原型中
        //参数propertyName---给定的属性名
        //返回值---只在给定属性存在于对象实例中时，才返回true；否则返回false
        student1.name = 'stefan';
        console.log(student1.hasOwnProperty('name')); //true---实例中有name属性
        console.log(student2.hasOwnProperty('name')); //false---name属性存在于原型
        //3.2---原型与in操作符
        //3.2.1---单独使用in---in操作符会在通过对象访问给定属性时，返回true；无论该属性存在于实例还是原型中
        console.log('name' in student1); //true
        console.log('name' in student2); //true
        //同时使用in操作符和hasOwnProperty()方法，就可以确定属性是存在于对象中，还是原型中
        //return !obj.hasOwnProperty(name) && (name in obj);
        //3.2.2---在for-in循环中使用---返回所有能够通过对象访问的、可枚举的属性，其中既包括存在存在于实例中的属性，也包括存在于原型中的属性
        //屏蔽了原型中不可枚举的属性：[[Enumerable]标记为false]
        //3.3---获取属性
        //3.3.1---Object.keys()---获取可枚举属性
        //参数obj（Object）---要返回其枚举自身属性的对象
        //返回值（Array）---一个表示给定对象的所有可枚举属性的字符串数组；这些属性的顺序与手动遍历该对象属性时的一致（for-in）
        //原型对象的属性
        console.log(Object.keys(Student.prototype)); //["name", "age", "sayName"]
        //实例的属性
        student1.sex = 'm';
        console.log(Object.keys(student1)); //["name", "sex"]
        //3.3.2---Object.getOwnPropertyNames(obj)---获取所有属性
        //参数obj---要返回自身属性的对象
        //返回值（Array）---元素为对象属性的数组
        console.log(Object.getOwnPropertyNames(Student.prototype)); //["constructor", "name", "age", "sayName"]
        console.log(Object.getOwnPropertyNames(student1)); //["name", "sex"]
        //3.4---更简单的原型语法---使用对象字面量
        //将构造函数.prototype设置为一个以对象字面量形式创建的新对象
        //最终结果相同，除了constructor属性不在指向构造函数
        //每创建一个函数，就会同时创建它的prototype属性，这个对象也会自动获得constructor属性
        //当使用对象字面量时，本质上完全重写了默认的prototype对，因此，constructor属性也就变成了新对象的constructor属性（指向Object构造函数）
        function Teacher() {}
        Teacher.prototype = {};
        var teacher = new Teacher();
        console.log(teacher.constructor === Object); //true
        console.log(teacher.constructor === Teacher); //false
        //3.5---原型的动态性
        //3.5.1---由于在原型中查找值的过程是一次搜索，因此对原型对象所做的任何修改都能立即从实例上反映出来（即使先创建了实例，后修改了原型）
        function Search() {}
        var search = new Search();
        Search.prototype.name = 'search';
        console.log(search.name); //search
        //3.5.2---调用构造函数时，会为实例添加一个指向最初原型对象的指针（[[Prototype]]），而把原型修改为另一个对象等于切断了构造函数与最初原型之间的联系
        function Friend() {}
        var friend = new Friend();
        Friend.prototype = {
            constructor: Friend,
            name: 'friend'
        };
        //重写原型对象，切断构造函数与最初原型对象的联系---已经存在的实例引用的仍然是最初的原型对象；后创建的实例引用的是现有原型对象
        var newFriend = new Friend();
        console.log(friend.name); //undefined
        console.log(newFriend.name); //friend
        //3.6---问题
        //3.6.1---忽略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值
        //3.6.2---由其共享的本性所导致（对于包含引用类型值的属性来说）

        //4---组合使用构造函数和原型模式
        //构造函数模式---用于定义实例属性
        //原型模式---用于定义方法和共享的属性
        function People(name, age) {
            this.name = name;
            this.age = age;
            this.friendList = ['damon', 'stefan'];
        }
        People.prototype = {
            constructor: People,
            sayName: function () {
                console.log(this.name);
            }
        }
        //每个实例都会有一份自己的实例属性的副本，但同时又共享对象方法的引用，最大限度地节省了内存
        var peo1 = new People('hi', 1);
        var peo2 = new People('hello', 2);
        console.log(peo1.friendList === peo2.friendList); //false
        console.log(peo1.sayName === peo2.sayName); //true

        //5---动态原型模式
        //把所有信息都封装在了构造函数中，而通过再构造函数中初始化原型（仅在必要情况下）
        //保持了同时使用构造函数和原型的优点；即可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
        //不必检查每个属性和方法，只要检查其中一个即可
        function DynamicPeople(name, age) {
            //属性
            this.name = name;
            this.age = age;
            this.friendList = ['damon', 'stefan'];
            //方法
            if (typeof this.sayName != 'function') {
                //只有在sayName方法不存在的情况下，才会将它添加到原型中
                //只会再初次调用构造函数时，才会执行；此后原型已经完成初始化
                DynamicPeople.prototype.sayName = function () {
                    console.log(this.name);
                };
            }
        }
        var dynamicPeople = new DynamicPeople('hi', 1);
        dynamicPeople.sayName(); //hi

        //6---寄生构造函数模式
        //基本思想---创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象，但从表面上看，这个函数又很像是经典的构造函数
        //除了使用new操作符，并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的
        //构造函数在不返回值的情况下，默认会返回新对象实例，而通过在构造函数的末尾添加一个return语句，可以重写调用构造函数时的返回值
        //返回的对象与构造函数或者构造函数的原型属性之间没有关系，即返回的对象与再构造函数外部创建的对象没有什么不同；不能依赖instanceof操作符来确定对象类型
        function Animal(name) {
            var o = new Object();
            o.name = name;
            o.sayName = function () {
                console.log(this.name);
            }
            return o;
        }
        var animal = new Animal('pig');
        animal.sayName(); //pig
        //这个模式可以在特殊的情况下，用来为对象创建构造函数，如创建一个具有额外方法的特殊数组
        function SpecialArray() {
            //创建数组
            var values = new Array();
            //添加值
            values.push.apply(values, arguments);
            console.log(values);
            //添加方法
            values.toPipedString = function () {
                return this.join('|');
            };
            //返回数组
            return values;
        }
        var colors = new SpecialArray('red', 'green', 'yellow'); //["red", "green", "yellow"]
        console.log(colors.toPipedString()); //red|green|yellow

        //7---稳妥构造函数模式
        //稳妥对象的概念---没有公共属性，而且其方法也不引用this的对象
        //稳妥对象的适合环境---禁止使用this和new，或者防止数据被其它应用程序改动时使用
        //与寄生构造函数类似，不同：新创建对象的实例方法不引用this，不能用new操作符调用构造函数
        //使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此instanceof操作符对这种对象也没有意义
        function SimilarAnimal(name) {
            //创建要返回的对象
            var o = new Object();
            //可以在这里定义私有变量和函数
            o.name = name;
            o.sayName = function () {
                console.log(name);
            }
            //返回对象
            return o;
        }
        var similarAnimal = SimilarAnimal('animal');
        //变量similarAnimal中保存的是一个稳妥对象；除了使用sayName()方法外，没有其他方法访问name的值
        //即使有其他代码会这个对象添加方法或数据成员，但也不能有别的方法访问传入到构造函数中的原始数据
        similarAnimal.sayName(); //animal
    },

    // start() {},

    // update (dt) {}
});