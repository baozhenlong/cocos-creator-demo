cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---this---函数的上下文
        //在function内部被创建
        //指向被调函数所绑定的对象或构造函数的实例
        //this不能被赋值，但可以被call/apply改变

        //---this和构造函数
        function Person(content) {
            this.content = content;
        }
        Person.prototype.getContent = function () {
            return this.content;
        };
        var person = new Person('person');
        console.log(person.getContent()); //person
        console.log(this.content); //undefined---这里的this表示这个组件
        //按照JavaScript的习惯，this应该挂属性/字段，方法都应该放在原型上

        //---this和对象
        var obj = {
            content: 'obj',
            getContent: function () {
                return this.content; //这里的this表示obj
            }
        };
        console.log(obj.getContent()); //obj

        //---this和函数
        function showMsg() {
            console.log(this.msg);
        }
        var m = {
            msg: 'msg'
        };
        showMsg.call(m); //msg

    },

    // start() {},

    // update (dt) {}
});