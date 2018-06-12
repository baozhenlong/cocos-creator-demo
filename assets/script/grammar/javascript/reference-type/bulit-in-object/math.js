cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---Math对象---用于执行数学任务

        //---Math.abs(x)---返回数的绝对值
        //参数x（Number）---一个数值
        //返回值---x的绝对值
        console.log('Math.abs(-1.1) = ' + Math.abs(-1.1)); //1.1
        console.log('Math.abs(-1.1) = ' + Math.abs(1.1)); //1.1

        //---将小数舍入为整数
        //1---Math.ceil(x)---对一个数进行向上舍入
        //返回值---大于等于x，并且与它最接近的整数
        console.log('Math.ceil(-1.1) = ' + Math.ceil(-1.1)); //-1
        console.log('Math.ceil(1.1) = ' + Math.ceil(1.1)); //2
        //2---Math.floor(x)---对一个数进行向下舍入
        //返回值---小于等于x，并且与x最接近的整数
        console.log('Math.floor(-1.8) = ' + Math.floor(-1.8)); //-2
        console.log('Math.floor(1.8) = ' + Math.floor(1.8)); //1
        //3---Math.round(x)---对一个数字进行标准舍入，四舍五入为最接近的整数
        //返回值---与x最接近的整数
        console.log('Math.round(0.5) = ' + Math.round(0.5)); //1
        console.log('Math.round(-0.4) = ' + Math.round(-0.4)); //0

        //---返回最大值或最小值
        //1---Math.max(x...)---返回指定的数字中的最大值
        //参数x...---0个或多个值
        //返回值---参数中最大的值；如果没有参数，则返回-Infinity；如果有某个参数为NaN，或是不能转换成数字的非数字值，则返回NaN
        console.log('Math.max() = ' + Math.max()); //-Infinity
        console.log('Math.max(1, NaN) = ' + Math.max(1, NaN)); //NaN
        console.log('Math.max(1, 2, 3) = ' + Math.max(1, 2, 3)); //3
        //例子---经常用于避免多余的循环和if语句中确定一组数的最大值
        var values = [1, 2, 3];
        console.log(Math.max.apply(Math, values)); //3
        //2---Math.min(x...)---返回指定的数字中的最小值
        //参数x...---0个或多个值
        //返回值---参数中最小的值；如果没有参数，则返回Infinity；如果有某个参数为NaN，或是不能转换成数字的非数字值，则返回NaN
        console.log('Math.min() = ' + Math.min()); //Infinity
        console.log('Math.min(1, NaN) = ' + Math.min(1, NaN)); //NaN
        console.log('Math.min(1, 2, 3) = ' + Math.min(1, 2, 3)); //1

        //---Math.pow(x, y)---返回x的y次幂的值
        //参数x（Number）---底数
        //参数y（Number）---幂数
        //返回值---x的y次幂
        console.log('Math.pow(0, 0) = ' + Math.pow(0, 0)); //1
        console.log('Math.pow(0, 1) = ' + Math.pow(0, 1)); //0

        //---Math.random()---返回介于[0~1)之间的一个随机数
        //返回值---[0.0~1.0)之间的一个伪随机数
        console.log('Math.random() = ' + Math.random()); //0.3373981356464022
        //例子---从某个整数范围内随机选择一个值
        function selectFrom(minNum, maxNum) {
            var choices = maxNum - minNum; //可能值的总数
            return Math.floor(Math.random() * choices + minNum);
        }



    },

    // start () {

    // },

    // update (dt) {},
});