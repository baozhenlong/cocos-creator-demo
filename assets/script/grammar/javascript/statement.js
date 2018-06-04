cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---if语句---条件可以是任意表达式
        var i = 5;
        if (i > 10) {
            console.log('i is greater than 10');
        } else if (i < 0) {
            console.log('i is less than 10');
        } else {
            console.log('i is between 0 and 10'); //i
        }

        //---do-while语句---先执行循环体中的代码，再测试条件
        var i = 0;
        do {
            i++;
        } while (i < 5);
        console.log('do while i = ' + i); //5

        //---while语句---先测试条件，再选择是否执行循环体中的代码
        var i = 0;
        while (i < 5) {
            i++;
        }
        console.log('while i = ' + i); //5

        //---for语句---先测试条件，再选择是否执行循环体中的代码
        //var i = 0;---可选，初始化表达式
        //i < 3;---可选，控制表达式
        //i++;---可选，循环后表达式
        //for(;;){}---无限循环
        for (var i = 0; i < 3; i++) {
            console.log('for i = ' + i); //0,1,2
        }

        //---break和continue跳转语句
        //break---退出循环，执行循环后面的语句
        //continue---退出本次循环，继续下一次循环

        //---switch语句
        var i = 5;
        switch (i) { //对（表达式）求值
            //如果case === 表达式值，则执行后面语句，每个case可以返回一个布尔值
            //case值可以是---常量，变量，表达式
            //如果省略break，执行完当前case后，继续执行下一个case
            case 4:
                console.log('4');
            case 5:
                console.log('5'); //5
            case 6:
                console.log('6'); //6
                break;
            case 7:
                console.log('');
            default:
                break;
        }
    },

    // start () {

    // },

    // update (dt) {},
});