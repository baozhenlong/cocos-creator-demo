cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        var {
            name,
            age
        } = {
            name: 'name'
        };
        console.log('name = ' + name); //name
        console.log('age = ' + age); //undefined
        var [param1, param2] = [1];
        console.log('param1 = ' + param1); //1
        console.log('param2 = ' + param2); //undefined
        var [param3, param4] = [3, 4, 5];
        console.log('param3 = ' + param3); //3
        console.log('param4 = ' + param4); //4
    },

    // start () {

    // },

    // update (dt) {},
});