cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //1---Array.join(separator)---把数组中的所有元素放入一个字符串；元素是通过指定的分隔符进行分隔的
        //参数Array（Array）---数组
        //参数separator（String）---分隔符；默认为','
        //返回值（String）---返回一个字符串；该字符串是通过把Array的每个元素转换为字符串，
        //然后把这些字符串连接起来，在2个元素之间插入separator字符串而生成的
        var arrJoin = ['hi', 1, 'hello'];
        console.log('arrJoin.join() = ' + arrJoin.join()); //hi,1,hello
        console.log("arrJoin.join('|') = " + arrJoin.join('|')); //hi|1|hello

        //2---Array.map(function(currentValue, index, arr), thisValue)---按照原始数组元素的顺序依次处理元素
        //参数function（Function）---函数，数组中的每个元素都会执行这个函数
        //函数参数currentValue---当前元素的值
        //函数可选参数index---当前元素的索引值
        //函数可选参数arr---当前元素属于的数组对象
        //可选参数thisValue（Object）---作为该执行回调时使用，传递给函数，用作this的值；如果省略了thisValue，this的值为undefined
        //返回值---一个新数组，数组中的元素为原始数组元素调用函数处理后的值
        var arrMap = [1, 2, 3];
        var arrMapTemp = arrMap.map(function (ele, index) {
            return ++ele; //2,3,4
        }, this);
        console.log('arrMapTemp = ' + arrMapTemp);
    },

    // start () {

    // },

    // update (dt) {},
});