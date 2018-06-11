cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---Undefined类型---只有一个值：undefined字面量；字面量：用于表示固定值的符号
        //使用var声明变量，但未对其加以初始化时，这个变量的值是undefined
        var message;
        console.log('message === undefined --- ' + (message === undefined)); //true

        //---Null类型---只有一个值：null，表示一个空对象指针
        //建议---意在保存对象的变量，最好初始化为null
        var car = null;
        console.log('typeof car = ' + (typeof car)); //'object

        //---Boolean类型---true和false，2个字面值
        //Boolean()---转型函数，将一个值转换为对应的Boolean值
        //if()---自动执行相应的Boolean转换
        //转换为false的值
        console.log(Boolean(false));
        console.log(Boolean('')); //空字符串
        console.log(Boolean(0));
        console.log(Boolean(NaN));
        console.log(Boolean(null));
        console.log(Boolean(undefined));

        //---Number类型
        //1---整数---十进制、八进制、十六进制
        //1.1---十进制
        var intNum = 10;
        //1.2---八进制---严格模式下不允许
        // var octalNum = 072; //56
        //1.3---十六进制
        var hexNum = 0xA; //10
        //在进行算术运算时，所有八进制和十六进制表示的数值都将被转换成十进制数值
        //2---浮点数---该数值中必须包含一个小数点，并小数点后面必须至少有一位数字
        //浮点数值计算的舍入误差
        console.log('0.1 + 0.2 = ' + (0.1 + 0.2)); //0.30000000000000004
        //3---NaN---非数值，一个特殊的数值，用于表示一个本来要返回数值的操作数未返回数值的情况
        //3.1---特点---涉及到NaN的操作都会返回NaN；NaN和任何值都不相等，包括NaN本身
        console.log('NaN === NaN ---' + (NaN === NaN)); //false
        //3.2---isNaN(testValue)---确定一个值是否为NaN
        //参数testValue（Any）---要被检测的值；如果该参数不是Number类型，会先尝试将这个参数转换为数值，再对转换结果进行判断
        //返回值---如果给定值是NaN，则返回true，否则返回false
        console.log(isNaN(NaN)); //true
        console.log(Number(undefined)); //NaN
        console.log(isNaN(undefined)); //true
        console.log(Number({})); //NaN
        console.log(isNaN({})); //true
        console.log(Number(true)); //1
        console.log(isNaN(true)); //false
        console.log(Number(false)); //0
        console.log(isNaN(false)); //false
        console.log(Number(null)); //0
        console.log(isNaN(null)); //false
        console.log(Number('')); //0
        console.log(isNaN('')); //false
        console.log(Number('123,4')); //NaN
        console.log(isNaN('123,4')); //true

        //---String类型
        //字符串---由0个或多个16位Unicode字符组成的字符序列
        //字符串的长度---str.length
        //字符字面量---转义序列，用于表示非打印字符，或者具有其它用途的字符
        //字符串的特点---要改变某个变量保存的字符串，首先销毁原来的字符串，然后再用一个新值的字符串填充该变量

        //---Object类型---一组数据和功能的集合；是一个基础类型，其它所有类型都从Object继承了基本的行为
        //1---创建Object类型实例的方式
        //1.1---使用new + 构造函数
        var obj = new Object();
        //1.2---使用对象字面量表示法---定义对象的简写形式
        var person = {
            name: 'damon', //属性名: 属性值
            //,---逗号分隔不同的属性
            'sex': 'm', //属性名可以使用字符串
            5: true, //数值属性会自动转换为字符串
            age: 26 //再最后一个属性后面不能添加逗号
        };
        //2---访问对象属性
        //2.1---点表示法---.（建议使用）
        console.log(person.name); //damon
        //2.2---方括号表示法---[]，将要访问的属性以字符串的形式放在[]中；优点：可以使用变量来访问属性
        console.log(person['name']); //damon
        var propertyName = 'name';
        console.log(person[propertyName]); //damon
        //3---Object的每个实例都具有下列属性和方法
        //属性---constructor---保存着用于创建当前对象的函数（构造函数），如Object()
        //方法---Object.hasOwnProperty(propertyName)---用于检查给定的属性在当前对象的实例中是否存在（而不是在实例的原型中）
        //参数propertyName（String）
        //方法---Object.prototype.isPrototypeOf(Object1)---用于检查传入的对象是否是当前对象的原型
        //参数Object1---在该对象的原型链上搜索
        //方法---propertyIsEnumerable(properName)---用于检查给定的属性是否能够使用for-in语句来枚举
        //方法---toLacaleString()---返回对象的字符串表示，该字符串与执行环境的地区对应
        //方法---toString()---返回对象的字符串表示
        //方法---valueOf()---返回对象的字符串、数值、布尔值表示，通常与toString方法的返回值相同
        //4---参数传递模式
        //对于必需参数---使用命名参数方式
        //对于多个可选参数---使用对象字面量来封装

    },

    // start () {

    // },

    // update (dt) {},
});