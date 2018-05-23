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
    },

    // start () {

    // },

    // update (dt) {},
});