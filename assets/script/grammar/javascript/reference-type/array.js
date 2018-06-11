cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        //---数组---一组值的有序列表，大小可动态调整，类型不限；同时还提供了操作和转换这些值的功能

        //---创建数组的方式
        //1---使用new + 构造函数
        //1.1---Array()
        //返回值---空数组，length字段为0
        var arr = new Array();
        console.log(arr.length); //0
        //1.2---Array(size)   
        //参数size---期望的数组元素个数
        //返回值---具有指定个数，元素为undefined的数组
        var arr = new Array(2);
        console.log(arr[0] === undefined); //true
        //1.3---Array(element0, element1, ..., elementn)
        //参数列表element---用来初始化数组元素的值，数组的length字段 = 参数的个数
        //返回值---数组元素为参数指定的值的数组
        var arr = new Array(1, 2, 3);
        console.log(arr); //[1, 2, 3]
        //1.4---当把构造函数作为函数调用，不使用new运算符时，它的行为与使用new运算符调用它时的行为完全一样
        var arr = Array(1, 2, 3);
        console.log(arr); //[1, 2, 3]
        //2---使用数组字面量表示法
        var arr = []; //空数组
        var arr = [1, 2, 3];
        console.log(arr); //[1, 2, 3]        
        var arr = [, 1, , 3, ];
        console.log(arr[0] === undefined); //true
        console.log(arr[2] === undefined); //true
        console.log(arr[4] === undefined); //true
        console.log(arr.length); //4      

        //---读取和设置数组
        var arr = ['red', 'green'];
        console.log(arr[0]); //red---显示第一项
        arr[1] = 'white'; //修改第二项
        console.log(arr[1]); //white
        arr[3] = 'black'; //新增第4项
        console.log(arr[2] === undefined); //true
        console.log(arr); //["red", "white", undefined, "black"]

        //---数组的length属性---始终返回>=0的数；可以通过设置length属性，从数组末尾移除项或向数组添加项
        var arr = [1, 2, 3, 4];
        arr.length = 2; //移除项
        console.log(arr); //[1, 2]
        arr.length = 3; //添加项
        console.log(arr); //[1, 2, undefined]        
        arr[arr.length] = 6; //向数组末尾添加项
        console.log(arr[arr.length - 1]); //6---访问数组的最后一项

        //---判断数组不能为空
        // if (arr === undefined || arr.length === 0) {
        //     //数组不存在或为空
        // }

        //---检测数组---确定某个值是不是数组
        //Array.isArray(value)
        console.log(Array.isArray(arr)); //true

        //---遍历数组
        console.log('\n------遍历数组');
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
        //4---arr.forEach(callback(currentValue, index, array){do something}, this)---按升序为数组中含有效值的每一项执行一次callback函数，跳过已删除或未初始化的项（不包括那些值为undefined的项）
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

        //---转换方法
        console.log('\n------转换方法');
        //arr.join(separator)---把数组中的所有元素放入一个字符串；元素是通过指定的分隔符进行分隔的
        //参数Array（Array）---数组
        //参数separator（String）---分隔符；默认为','
        //返回值（String）---返回一个字符串；该字符串是通过把Array的每个元素转换为字符串，
        //然后把这些字符串连接起来，在2个元素之间插入separator字符串而生成的
        var arrJoin = ['hi', 1, 'hello'];
        console.log('arrJoin.join() = ' + arrJoin.join()); //hi,1,hello
        console.log("arrJoin.join('|') = " + arrJoin.join('|')); //hi|1|hello

        //---重排序方法
        console.log('\n------重排序方法');
        //1---arr.sort(func)---对数组排序
        //可选参数func（Function）---比较函数，规定排序顺序
        //返回值---对数组的引用，数组在原数组上进行排序，不生成副本
        //1.1---sort()---按照升序排列数组项：最小值位于最前面，最大值位于最后面
        //调用每个数组项的toString方法，然后比较得到的字符串，以确定如何排序
        var arr = [0, 1, 5, 10, 15];
        console.log(arr.sort()); //[0, 1, 10, 15, 5]
        //1.2---sort(func)
        //升序排列
        //比较函数---比较2个值，返回用于说明这2个值的相对顺序的数字
        function compare(value1, value2) {
            if (value1 < value2) {
                return -1; //value1 应该位于value2之前， 返回负数
            } else if (value1 > value2) {
                return 1; //value1 应该位于value2之后， 返回正数
            } else {
                return 0;
            }
        }
        var arr = [0, 1, 5, 10, 15];
        console.log(arr.sort(compare)); //[0, 1, 5, 10, 15]
        //对于数值类型或者其valueof方法会返回数值类型的对象类型，可以使用简单的比较函数，实现升序排列
        function compare(value1, value2) {
            return value1 - value2;
        }
        var arr = [0, 1, 5, 10, 15];
        console.log(arr.sort(compare)); //[0, 1, 5, 10, 15]
        //2---arr.reverse()---反转数组原来的顺序
        //返回值---对数组的引用，数组在原数组上进行排序，不生成副本
        console.log(arr.reverse()); //[15, 10, 5, 1, 0]

        //---添加/删除数组元素方法
        console.log('\n------添加/删除数组元素方法');
        //1---push()和pop()
        //1.1---arr.push(ele1, ele2, ..., eleX)---向数组的末尾添加一个或多个元素，并返回新的长度；直接修改原有的数组
        //参数ele1---要添加到数组的第一个参数
        //可选参数ele2，eleX---要添加到数组末尾的多个元素
        //返回值---数组的新长度
        var arrPush = [1];
        arrPush.push(2);
        console.log('arrPush = ' + arrPush); //1,2       
        var pushLen = arrPush.push(3, 4, 5);
        console.log('arrPush = ' + arrPush); //1,2,3,4,5
        console.log('pushLen = ' + pushLen); //5
        //1.2---arr.pop()---删除并返回数组的最后一个元素，减少数组的length；直接修改原有的数组
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
        //2---unshift()和shift()
        //2.1---unshift(ele1, ele2, ..., eleX)---向数组的开头添加一个或多个元素，并返回新的长度；直接修改原有的数组
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
        //2.2---arr.shift()---删除数组的第一个元素，并返回第一个元素的值，同时将length-1；直接修改原有的数组
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
        //3---delete---删除元素
        var arr = [1, 2, 3, 4];
        console.log('arr = ' + arr);
        delete arr[0];
        console.log('delete arr[0] === undefined' + (arr[0] === undefined)); //true
        //4---arr.splice(index, howmany, item1, ..., itemX)---从数组中添加/删除项目，然后返回被删除的项目
        //参数index---规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
        //参数howmany---要删除的项目数量；如果设置为0，则不会删除项目；
        //可选参数item---向数组添加的新项目
        //返回值---包含被删除项目的新数组，否则返回空数组
        var arr = [1, 2, 3, 4];
        //howmany设置为0，不会删除项目
        var arrSplice = arr.splice(0, 0, 5);
        console.log(arrSplice); //[]
        console.log('arr = ' + arr); //5,1,2,3,4
        arrSplice = arr.splice(1, 3, 8, 9);
        console.log(arrSplice); //1,2,3
        console.log('arr = ' + arr); //5,8,9,4
        //省略howmany和item，删除从index到原数组结尾的所有元素
        arrSplice = arr.splice(1);
        console.log(arrSplice); //8,9,4
        console.log('arr = ' + arr); //5

        //---基于数组，创建一个新数组
        console.log('\n------基于数组，创建一个新数组');
        //1---arr.concat(arrX, arrX, ... arrX)---基于数组的所有项创建一个新数组，操作的是数组中的元素
        //可选参数arrX---可以是具体的值，也可以是数组对象
        //返回值---被连接数组的一个副本，不会改变现有的数组
        var arr = [1, 2, 3];
        var newArr = arr.concat(); //复制当前数组，并返回副本
        console.log(newArr); //[1, 2, 3]
        var newArr = arr.concat(4, [5, 6]);
        console.log(newArr); //[1, 2, 3, 4, 5, 6]
        //2---arr.slice(start, end = arr.lenth)---基于当前数组中的1个或多个项创建一个新数组
        //参数start---规定从何处开始选取；如果是负数，那么它规定从数组尾部开始算起的位置：-1指最后一个元素，-2指倒数第2个元素，以此类推
        //可选参数end（不包括该元素）---规定从何处结束选取；如果是负数，那么它规定从数组尾部开始算起的位置
        //返回值---返回一个新数组，包含从start到end（不包括该元素）的arr中的元素
        var arr = [1, 2, 3, 4, 5];
        var newArr = arr.slice(1);
        console.log(newArr); //[2, 3, 4, 5]
        var newArr = arr.slice(1, arr.length);
        console.log(newArr); //[2, 3, 4, 5]

        //---位置方法
        console.log('\n------位置方法');
        //1---arr.indexOf(searchElement, fromIndex = 0)---从数组的开头开始向后，查找数组元素的位置（使用===）
        //参数searchElement---要查找的元素
        //参数fromIndex---开始查找的位置；可以通过给fromIndex赋值findIndex+1来查找所有元素
        //fromIndex---1---如果该索引值>=数组长度，意味着不会在数组里查找，返回-1
        //fromIndex---2---如果该索引值是一个负值，则将其作为数组末尾的一个抵消，即-1（-2）表示从最后一（倒数第2）个元素开始查找；如果抵消后的索引值仍<0，则整个数组都将会被查询
        //返回值---给定元素的第一个索引，如果不存在，则返回-1
        //查找顺序---从前向后查询数组
        var arrIndexOf = [2, 5, 9];
        console.log(arrIndexOf.indexOf(2)); //0
        console.log(arrIndexOf.indexOf(3)); //-1
        console.log(arrIndexOf.indexOf(9, 2)); //2
        console.log(arrIndexOf.indexOf(2, -1)); //-1
        console.log(arrIndexOf.indexOf(2, -3)); //0
        console.log(arrIndexOf.indexOf(2, -7)); //0
        //2---arr.lastIndexOf(searchElement, fromIndex = 0)---从数组的末尾开始向前，查找数组元素的位置        

        //---迭代方法
        console.log('\n------迭代方法');
        //arr.dieDaiFunc(function(currentValue, index, arr), thisValue)---按照原始数组元素的顺序依次处理元素
        //参数function（Function）---函数，数组中的每个元素都会执行这个函数，不会修改数组
        //函数参数currentValue---当前元素的值
        //函数可选参数index---当前元素的索引值
        //函数可选参数arr---当前元素属于的数组对象
        //可选参数thisValue（Object）---作为该执行回调时使用，传递给函数，用作this的值；如果省略了thisValue，this的值为undefined
        //1---arr.every(function(currentValue, index, arr), thisValue)---检测数组所有元素是否都满足指定条件（由函数提供）
        //返回值---1---false：如果数组中检测到有一项返回false，则返回fasle，且剩余项不会再进行检测
        //返回值---2---true：如果所有项都返回true，则返回true
        var arr = [1, 2, 3, 4, 5];
        var result = arr.every(function (ele) {
            return ele > 2;
        });
        console.log(result); //false
        //2---arr.some(function(currentValue, index, arr), thisValue)---检测数组中的元素是否满足指定条件（由函数提供）
        //返回值---1---true：如果数组中检测到有一项返回true，则返回true，且剩余项不会再进行检测
        //返回值---2---false：如果所有项都返回false，则返回false
        var result = arr.some(function (ele) {
            return ele > 2;
        });
        console.log(result); //true
        //3---arr.filter(function(currentValue, index, arr), thisValue) ---检测数组中满足条件的数组项
        //返回值---返回一个新数组，由返回true的项组成
        var result = arr.filter(function (ele) {
            return ele > 2;
        });
        console.log(result); //[3, 4, 5]
        var result = arr.filter(function (ele) {
            return ele > 5;
        });
        console.log(result); //[]           
        //4---arr.map(function(currentValue, index, arr), thisValue)---用来创建包含的项与另一个数组一一对应的数组
        //返回值---返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
        var result = arr.map(function (ele) {
            return ele + 1;
        }, this);
        console.log(result); //[2, 3, 4, 5, 6]

        //---归并方法
        console.log('\n------归并方法');
        //arr.dieDaiFunc(function(previousValue, currentIndex, arr), initValue)---迭代数组的所有项，然后构建一个最终的返回值
        //参数function（Function）---函数，数组中的每个元素都会执行这个函数，不会修改数组 ；这个函数返回的任何值都会赋值给previousValue      
        //函数参数previousValue---
        //函数参数currentValue---当前元素的值
        //函数可选参数currentIndex---当前元素的索引值
        //函数可选参数arr---当前元素属于的数组对象
        //可选参数initValue---不传时，迭代从第二项开始，pre=arr[0|arr.length-1]，cur=arr[1|arr.length-2]；传入时，迭代从第一项开始，pre=initValue，cur=arr[0|arr.length-1]
        //1---arr.reduce(function(previousValue, currentIndex, arr), initValue)---从数组第一项开始，逐个遍历到最后
        var arr = [1, 2, 3];
        var result = arr.reduce(function (pre, cur, index, arr) {
            console.log('pre = ' + pre);
            console.log('cur = ' + cur);
            console.log('index = ' + index);
            return pre + cur;
        }); //1,2,1|3,3,2
        console.log(result); //6
        var result = arr.reduce(function (pre, cur, index, arr) {
            console.log('pre = ' + pre);
            console.log('cur = ' + cur);
            console.log('index = ' + index);
            return pre + cur;
        }, 10); //10,1,0|11,2,1|13,3,2
        console.log(result); //16
        //2---arr.reduceRight(function(previousValue, currentIndex, arr), initValue)---从数组最后一项开始，向前遍历到第一项

    },

    // start () {

    // },

    // update (dt) {},
});