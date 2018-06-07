cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---一元操作符---只能操作一个值的操作符
        //1---递增和递减操作符
        var num1 = 2;
        var num2 = 20;
        console.log('前置---先执行--，++，后赋值 ' + (--num1 + num2)); //21
        var num1 = 2;
        console.log('后置---先赋值，后执行--，++ ' + (num1++ + num2)); //22
        //2---一元加减操作符
        //-+（param）
        //如果param是非数值，会先对其进行Number()转换
        //2.1---（+数值）---对数值不会产生影响
        //2.2---（-数值）---变成负数

        //---布尔操作符
        //1---逻辑非---!(Any)
        //首先将Any操作数转换为一个布尔值（Boolean()），然后对其求反
        //返回值---布尔值
        //规则---返回false---对象，非空字符串，任意非0数值
        //规则---返回true---空字符串，数值0，null，undefined，NaN
        //2---逻辑与&&---Any1 && Any2
        //短路操作---Any1能够决定结果，那么不会再对第二个操作数求值，即当Any1 === false时，直接返回false
        //3---逻辑或||---Any1 && Any2
        //短路操作---Any1能够决定结果，那么不会再对第二个操作数求值，即当Any1 === true时，直接返回true

        //---乘性操作符---操作数为非数值的情况下，后台会先使用Number()转型函数将其转换为数值
        //1---乘法*
        //规则---有NaN，返回NaN
        //规则---有Infinity，返回（符号+Infinity）
        //2---除法/
        //规则---有NaN，返回NaN  
        //规则---0/0，返回NaN
        //规则---Infinity/Infinity，返回Infinity
        //规则---非0有限数/0 或 Infinity/非0，返回（符号+Infinity）      
        //3---求模%---返回求得的余数
        //规则---有NaN，返回NaN
        //规则---无穷大%有限大，返回NaN
        //规则---有限大%0，返回NaN
        //规则---Infinity%Infinity，返回Infinity
        //规则---0%Any，返回0

        //---加性操作符
        //1---加法+
        //规则---如果有一个操作数是一个布尔值，null，undefined，则再后台先调用Number()将其转换为数值
        //规则---如果操作数中有字符串，先进行字符串转换（需要的话），然后进行字符串拼接操作
        //规则---如果有一个操作数是对象，则调用它们的valueOf()或toString()方法取得相应的字符串，然后再应用上述规则
        var result = 5 + false;
        console.log(' 5 + false = ' + result); //5
        console.log('typeof (5 + false) = ' + (typeof result)); //number
        console.log('5 + null = ' + (5 + null)); //5
        console.log('5 + String(null) =  ' + (5 + String(null))); //5null
        //2---减法-
        //规则---如果有一个操作数是一个字符串，布尔值，null，undefined，则再后台先调用Number()将其转换为数值
        //规则---如果有一个操作数是对象，则调用它们的valueOf()或toString()方法取得相应的字符串，然后再应用上述规则

        //---关系操作符---<，>，<=，>=---返回一个布尔值
        //规则---如果2个操作数都是数值，则执行数值比较
        //规则---如果2个操作数都是字符串，则比较2个字符串对应的字符编码；大写字母的字符编码全部<小写字母的字符编码
        //规则---如果有一个操作数数值，则将另一个操作数转换为数值，然后执行数值比较
        //规则---如果有一个操作数是对象，则调用这个对象的valueOf()或toString()方法，用得到的结果根据上述规则执行比较
        //规则---如果操作数是一个布尔值，则将其转换为数值，然后执行比较
        //规则---任何数与NaN比较，结果都是false

        //---相等操作符
        //1---相等和不相等---==和!=，先转换再比较
        //==---如果2个操作数相等，则返回true，否则返回false
        //!=---如果2个操作数不相等，则返回true，否则返回false
        //转换规则---如果有一个操作数是布尔值，则先将其转换为数值：false-0；true-1
        //转换规则---如果一个操作数是字符串，另一个操作数是数值，则先将字符串转换为数值
        //转换规则---如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，得到基本类型值，按照上述规则进行比较
        //比较规则---null和undefined是相等的
        //比较规则---在比较相等性之前，不能将null和undefined转换为其它任何值
        //比较规则---如果有一个操作数是NaN，==返回false，!=返回true
        //比较规则---如果2个操作数都是对象，则比较它们是不是同一个对象，如果2个操作数都指向同一个对象，则相等操作符返回true，否则返回false
        //2---全等和不全等---===和!==，仅比较，不转换
        //3---例子
        //3.1---String，Number等基础类型之间进行比较
        //==---先将比较的2者转换为同一类型，然后进行比较
        //===---如果类型不同，则直接返回false
        //3.2---Array，Object等高级类型之间的比较
        //==，===---比较2者的指针值是否相同
        //3.3---基础类型和高级类型之间的比较
        //==---先将高级类型转换为基础类型，然后进行比较
        //===---直接返回false
        //3.4---特例
        console.log(null == undefined); //true---进行比较null和undefined都不会转换为其它任何类型
        console.log(null === undefined); //false---不同类型，null-Object类型，undefined-Undefined类型

        //---条件操作符---?:
        //表达式 ? trueValue : falseValue;---对表达式求值，求值结果为true时，取trueValue，否则为falseValue

        //---赋值操作符---=
        //把右侧的值赋给左侧的变量

        //---逗号操作符---,可以在一条语句中执行多个操作，多用于声明变量
        //用于赋值，返回表达式的最后一项
        var num = (1, 2, 3);
        console.log(num); //3

    },

    // start () {

    // },

    // update (dt) {},
});