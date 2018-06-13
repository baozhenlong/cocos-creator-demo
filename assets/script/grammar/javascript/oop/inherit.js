cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---许多OO语言都支持2个中继承方式
        //1---接口继承---只继承方法和签名
        //2---实现继承---继承实际的方法

        //---由于函数没有签名，在ECMAScript中无法实现接口继承，ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的

        //---原型链
        //原型链的构建---通过将一个类型的实例赋值给另一个构造函数的原型实现的
        //基本思想---利用原型，让一个引用类型继承另一个引用类型的属性和方法
        //构造函数、原型、实例的关系
        //关系---1---每个构造函数都有一个原型对象
        //关系---2---原型对象都包含一个指向构造函数的指针
        //关系---3---实例都包含一个指向原型对象的内部指针
        //1---实现原型链的基本模式
        //1.1---实现方式
        //定义SuperType
        function SuperType() {
            this.property = true;
        }
        SuperType.prototype.getSuperValue = function () {
            console.log('super value = ' + this.property);
            return this.property;
        };
        //定义SubType
        function SubType() {
            this.subProperty = false;
        }
        //继承了SuperType
        //继承是通过创建SuperType的实例，并将该实例赋给SubType.prototype实现的
        //实现的本质是重写原型对象，一个新类型的实例；即原来存在于SuperType的实例中的所有属性和方法，现在也存在于SubType.prototype中了
        //替换原型
        SubType.prototype = new SuperType();
        var instance = new SubType();
        //1.2---实例、构造函数、原型之间的关系
        //SubType没有使用默认提供的原型，而是使用SuperType的实例作为新原型
        //新原型不仅具有作为一个SuperType实例所拥有的全部属性和方法，而且其内部还有一个指针，指向了SuperType的原型
        //最终结果---1---instance指向SubType的原型，SubType的原型又指向SuperType的原型
        //最终结果---2---getSuperValue()（原型方法）方法在SuperType.prototype中，但property（实例属性）则位于SubType.propertype中
        console.log(instance.constructor === SuperType); //true---SubType.prototype被重写了
        //2---原型搜索机制
        //当以读取模式访问实例属性时，首先会在实例中搜索该属性，如果没找到该属性，则会继续搜索实例的原型（在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上）
        //搜索步骤
        //步骤---1---搜索实例
        //步骤---2---搜索SubType.prototype
        //步骤---3---搜索SuperType.prototype
        //在找不到属性或方法的情况下，搜索过程总要一环一环地前行到原型链末端才会停下来
        //3---默认的原型
        //所有引用类型默认都继承了Object，而这个继承是通过原型链实现的
        //所有函数的默认原型都是Object，因此默认原型都会包含一个内部指针，指向Object.prototype
        //4---确定原型和实例的关系
        //4.1---obj instanceof constructor---用这个操作符来检测一个实例是否属于某种类型
        //由于原型链的关系，instance是Object，SuperType，SubType中任何一个类型的实例
        console.log(instance instanceof Object); //true
        console.log(instance instanceof SuperType); //true
        console.log(instance instanceof SubType); //true
        //4.2---obj.prototype.isPrototypeOf(obj)---只要原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，返回true
        console.log(Object.prototype.isPrototypeOf(instance)); //true
        console.log(SuperType.prototype.isPrototypeOf(instance)); //true
        console.log(SuperType.prototype.isPrototypeOf(instance)); //true
        //5---谨慎地定义方法
        //子类有时候需要重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法
        //但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后
        //添加新方法        
        SubType.prototype.getSubValue = function () {
            console.log('sub value = ' + this.subProperty);
            return this.subProperty;
        };
        //重写超类型中的方法，会屏蔽超类型中的同名方法
        SubType.prototype.getSuperValue = function () {
            console.log('rewrite');
            return false;
        };
        var instanceSuper = new SuperType();
        instance.getSuperValue(); //rewrite
        instanceSuper.getSuperValue(); //super value = true
        //在通过原型链实现继承时，不能使用对象字面量创建原型方法，这样会重写原型链，现在的原型是一个Object的实例
        //6---原型链的问题
        //6.1---对象实例共享所有继承的属性和方法（这也是为什么要在构造函数中，而不是再原型对象中定义属性的原因）
        //在通过原型来实现继承时，原型实际上会变成另一个类型的实例，原先的实例属性也就顺理成章地变成了现在的原型属性了
        function TestSuper() {
            this.numList = [1, 2, 3];
            this.num = 1;
        }
        //继承了TestSuper
        function TestSub() {}
        TestSub.prototype = new TestSuper();
        console.log(Object.getOwnPropertyNames(TestSub.prototype)); //["numList", "num"]
        //超类型的实例---每个实例都会有各自的属性
        var instanceSuper1 = new TestSuper();
        console.log(Object.getOwnPropertyNames(instanceSuper1)); //["numList", "num"]
        var instanceSuper2 = new TestSuper();
        instanceSuper1.num = 2;
        instanceSuper1.numList.push(4);
        console.log(instanceSuper1.num); //2
        console.log(instanceSuper1.numList); //[1, 2, 3, 4]
        console.log(instanceSuper2.num); //1
        console.log(instanceSuper2.numList); //[1, 2, 3]
        //子类型的实例
        var instanceSub1 = new TestSub();
        console.log(Object.getOwnPropertyNames(instanceSub1)); //[]
        var instanceSub2 = new TestSub();
        instanceSub1.num = 2; //创建实例属性
        instanceSub1.numList.push(4); //操作原型中的属性
        console.log(instanceSub1.num); //2---访问实例属性
        console.log(instanceSub1.numList); //[1, 2, 3, 4]---访问原型属性
        console.log(Object.getOwnPropertyNames(instanceSub1)); //["num"]        
        console.log(instanceSub2.num); //1---访问原型属性
        console.log(instanceSub2.numList); //[1, 2, 3, 4]---访问原型属性
        instanceSub1.numList = [1]; //创建实例属性
        console.log(instanceSub1.numList); //[1]---访问实例属性
        console.log(instanceSub2.numList); //[1, 2, 3, 4]---访问原型属性
        console.log(Object.getOwnPropertyNames(instanceSub1)); //["num", "numList"]        
        console.log(Object.getOwnPropertyNames(instanceSub2)); //[]        
        //6.2---在创建子类型的实例时，不能向超类型的构造函数中传递参数（没有办法再不影响所有对象实例的情况下，给超类型的构造函数传递参数）
        //因此，实践中很少会单独使用原型链

        //---借用构造函数（也叫伪造对象或经典继承）---解决原型中包含引用类型值所带来的问题
        //基本思想---在子类型构造函数的内部调用超类型构造函数；函数只不过是在特定环境中执行代码的对象，因此通过使用apply和call方法也可以在新创建的对象上执行构造函数
        //参数传递---相对于原型链而言，借用构造函数有一个很大的优势：在子类型构造函数中向超类型构造函数传递参数
        function JieSuper(name) {
            this.name = name
            this.numList = [1, 2, 3];
        }
        //为了确保超类型构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性
        //借调超类型的构造函数
        function JieSub() {
            //继承了JieSuper，同时还传递了参数
            JieSuper.call(this, 'damon'); //this---表示构造函数的实例
            //实例属性
            this.age = 11;
        }
        var instance1 = new JieSub();
        instance1.numList.push(4);
        var instance2 = new JieSub();
        console.log(instance1.name); //damon
        console.log(instance1.numList); //[1, 2, 3, 4]
        console.log(instance2.name); //damon
        console.log(instance2.numList); //[1, 2, 3]
        //借用构造函数的问题
        //如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题：方法在构造函数中定义，因此函数复用就无从谈起了
        //超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型只能使用构造函数模式
        //因此，借用构造函数的技术也很少单独使用的

        //---继承模式
        //1---组合继承（也叫伪经典继承）---将原型链和借用构造函数的技术组合到一块，从而发挥两者之长的一种继承模式
        //使用最多的继承模式
        //思路---使用原型链实现对原型属性和方法的继承；通过借用构造函数来实现对实例属性的继承
        //这样既通过再原型上定义方法实现了函数复用，又能保证每个实例都有它自己的属性
        //不足---1---无论在什么情况下都会调用2次超类型构造函数函数：第1次在创建子类型原型的时候，第2次在子类型构造函数的内部
        //不足---2---子类型会最终包含超类型对象的全部实例属性，但不得不在调用子类型构造函数时，重写这些属性
        function ZuSuper(name) {
            this.name = name;
            this.numList = [1, 2, 3];
        }
        ZuSuper.prototype.sayName = function () {
            console.log(this.name);
        };
        //继承
        function ZuSub(name) {
            //继承实例属性
            ZuSuper.call(this, name); ////第2次---在新对象上创建实例属性，屏蔽原型中的同名属性
        }
        //继承原型属性和方法
        ZuSub.prototype = new ZuSuper(); //第1次---得到ZuSuper的实例属性
        ZuSub.prototype.constructor = ZuSub;
        var zu1 = new ZuSub('damon');
        zu1.numList.push(4);
        var zu2 = new ZuSub('stefan');
        console.log(zu1.numList); //[1, 2, 3, 4]
        console.log(zu2.numList); //[1, 2, 3]
        zu1.sayName(); //damon
        zu2.sayName(); //stefan
        console.log(zu1.sayName === zu2.sayName); //true
        //2---原型式继承---借助原型，可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
        //本质---执行对给定对象的浅复制，而复制得到的副本还可以进一步改造
        //可以在不必预先定义构造函数的情况下，实现继承
        function object(o) {
            function F() {} //创建一个临时构造函数
            F.prototype = o; //将传入的对象作为这个构造函数的原型
            return new F(); //返回这个临时类型的一个新实例
        }
        var person = {
            name: 'damon',
            friendList: ['stefan', 'nicholas']
        };
        var person1 = object(person);
        var person2 = object(person);
        person1.friendList.push('tyler');
        person2.friendList.push('bonnie');
        console.log(person1.name); //damon
        console.log(person2.name); //damon
        console.log(person1.friendList); //["stefan", "nicholas", "tyler", "bonnie"]
        console.log(person2.friendList); //["stefan", "nicholas", "tyler", "bonnie"]
        person1.name = 'mike';
        person1.friendList = [1];
        console.log(person1.name); //mike     
        console.log(person1.friendList); //[1]---类似使用原型模式   
        console.log(person.name); //damon
        //规范原型式继承---Object.create(prototype, descriptors)---ECMAScript5通过新增的方法，创建一个具有指定原型且可选择性地包含指定属性的对象
        //参数prototype---要用作原型的对象，可以为null
        //可选参数descriptors---包含一个或多个属性描述符的JavaScript对象
        //返回值---一个具有指定的内部原型且包含指定的属性的新对象
        var person = {
            name: 'damon',
            friendList: ['stefan', 'nicholas']
        };
        var person1 = Object.create(person); //等价于上述object()方法
        //在没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式继承是完全可以胜任的
        //3---寄生式继承---创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象
        //与原型式继承紧密相关的一种思路
        //与寄生构造函数和工厂模式类似
        function createAnother(original) {
            var clone = object(original); //使用原型式继承来创建一个新对象
            clone.sayHi = function () { //以某种方式来增强对象
                console.log('hi');
            };
            return clone; //返回这个对象
        }
        var anotherPerson = createAnother(person);
        anotherPerson.sayHi(); //hi
        //基于person返回了一个新对象anotherPerson，新对象不仅具有person的所有属性和方法，而且还有自己的sayHi()方法
        //object()函数不是必需的，任何能够返回新对象的函数都适用于此模式
        //在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式
        //使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率，这一点与构造函数模式类似
        //4---寄生组合式继承---引用类型最理想的继承范式
        //集寄生式继承和组合继承的优点于一身，是实现基于类型继承的最有效方式
        //通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
        //基本思路---不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已
        //本质---使用寄生式继承来继承超类型的原型，然后将结果指定给子类型的原型
        //为子类型原型赋值
        function inheritPrototype(subType, superType) {
            //创建对象---创建超类型原型的一个副本
            var prototype = object(superType.prototype);
            //增强对象---为副本天剑constructor属性，从而弥补因重写原型而失去的默认的constructor属性
            prototype.constructor = subType;
            //指定对象---把副本赋值给子类型的原型
            subType.prototype = prototype;
        }
        //超类型
        function NewSuper(name) {
            this.name = name;
            this.numList = [1, 2, 3];
        }
        NewSuper.prototype.sayName = function () {
            console.log(this.name);
        }
        //子类型
        function NewSub(name, age) {
            NewSuper.call(this, name);
            this.age = age;
        }
        inheritPrototype(NewSub, NewSuper);
        NewSub.prototype.sayAge = function () {
            console.log(this.age);
        };
        //高效率---只调用了一次超类型构造函数，并且因此避免了在子类型原型上创建不必要，多余的属性，与此同时，原型链还能保持不变

    },

    // start() {},

    // update (dt) {}
});