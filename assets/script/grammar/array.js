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

        //3---push()和pop()使用数组提供的先进后出栈的功能
        //3.1---Array.push(ele1, ele2, ..., eleX)---向数组的末尾添加一个或多个元素，并返回新的长度；直接修改原有的数组
        //参数ele1---要添加到数组的第一个参数
        //可选参数ele2，eleX---要添加到数组末尾的多个元素
        //返回值---数组的新长度
        var arrPush = [1];
        arrPush.push(2);
        console.log('arrPush = ' + arrPush); //1,2       
        var pushLen = arrPush.push(3, 4, 5);
        console.log('arrPush = ' + arrPush); //1,2,3,4,5
        console.log('pushLen = ' + pushLen); //5
        //3.2---Array.pop()---删除并返回数组的最后一个元素；直接修改原有的数组
        //返回值---数组的最后一个元素
        //如果数组是空的，那么pop()方法将不进行任何操作，返回undefined值 
        var arrPop = [];
        var popTempEle = arrPop.pop();
        console.log('popTempEle = ' + popTempEle); //undefined
        console.log('arrPop = ' + JSON.stringify(arrPop)); //[]
        arrPop.push(1, 2, 3);
        var popEle = arrPop.pop();
        console.log('popEle = ' + popEle); //3
        console.log('arrPop = ' + arrPop); //1,2

        //---unshift()和shift()
        //4.1---unshift(ele1, ele2, ..., eleX)---向数组的开头添加一个或多个元素，并返回新的长度；直接修改原有的数组
        //参数ele1---要添加到数组的第一个参数
        //可选参数ele2，eleX---要添加到数组开头的多个元素
        //返回值---数组的新长度
        //该方法把参数插入到数组的头部，并将已经存在的元素顺次的移到较高的下标处
        var arrUnshift = [1];
        arrUnshift.unshift(2);
        console.log('arrUnshift = ' + arrUnshift); //2,1  
        var unshiftLen = arrUnshift.unshift(3, 4);
        console.log('arrUnshift = ' + arrUnshift); //3,4,2,1
        console.log('unshiftLen = ' + unshiftLen); //4       
        //4.2---Array.shift()---删除数组的第一个元素，并返回第一个元素的值；直接修改原有的数组
        //返回值---数组原来的第一个元素的值
        //如果数组是空的，那么shift()方法将不进行任何操作，返回undefined值
        var arrShift = [];
        var shiftTempEle = arrShift.shift();
        console.log('shiftTempEle = ' + shiftTempEle); //undefined
        console.log('arrShift = ' + JSON.stringify(arrShift)); //[]
        arrShift.push(1, 2, 3);
        var shiftEle = arrShift.shift();
        console.log('shiftEle = ' + shiftEle); //1
        console.log('arrShift = ' + arrShift); //2,3
    },

    // start () {

    // },

    // update (dt) {},
});