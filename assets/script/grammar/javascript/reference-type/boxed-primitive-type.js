cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---基本包装类型---Boolean，Number，String
        //因为基本包装类型，JavaScript中的基本类型值可以被当做对象来访问
        //共同特征---1---每个包装类型都映射到同名的基本类型
        //共同特征---2---在读取模式下访问基本类型值时，就会创建对应的基本包装类型的一个对象，从而方便数据操作
        //共同特征---3---操作基本类型值的语句一经执行完毕，就会立即销毁新创建的包装对象

        //---Boolean对象---与布尔值对应的引用类型，Boolean类型的实例

        //---Number对象---与数字值对应的引用类型，Number类型的实例
        //1---new Number(value)---创建Number对象
        //参数value---要创建的Number对象的数值
        //返回值---将value转换成一个布尔值，并返回一个包含该值的Boolean对象
        var numObj = new Number(10.22);
        //2---valueof()，toLocaleString()，toString()方法
        //valueof()---返回对象表示的基本类型的数值
        //toLocaleString()，toString()返回字符串形式的数值
        //3---numObj.toFixed(num = 0)---把Number四舍五入为指定小数位数的数字
        //可选参数num---规定小数的位数，在[0, 20]之间
        //返回值---numObj的字符串表示
        var result = numObj.toFixed();
        console.log(typeof result); //string
        console.log(result); //10
        console.log(numObj.toFixed(3)); //10.220
        //4---基本类型数值和引用类型数值
        console.log(typeof numObj); //object
        var numValue = 10.22;
        console.log(typeof numValue); //number

        //---String对象---与字符串对应的引用类型，String类型的实例
        //1---创建字符串的对象包装类型
        var strObj = new String('hello');
        //2---valueof()，toLocaleString()，toString()方法
        //都返回对象所表示的基本字符串值
        //3---String类型的每个实例都有一个length属性---表示字符串包含多少个字符
        console.log(strObj.length); //5
        //4---字符方法---用于访问字符串特定位置字符的方法
        //4.1---strObj.charAt(index)---返回指定位置的字符
        //参数index---字符在字符串中的下标，在[0, strObj.length)之间，否则返回一个空字符串        
        //返回值（String）---长度为1的字符串；JavaScript并没有一种有别于字符串类型的字符数据类型
        console.log(strObj.charAt(-1)); //''
        console.log(strObj.charAt(0)); //'h'
        //4.2---strObj.charCodeAt(index)---返回指定位置的字符的Unicode编码
        //参数index---字符在字符串中的下标，在[0, strObj.length)之间，否则返回NaN
        //返回值（Number）---字符的Unicode编码，[0, 65535]的整数
        console.log(strObj.charCodeAt(-1)); //NaN
        console.log(strObj.charCodeAt(0)); //104
        console.log(typeof strObj.charCodeAt(0)); //number
        //5---字符串操作方法
        //5.1---strObj.concat(stringX, stringX, ..., stringX)---用于连接2个或多个字符串
        //参数stringX---将被连接为一个字符串的一个或多个字符串对象
        //返回值---新的字符串，strObj本身并没有改变
        //concat()方法把它的所有参数转换成字符串，然后按顺序连接到字符串strObj的尾部，并返回连接后的字符串
        var str1 = 'hello';
        var str2 = ' world';
        var result = str1.concat(str2);
        console.log(str1); //hello
        console.log(result); //hello world
        var str3 = str1 + str2; //一般使用操作符'+'来拼接多个字符串
        console.log(str3); //hello world
        //5.2---基于一个字符串创建新字符串的方法，返回一个被操作字符串的一个字符串
        //5.2.1---strObj.slice(start, end = strObj.length)---提取字符串的某个部分，并以新的字符串返回被提取的部分
        //参数start（包括start）---要抽取的片断的起始下标；如果是负数，则参数规定的是从字符串的尾部开始算起的位置
        //可选参数end（不包括end）---要抽取的片段的结尾下标；如果是负数，则参数规定的是从字符串的尾部开始算起的位置
        //返回值---一个新的字符串，包括字符串strObj从start（包括）开始到end（不包括）结束为止的所有字符
        var strObj = new String('hi hero');
        console.log(strObj.slice(0, 4)); //'hi h'
        //5.2.2---strObj.substring(start. stop = strObj.length)---提取字符串中介于2个指定下标之间的字符
        //参数start（非负的整数，包括start）---要抽取的片断的起始下标
        //可选参数stop（非负的整数，不包括stop）----要抽取的片段的结尾下标
        //返回值---一个新的字符串，该字符串包含strObj的字符串，其内容从[start, stop -1]处的所有字符，其长度为stop-start
        //如果start === end，那么该方法返回一个空字符串，长度为0的字符串
        //如果start > stop，那么该方法在提取子串之前，会先交换这2个参数
        console.log(strObj.substring(0, 4)); //'hi h'
        //5.2.3---strObj.substr(start, length = strObj.length)---在字符串中抽取从start下标开始的指定数目的字符
        //参数start（包括start）---要抽取的片断的起始下标；如果是负数，则参数规定的是从字符串的尾部开始算起的位置
        //可选参数length（必须是数值）---子串中的字符数
        //返回值---一个新的字符串，包含strObj的start（包括）处开始的length个字符
        console.log(strObj.substr(0, strObj.length)); //'hi hero'
        //5.3---字符串位置方法---从一个字符串中查找给定的字符串，然后返回字符串的位置，如果没找到，则返回-1
        //5.3.1---strObj.indexOf(searchValue, fromIndex = 0)---返回某个指定的字符串值再字符串首次出现的位置
        //参数searchValue---规定需检索的字符串值
        //可选参数fromIndex（整数）---规定在字符串中开始检索的位置，它的合法取值是[0, strObj.length - 1]
        //该方法从头到尾地检索字符串strObj，看它是否含有子串searchvalue
        //返回值---如果找到一个searchValue，则返回searchValue的第一个字符在strObj中的位置；如果没有，则返回-1
        var strObj = new String('hello world');
        console.log(strObj.indexOf('l')); //2
        console.log(strObj.indexOf('l', 6)); //9
        //5.3.2---strObj.lastIndexOf(searchValue, fromIndex = strObj.length - 1)---返回一个指定的字符串最后出现的位置
        //参数searchValue---规定需检索的字符串值
        //可选参数fromIndex（整数）---规定在字符串中开始检索的位置，它的合法取值是[0, strObj.length - 1]
        //该方法从尾到头地检索字符串strObj，看它是否含有子串searchvalue
        //返回值---如果找到一个searchValue，则返回searchValue的第一个字符在strObj中的位置；如果没有，则返回-1
        console.log(strObj.lastIndexOf('l')); //9
        console.log(strObj.lastIndexOf('l', 6)); //3
        //5.3.3---在使用第2个参数的情况下，可以通过循环调用来找到所有匹配的子字符串
        var positions = [];
        var pos = strObj.indexOf('l');
        while (pos !== -1) {
            positions.push(pos);
            pos = strObj.indexOf('l', pos + 1);
        }
        console.log(positions); //[2, 3, 9]
        //5.4---字符串大小写转换方法
        //5.4.1---strObj.toLowerCase()把字符串转换为小写
        //返回值---一个新的字符串，strObj中的所有大写字符全部被转换为了小写字符
        var strObj = new String('HelloWorld');
        var result = strObj.toLowerCase();
        console.log(strObj); //String {"HelloWorld"}
        console.log(result); //helloworld
        //5.4.2---strObj.toUpperCase()把字符串转换为小写
        //返回值---一个新的字符串，strObj中的所有小写字符全部被转换为了大写字符
        console.log(strObj.toUpperCase()); //HELLOWORLD


    },

    // start() {},

    // update (dt) {}
});