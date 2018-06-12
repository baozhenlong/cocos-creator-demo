cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---理解对象

        //---对象
        //无序属性的集合，其属性可以包含基本值、对象或函数
        //散列表---一组名值对，其中值可以是数据或函数
        //每个对象都是基于一个引用类型创建的，这个引用类型可以是reference-type的类型，也可以是开发人员定义的类型

        //---属性类型---ECMAScript中有2种属性：数据属性和访问器属性
        //1---数据属性---包含一个数据值的位置，在这个位置可以读取和写入值
        //1.1---数据属性的4个描述其行为的特性
        //特性---1---[[Configurable]]---表示能否通过delete删除属性，从而重新定义属性；表示能否修改属性的特性；或者表示能否把属性修改为访问器属性
        //直接在对象上定义的属性（如：{name: 'damon'}），它们的这个特性默认值为true
        //特性---2---[[Enumberable]]---表示能否通过for-in循环返回属性（对象的枚举属性）
        //直接在对象上定义的属性（如：{name: 'damon'}），它们的这个特性默认值为true        
        //特性---3---[[Writable]]---表示能否修改属性的值（被赋值运算符改变）
        //直接在对象上定义的属性（如：{name: 'damon'}），它们的这个特性默认值为true        
        //特性---4---[[Value]]---包含这个属性的数据值：读取属性值时，从这个位置读；写入属性值时，把新值保存在这个位置
        //这个特性的默认值为undefined
        //1.2---Object.defineProperty(obj, propName, descriptor)---修改属性默认的特性
        //参数obj---需要定义属性的对象
        //参数propName---需要定义或修改的属性的名字
        //参数descriptor---将被定义或修改的属性的描述符对象：描述符对象的属性必须是Configurable，Enumberable，Writable，Value中的一个或多个
        //返回值---传递给函数的obj        
        //使用Object.defineProperty()方法创建一个新的属性时；如果不指定，configurable、enumberable、writable特性的默认值为false
        var person = {};
        Object.defineProperty(person, 'name', {
            configurable: true,
            enumerable: true,
            value: 'damon'
        });
        console.log(person.name); //damon
        //报错（属性默认为false）---person.name = 'stefan';
        //2---访问器属性---不包含数据值，包含一对getter和setter函数（这2个函数不是必需）
        //在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值
        //在写入访问器属性时，会调用setter函数，并传入新值，这个函数负责决定如何处理数据
        //2.1---访问器属性的4个特性
        //特性---1---[[Configurable]]---表示能否通过delete删除属性，从而重新定义属性；表示能否修改属性的特性；或者表示能否把属性修改为访问器属性
        //特性---2---[[Enumberable]]---表示能否通过for-in循环返回属性（对象的枚举属性）
        //特性---3---[[Get]]---在读取属性时调用的函数，默认值为undefined
        //特性---4---[[Set]]---在写入属性时调用的函数，默认值为undefined
        //访问器属性不能直接定义，必须使用Object.defineProperty()来定义
        //例子---使用访问器属性的常见方式：设置一个属性的值，会导致其它属性发生变化
        var book = {
            //定义2个默认属性
            _year: 2004, //_下划线表示只能通过对象方法访问的属性
            edition: 1
        };
        //定义一个访问器属性
        Object.defineProperty(book, 'year', {
            get: function () {
                console.log('get');
                return this._year;
            },
            set: function (value) {
                console.log('set');
                if (value > 2004) {
                    this._year = value;
                    this.edition += value - 2004;
                }
            }
        });
        //year和_year是2个不同的属性
        book.year = 2006; //set
        console.log(book.edition); //3
        console.log(book.year); //get 2006

        //---Object.defineProperties(obj, descriptors)---定义多个属性
        //参数obj---需要添加或修改属性的对象
        //参数descriptors（对象）---包含一个或多个描述符对象的JavaScript对象；每个描述符对象描述一个数据属性或访问器属性
        //返回值---传递给函数的obj
        var obj = {};
        Object.defineProperties(obj, {
            data: {
                value: 101,
                writable: true,
                enumerable: false,
                configurable: true
            },
            msg: {
                set: function (x) {
                    console.log('set');
                    this.msgValue = x;
                },
                get: function () {
                    console.log('get');
                    return this.msgValue;
                },
                enumerable: true,
                configurable: true
            }
        });

        //---Object.getOwnPropertyDescriptor(obj, propertyName)---读取属性的特性：获取给定属性的描述符
        //参数obj---属性所在的对象
        //参数propertyName---要读取其描述符的属性名称
        //返回值（Object）---一个对象
        //如果是数据属性，这个对象的属性有configurable，enumberable，writable，value；
        var dataDescriptor = Object.getOwnPropertyDescriptor(obj, 'data');
        console.log(dataDescriptor); //{value: 101, writable: true, enumerable: false, configurable: true}
        //如果是访问器属性，这个对象的属性有configurable，enumberable，get，set
        var msgDescriptor = Object.getOwnPropertyDescriptor(obj, 'msg');
        console.log(msgDescriptor); //{get: ƒ, set: ƒ, enumerable: true, configurable: true}
    },

    // start() {},

    // update (dt) {}
});