//术语
//1---CCClass---使用cc.Class声明的类
//2---原型对象---调用cc.Class时传入的字面量参数
//3---实例成员---包含成员变量和成员方法
//4---静态成员---包含静态变量和类方法
//5---序列化---解析内存中的对象，将它的信息编码为一个特殊的字符串，以便保存到硬盘上或传输到其它地方

var Sup = require('sup');

//cc.Class()---用于声明Cocos Creator中类
//参数---原型对象，在原型对象中以键值对的形式设定所需的参数类型
//创建了一个CCClass类型，并且赋给了namespace变量
//Sub---保存的是一个JavaScript构造函数，可以直接new出一个对象

//原型对象参数说明---所有原型对象的参数都可以省略，用户只需要声明用得到的部分即可
var Sub = cc.Class({

    //基类（Function）---可以是任意创建好的cc.Class    
    //继承
    //Sub---子类
    //Sup---父类
    //继承后，CCClass会自动调用父构造函数，不需要显式调用；然后调用子类的构造函数（存在的情况下）
    extends: Sup,

    //属性---特殊的实例变量，能够显示在属性检查器中，也能被序列化
    //属性不用在构造函数里定义，在构造函数被调用前，属性已经被赋为默认值了，可以在构造函数内访问到
    properties: {

    },

    //构造函数（Function）    
    //注意---不论子类是否有定义构造函数，子类实例化前，父类的构造函数都会被自动调用，再调用子类构造函数（存在时）
    ctor: function() {
        console.log('sub');
    },

    onLoad() {

        //调用实例方法
        this.print();

        //静态变量相关操作---浅拷贝
        console.log('Sub.supName = ' + JSON.stringify(Sub.supName)); //"supStatics"
        console.log('Sub.range = ' + JSON.stringify(Sub.supRange)); //{"w":100,"h":100}
        console.log('Sub.subName = ' + JSON.stringify(Sub.subName)); //"subStatics"
        Sub.supName = 'static';
        console.log('Sub.supName = ' + JSON.stringify(Sub.supName)); //"static"
        console.log('Sup.supName = ' + JSON.stringify(Sup.supName)); //"supStatics"        
        Sub.supRange.w = 200;
        console.log('Sub.range.w = ' + JSON.stringify(Sub.supRange.w)); //200      
        console.log('Sup.range.w = ' + JSON.stringify(Sup.supRange.w)); //200      

        this.printName();
    },

    //成员
    //1---实例变量
    //this.xxx
    //2---实例方法
    print: function() {
        console.log('this.name = ' + this.name); //ccclass<cc-class>---节点名<脚本名>
    },
    //3---静态成员（Object）
    statics: {
        //静态成员会被子类继承，继承时会将父类的静态变量浅拷贝给子类
        //静态变量
        subName: 'subStatics',
        //静态方法
        getName: function() {}
    },

    onInstantiateClicked: function() {
        //继承
        //实例化---实例化时，父类构造函数会自动调用，再调用子构造函数
        var sub = new Sub(); //sup sub

        //判断类型
        //1---判断实例---instanceof
        console.log('sub instanceof Sub = ' + (sub instanceof Sub)); //true
        console.log('this instanceof Sub = ' + (this instanceof Sub)); //true
        console.log('sub instanceof Sup = ' + (sub instanceof Sup)); //true
        var sup = new Sup(); //sup
        console.log('sub instanceof Sup = ' + (sup instanceof Sub)); //false
        //2---判断类的继承关系---cc.isChildClassOf(Sub, Sup)
        //参数Sub---子类构造函数
        //参数Sup---父类构造函数
        //如果传入的2个类相等，同样会返回true
        console.log('cc.isChildClassOf(Sub, Sup) = ' + cc.isChildClassOf(Sub, Sup)); //true
    },

    //重写
    //所有成员方法都是虚方法，子类方法可以直接重写父类方法
    //父类被重写的方法并不会被CCClass自动调用
    printName: function() {
        //调用被重写方法
        //1---使用CCClass封装的this._super()
        this._super(); //print name = sup
        //2---使用JavaScript原生方法
        Sup.prototype.printName(); //print name = sup
        console.log('print name = sub');
    },

    // start () {

    // },

    // update (dt) {},
});
//声明静态成员的等价方式
// Sub.name = 'static';
// Sub.getName = function() {
// };