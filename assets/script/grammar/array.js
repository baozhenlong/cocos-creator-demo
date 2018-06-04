cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---判断数组不能为空
        // if (arr === undefined || arr.length === 0) {
        //     //数组不存在或为空
        // }

        //---遍历数组
        //1---传统for循环
        var arr = [1, , '', undefined, 3]
        for (let i = 0; i < arr.length; i++) {
            console.log('value = ' + arr[i]); //1,undefined,"",undefined,3
        }
        //2---for-of---直接遍历出值，避免下标索引的影响
        for (let value of arr) {
            console.log('value = ' + value); //1,undefined,"",undefined,3                        
        }
        //3---for-in---对象的属性名遍历；把数组的索引作为键；跳过未为初始化或已删除的项（不包括初始化为undefined的项）
        for (let i in arr) {
            console.log('value = ' + arr[i]); //1,"",undefined,3            
        }
        //4---forEach(callback(currentValue, index, array){do something}, this)---按升序为数组中含有效值的每一项执行一次callback函数，跳过已删除或未初始化的项（不包括那些值为undefined的项）
        //参数callback（Function）---为数组中每个元素执行的函数，该函数接受3个参数
        //callback参数currentValue---数组当前项的值
        //callback参数index---数组当前项的索引
        //callback参数array---数组对象本身
        //可选参数this---当执行回调函数时，用作this的值（参考对象）
        console.log('arr = ' + JSON.stringify(arr)); //[1,null,"",null,3]        
        //传this
        arr.forEach(function (value, index, array) {
            console.log('value = ' + value); //1,"",undefined,3
            console.log('index = ' + index); //0,2,3,4
            // console.log('array = ' + JSON.stringify(array)); //[1,null,"",null,3]
            // console.log('this name = ' + this.name); //array<array>
        }, this);
        //不传this
        arr.forEach(function (value, index, array) {
            console.log('this = ' + this); //undefined
        });

        //---Array.join(separator)---把数组中的所有元素放入一个字符串；元素是通过指定的分隔符进行分隔的
        //参数Array（Array）---数组
        //参数separator（String）---分隔符；默认为','
        //返回值（String）---返回一个字符串；该字符串是通过把Array的每个元素转换为字符串，
        //然后把这些字符串连接起来，在2个元素之间插入separator字符串而生成的
        var arrJoin = ['hi', 1, 'hello'];
        console.log('arrJoin.join() = ' + arrJoin.join()); //hi,1,hello
        console.log("arrJoin.join('|') = " + arrJoin.join('|')); //hi|1|hello

        //---Array.map(function(currentValue, index, arr), thisValue)---按照原始数组元素的顺序依次处理元素
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

        //---push()和pop()使用数组提供的先进后出栈的功能
        //1---Array.push(ele1, ele2, ..., eleX)---向数组的末尾添加一个或多个元素，并返回新的长度；直接修改原有的数组
        //参数ele1---要添加到数组的第一个参数
        //可选参数ele2，eleX---要添加到数组末尾的多个元素
        //返回值---数组的新长度
        var arrPush = [1];
        arrPush.push(2);
        console.log('arrPush = ' + arrPush); //1,2       
        var pushLen = arrPush.push(3, 4, 5);
        console.log('arrPush = ' + arrPush); //1,2,3,4,5
        console.log('pushLen = ' + pushLen); //5
        //2---Array.pop()---删除并返回数组的最后一个元素；直接修改原有的数组
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
        //1---unshift(ele1, ele2, ..., eleX)---向数组的开头添加一个或多个元素，并返回新的长度；直接修改原有的数组
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
        //2---Array.shift()---删除数组的第一个元素，并返回第一个元素的值；直接修改原有的数组
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

        //---Array.indexOf(searchElement, fromIndex = 0)---查找数组元素的位置
        //参数searchElement---要查找的元素
        //参数fromIndex---开始查找的位置；可以通过给fromIndex赋值findIndex+1来查找所有元素
        //fromIndex---1---如果该索引值>=数组长度，意味着不会在数组里查找，返回-1
        //fromIndex---2---如果该索引值是一个负值，则将其作为数组末尾的一个抵消，即-1（-2）表示从最后一（倒数第2）个元素开始查找；如果抵消后的索引值仍<0，则整个数组都将会被查询
        //返回值---给定元素的第一个索引，如果不存在，则返回-1
        //查找顺序---从前向后查询数组
        var arrIndexOf = [2, 5, 9];
        console.log('arrIndexOf.indexOf(2) = ' + arrIndexOf.indexOf(2)); //0
        console.log('arrIndexOf.indexOf(3) = ' + arrIndexOf.indexOf(3)); //-1
        console.log('arrIndexOf.indexOf(9, 2) = ' + arrIndexOf.indexOf(9, 2)); //2
        console.log('arrIndexOf.indexOf(2, -1) = ' + arrIndexOf.indexOf(2, -1)); //-1
        console.log('arrIndexOf.indexOf(2, -3) = ' + arrIndexOf.indexOf(2, -3)); //0
        console.log('arrIndexOf.indexOf(2, -7) = ' + arrIndexOf.indexOf(2, -7)); //0

        //---添加/删除数组元素
        //1---delete---删除元素
        var arr = [1, 2, 3, 4];
        console.log('arr = ' + arr);
        delete arr[0];
        console.log('delete arr[0] === undefined' + (arr[0] === undefined)); //true
        //2---Array.splice(index, howmany, item1, ..., itemX)---从数组中添加/删除项目，然后返回被删除的项目
        //参数index---规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
        //参数howmany---要删除的项目数量；如果设置为0，则不会删除项目；
        //可选参数item---向数组添加的新项目
        //返回值---包含被删除项目的新数组，否则返回空数组
        var arr = [1, 2, 3, 4];
        //howmany设置为0，不会删除项目
        var arrSplice = arr.splice(0, 0, 5);
        console.log('arrSplice = ' + JSON.stringify(arrSplice)); //[]
        console.log('arr = ' + arr); //5,1,2,3,4
        arrSplice = arr.splice(1, 3, 8, 9);
        console.log('arrSplice = ' + arrSplice); //1,2,3
        console.log('arr = ' + arr); //5,8,9,4
        //省略howmany和item，删除从index到原数组结尾的所有元素
        arrSplice = arr.splice(1);
        console.log('arrSplice = ' + arrSplice); //8,9,4
        console.log('arr = ' + arr); //5


    },

    // start () {

    // },

    // update (dt) {},
});