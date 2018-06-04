cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---转换成字符串---toString()
        //ECMAScript定义的所有对象（伪对象和真对象）都有toString()方法
        //伪对象---Boolean，Number，String
        //null和undefined没哟toString方法
        //1---对于字符串---该方法返回字符串的一个副本
        //2---对于数值，可以指定传递参数（输出数值的的基数，默认为10）
        //2.1---默认模式---toString()，数字输出是十进制模式
        //2.2---基模式---toString(2 ~ 36)，数字输出可以是不同的基模式

        //---转换成数字---只转换第一个无效字符之前的字符串
        //1---parseInt(string, radix)---解析一个字符串，并返回一个整数
        //参数string（String）---要被解析的字符串
        //可选参数radix---要解析的数字的基数，该值介于2-36之间；省略或其值为0，则会根据string来判断数字的基数
        //返回值---解析后的数字
        //规则---如果字符串的第一个不能被转换为数字，那么parseInt将会返回NaN；如''，','
        //规则---忽略字符串前面的空格，直到找到第一个非空字符（数字字符或符号，小数点不是有效的数字字符）
        //规则---如果第一个字符是数字字符，会继续解析第二个字符直到解析完所有后续字符，或者遇到了一个非数字字符
        console.log('parseInt("") = ' + parseInt('')); //NaN
        console.log('parseInt(".") = ' + parseInt('.')); //NaN        
        console.log('parseInt("s1", 10) = ' + parseInt('s1', 10)); //NaN
        console.log('parseInt(1234, 10) = ' + parseInt(1234, 10)); //1234
        console.log('parseInt({}, 10) = ' + parseInt({}, 10)); //NaN
        //2---parseFloat(string)---解析一个字符串，并返回一个浮点数
        //参数string（String）---要被解析的字符串
        //返回值---解析后的数字
        //规则---如果第一个字符不是数字字符或者负号或者小数点，返回NaN
        //规则---忽略字符串前面的空格，直至找到第一个非空字符
        //规则---第一个出现的小数点是有效字符；该方法会忽略前导零
        //规则---若果第一个字符有效，会继续解析第二个字符直到解析完所有后续字符，或者遇到了一个无效的浮点数数字符
        console.log('parseFloat("") = ' + parseFloat('')); //NaN
        console.log('parseFloat(".") = ' + parseFloat('.')); //NaN    
        console.log('parseFloat("0x") = ' + parseFloat('0x')); //0
        console.log('parseFloat("0102") = ' + parseFloat('0102')); //102
        console.log('parseFloat("11.00.2") = ' + parseFloat('11.00.2')); //11

        //---强制类型转换
        //1---Boolean(value)---把给定的值转换成Boolean型
        console.log('Boolean("") = ' + Boolean('')); //false
        console.log('Boolean(0) = ' + Boolean(0)); //false
        console.log('Boolean(undefined) = ' + Boolean(undefined)); //false
        console.log('Boolean(null) = ' + Boolean(null)); //false
        console.log('Boolean([]) = ' + Boolean([])); //true
        console.log('Boolean({}) = ' + Boolean({})); //true
        //2---Number(value)---把给定的值转换成数字（可以是整数或浮点数）
        //参数value（Any）
        //当value是Boolean值时---0，1
        console.log('Number(false) = ' + Number(false)); //0
        console.log('Number(true) = ' + Number(true)); //1
        //当value是数字值时，只做简单的传入和返回
        //当value是null时---0
        console.log('Number(null) = ' + Number(null)); //0     
        //当value是undefined时---NaN
        console.log('Number(undefined) = ' + Number(undefined)); //NaN
        //当value是String类型时，如果字符串值能被完整地转换，Number()将判断是调用parseInt()还是parseFloat()，否则返回NaN
        console.log('Number("") = ' + Number('')); //0        
        console.log('Number(12) = ' + Number('12')); //12
        console.log('Number("1.0") = ' + Number('1.0')); //1
        console.log('Number("1.1") = ' + Number('1.1')); //1.1
        console.log('Number("1.0.3") = ' + Number('1.0.3')); //NaN
        //当value是对象时，调用对象的valueOf()方法，然后依照前面的规则转换返回的值，如果转换结果是NaN，则调用对象的toString()方法然后再次依照前面的过则转换返回的字符串值
        console.log('Number({}) = ' + Number({})); //NaN

        //3---String(value)---把给定的值转换成字符串
        //执行这种强制类型转换，只需要调用作为参数传递进来的值的toString()方法
        //强制转换成字符串和调用toString()方法的唯一不用之处---对null和undefined值强制类型转换可以生成字符串而不引发错误
        console.log('String(null) = ' + String(null)); //null
        console.log('String(undefined) = ' + String(undefined)); //undefined

    },

    // start () {

    // },

    // update (dt) {},
});