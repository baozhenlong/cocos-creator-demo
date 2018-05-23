cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //1---转换成字符串---toString()
        //ECMAScript定义的所有对象（伪对象和真对象）都有toString()方法
        //伪对象---Boolean，Number，String
        //1.1---默认模式---toString()，数字输出是十进制模式
        //1.2---基模式---toString(2 ~ 36)，数字输出可以是不同的基模式

        //2---转换成数字---只转换第一个无效字符之前的字符串
        //2.1---parseInt(string, radix)---解析一个字符串，并返回一个整数
        //参数string（String）---要被解析的字符串
        //可选参数radix---要解析的数字的基数，该值介于2-36之间；省略或其值为0，则会根据string来判断数字的基数
        //返回值---解析后的数字
        //提示---如果字符串的第一个不能被转换为数字，那么parseInt将会返回NaN
        console.log('parseInt("s1", 10) = ' + parseInt('s1', 10)); //NaN
        console.log('parseInt(1234, 10) = ' + parseInt(1234, 10)); //1234
        console.log('parseInt({}, 10) = ' + parseInt({}, 10)); //NaN
        //2.2---parseFloat(string)---解析一个字符串，并返回一个浮点数
        //参数string（String）---要被解析的字符串
        //返回值---解析后的数字
        //提示---第一个出现的小数点是有效字符；该方法会忽略前导零
        console.log('parseFloat("0x") = ' + parseFloat('0x')); //0
        console.log('parseFloat("0102") = ' + parseFloat('0102')); //102
        console.log('parseFloat("11.00.2") = ' + parseFloat('11.00.2')); //11

        //3---强制类型转换
        //3.1---Boolean(value)---把给定的值转换成Boolean型
        console.log('Boolean("") = ' + Boolean('')); //false
        console.log('Boolean(0) = ' + Boolean(0)); //false
        console.log('Boolean(undefined) = ' + Boolean(undefined)); //false
        console.log('Boolean(null) = ' + Boolean(null)); //false
        console.log('Boolean([]) = ' + Boolean([])); //true
        console.log('Boolean({}) = ' + Boolean({})); //true
        //3.2---Number(value)---把给定的值转换成数字（可以是整数或浮点数）
        //当value是String类型时，如果字符串值能被完整地转换，Number()将判断是调用parseInt()还是parseFloat()，否则返回NaN
        console.log('Number(false) = ' + Number(false)); //0
        console.log('Number(true) = ' + Number(true)); //1
        console.log('Number(undefined) = ' + Number(undefined)); //NaN
        console.log('Number(null) = ' + Number(null)); //0
        console.log('Number({}) = ' + Number({})); //NaN
        console.log('Number(12) = ' + Number('12')); //12
        console.log('Number("1.0") = ' + Number('1.0')); //1
        console.log('Number("1.1") = ' + Number('1.1')); //1.1
        console.log('Number("1.0.3") = ' + Number('1.0.3')); //NaN

        //3.3---String(value)---把给定的值转换成字符串
        //执行这种强制类型转换，只需要调用作为参数传递进来的值的toString()方法
        //强制转换成字符串和调用toString()方法的唯一不用之处---对null和undefined值强制类型转换可以生成字符串而不引发错误
        console.log('String(null) = ' + String(null)); //null
        console.log('String(undefined) = ' + String(undefined)); //undefined

    },

    // start () {

    // },

    // update (dt) {},
});