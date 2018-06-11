cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        //---Object---是一个基础类型，其它所有类型都从Object继承了基本的行为

        //---对象,字符串之间的相互转换
        //1---对象转换为字符串
        var obj = {};
        obj.name = 'object';
        obj.arr = [1, 2, 3];
        var objToStr = JSON.stringify(obj);
        console.log('objToStr = ' + objToStr); //{"name":"object","arr":[1,2,3]}
        //2---字符串转换为对象        
        var strToObj = JSON.parse('{"name":"obj","arr":[1,2,3]}');
        console.log('strToObj.name = ' + strToObj.name); //obj

        //---遍历对象属性
        //1---Object.keys(obj)---以任意顺序遍历一个对象的可枚举属性
        //参数obj（Object）---要返回其枚举自身属性的对象
        //返回值（Array）---一个表示给定对象的所有可枚举属性的字符串数组；这些属性的顺序与手动遍历该对象属性时的一致（for-in）
        //1.1---简单数组
        var arr = ['a', 'b', 'c'];
        console.log(JSON.stringify(Object.keys(arr))); //['0', '1', '2']
        //1.2---属性像数组下标的对象
        var obj = {
            '0': 'a',
            '1': 'b',
            '2': 'c'
        };
        console.log(JSON.stringify(Object.keys(obj))); //['0', '1', '2']
        //1.3---属性随机排序的对象
        var anObj = {
            '100': 'a',
            '2': 'b',
            '7': 'c'
        };
        console.log(JSON.stringify(Object.keys(anObj))); //['2', '7', '100']
        //2---for(var key in obj)---以任意顺序遍历一个对象的可枚举属性
        //key（String）---在每次迭代时，将不同的属性名分配给变量
        //obj（Object）---被迭代枚举其属性的对象
        for (var key in anObj) {
            // console.log('key = ' + key); //2,7,100
        }

        //---合并对象
        //Object.assign(target, source1, ..., sourceX)---将源对象（source）的所有可枚举属性（自身属性），复制到目标对象（target）
        //参数target---目标对象
        //可选参数source---源对象
        var target = {
            a: 1
        };
        //1---只有target参数时，直接返回target参数
        console.log('when only target = ' + JSON.stringify(Object.assign(target))); //{"a":1}
        //2---如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
        var source1 = {
            a: 2,
            b: {
                name: 'b',
                value: 123
            }
        };
        var source2 = {
            a: 3,
        };
        var objAssign = Object.assign(target, source1, source2);
        console.log('when same property = ' + JSON.stringify(objAssign)); //{"a":3,"b":{"name":"b","value":123}}
        //3---实行的是浅拷贝；如果源对象的某个属性的值是对象，那么目标对象拷贝得到是这个对象的引用
        //对于这种嵌套对象，一旦遇到同名属性，处理方法是替换
        source1.a = 111;
        console.log('source1 = ' + JSON.stringify(source1)); //{"a":111,"b":{"name":"b","value":123}}
        console.log('objAssign = ' + JSON.stringify(objAssign)); //{"a":3,"b":{"name":"b","value":123}}
        objAssign.a = 222;
        console.log('source1 = ' + JSON.stringify(source1)); //{"a":111,"b":{"name":"b","value":123}}
        console.log('objAssign = ' + JSON.stringify(objAssign)); //{"a":222,"b":{"name":"b","value":123}}
        objAssign.b.value = 333;
        console.log('source1 = ' + JSON.stringify(source1)); //{"a":111,"b":{"name":"b","value":333}}
        console.log('objAssign = ' + JSON.stringify(objAssign)); //{"a":222,"b":{"name":"b","value":333}}
    },

    // start () {

    // },

    // update (dt) {},
});