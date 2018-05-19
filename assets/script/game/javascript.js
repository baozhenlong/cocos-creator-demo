cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        this.name = 'javascript';


        //Object
        //1---遍历对象属性
        //1.1---Object.keys(obj)---以任意顺序遍历一个对象的可枚举属性
        //参数obj（Object）---要返回其枚举自身属性的对象
        //返回值（Array）---一个表示给定对象的所有可枚举属性的字符串数组；这些属性的顺序与手动遍历该对象属性时的一致（for-in）
        //1.1.1---简单数组
        var arr = ['a', 'b', 'c'];
        console.log(JSON.stringify(Object.keys(arr))); //['0', '1', '2']
        //1.1.2---属性像数组下标的对象
        var obj = {
            '0': 'a',
            '1': 'b',
            '2': 'c'
        };
        console.log(JSON.stringify(Object.keys(obj))); //['0', '1', '2']
        //1.1.3---属性随机排序的对象
        var anObj = {
            '100': 'a',
            '2': 'b',
            '7': 'c'
        };
        console.log(JSON.stringify(Object.keys(anObj))); //['2', '7', '100']
        //1.2---for(var key in obj)---以任意顺序遍历一个对象的可枚举属性
        //key（String）---在每次迭代时，将不同的属性名分配给变量
        //obj（Object）---被迭代枚举其属性的对象
        for (var key in anObj) {
            // console.log('key = ' + key); //2,7,100
        }


        //Array
        //1---遍历数组
        //1.1---forEach(callback(currentValue, index, array){
        //              do something}, this)---按升序为数组中含有效值的每一项执行一次callback函数，跳过已删除或未初始化的项（不包括那些值为undefined的项）
        //参数callback（Function）---为数组中每个元素执行的函数，该函数接受3个参数
        //参数currentValue---数组当前项的值
        //参数index---数组当前项的索引
        //参数array---数组对象本身
        //可选参数this---当执行回调函数时，用作this的值（参考对象）
        var list = [1, , '', 3];
        console.log('list = ' + JSON.stringify(list)); //[1,null,"",3]        
        //传this
        list.forEach(function(value, index, arr) {
            // console.log('value = ' + value); //1,"",3
            // console.log('index = ' + index); //0,2,3
            // console.log('arr = ' + JSON.stringify(arr)); //[1,null,"",3]
            // console.log('this name = ' + this.name); //javascript
        }, this);
        //不传this
        list.forEach(function(value, index, arr) {
            // console.log('this = ' + this); //undefined
        });
        //1.2---for
        for (let i = 0; i < list.length; i++) {
            // console.log('value = ' + list[i]); //1,undefined,"",3
        }


    },

    // start () {

    // },

    // update (dt) {},
});