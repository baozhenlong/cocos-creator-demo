cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //1---Date()---返回当天的日期和时间
        var date = new Date();
        console.log('typeof date = ' + (typeof date) + '    date = ' + date);
        //typeof date = object    date = Tue May 22 2018 16:51:32 GMT+0800 (CST)

        //2---Date.getFullYear()---返回一个表示年份的4位数字
        //返回值---是一个四位数，表示包括世纪值在内的完整年份，而不是两位数的缩写形式。
        var year = date.getFullYear();
        console.log('typeof year = ' + (typeof year) + '    year = ' + year);
        //typeof year = number    year = 2018

        //3---Date.getMonth()---返回表示月份的数字
        //返回值--- 0（一月） 到 11（十二月） 之间的一个整数
        var month = date.getMonth() + 1;
        console.log('typeof month = ' + (typeof month) + '    month = ' + month);
        //typeof month = number    month = 5

        //4---Date.getDate()---返回月份的某一天   
        //返回值---是 1 ~ 31 之间的一个整数     
        var day = date.getDate();
        console.log('typeof day = ' + (typeof day) + '    day = ' + day);
        //typeof day = number    day = 22        

        //5---Date.getHours()---返回时间的小时字段   
        //返回值---是 0 （午夜） 到 23 （晚上 11 点）之间的一个整数        
        var hour = date.getHours();
        console.log('typeof hour = ' + (typeof hour) + '    hour = ' + hour);
        //typeof hour = number    hour = 16

        //6---Date.getMinutes()---返回时间的分钟字段   
        //返回值---是 0 ~ 59 之间的一个整数
        var minute = date.getMinutes();
        console.log('typeof minute = ' + (typeof minute) + '    minute = ' + minute);
        //typeof minute = number    minute = 51

        //7---Date.getSeconds()---返回时间的秒 
        //返回值---是 0 ~ 59 之间的一个整数  
        var second = date.getSeconds();
        console.log('typeof second = ' + (typeof second) + '    second = ' + second);
        //typeof second = number    second = 32

        //8---Date.getTime()---返回距 1970 年 1 月 1 日之间的毫秒数 
        //返回值---指定的日期和时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
        var time = date.getTime();
        console.log('typeof time = ' + (typeof time) + '    time = ' + time);
        //typeof time = number    time = 1526979092334


    },

    // start () {

    // },

    // update (dt) {},
});