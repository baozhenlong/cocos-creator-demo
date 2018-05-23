cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //1---String.replace(regexp/substr, replacement)---用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
        //参数regexp（RegExp）/substr（String）---规定要替换的模式的RegExp对象或子字符串
        //参数replacement（String）---一个字符串值；规定了替换文本或生成替换文本的函数
        //返回值（String）---一个新的字符串；是用replacement替换了regexp的第一次匹配或所有匹配之后得到的
        //1.1---执行一次第一个匹配替换
        console.log('"visit microsoft".replace() = ' + ('visit microsoft'.replace(/microsoft/, 'cocos')));
        //"visit microsoft".replace() = visit cocos
        //1.2---执行一次全局替换
        console.log('"hi microsoft, hello microsoft".replace() = ' + ('hi microsoft, hello microsoft'.replace(/microsoft/g, 'cocos')));
        //"hi microsoft, hello microsoft".replace() = hi cocos, hello cocos

        //2---String.split(separator, howmany)---把一个字符串分割成字符串数组
        //参数separator（String）---字符串或正则表达式，从该参数指定的地方分割String
        //可选参数howmany（Number）---该参数可指定返回的数组的最大长度
        //设置了howmany参数：返回的子串不会多于这个参数指定的数组
        //没有设置howmany参数：整个字符串都会被分割，不考虑它的长度
        //返回值（Array）---一个字符串数组，该数组是用通过separator指定的边界处将字符串分割成子串创建的，返回的数组中子串不包括separator本身
        //提示---String.split('')---每个字符之间都会被分割
        console.log('"12345".split("") = ' + '12345'.split(''));
        //"12345".split("") = 1,2,3,4,5
        console.log('"12345".split("", 3) = ' + '12345'.split('', 3));
        //"12345".split("", 3) = 1,2,3
        console.log('"2:3:4:5".split(":") = ' + ('2:3:4:5'.split(':')));
        //"2:3:4:5".split(":") = 2,3,4,5
        console.log('"|a|b|c".split("|") = ' + ('|a|b|c'.split('|')));
        //"|a|b|c".split("|") = ,a,b,c
    },

    // start () {

    // },

    // update (dt) {},
});