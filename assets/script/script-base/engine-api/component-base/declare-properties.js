var directionType = cc.Enum({
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
});
cc.Class({
    extends: cc.Component,

    //声明属性    
    properties: {
        //1---简单声明
        //1.1---当声明的属性为基本JavaScript类型时，可以直接赋予默认值
        height: 20, //typeof number
        type: 'str', //typeof string
        target: null, //typeof object
        loaded: false, //typeof boolean
        //1.2---当声明的属性具备类型时（如：cc.Ndoe，cc.Vec2等），可以在声明处填写他们的构造函数来完成声明
        pos: cc.Vec2,
        //1.3---当声明的属性继承自cc.ValueType时，（如cc.Vec2, cc.Color, cc.Rect）;可以使用构造函数，也可以直接使用实例作为默认值
        color: new cc.Color(255, 255, 255, 128),
        //1.4---当声明属性是一个数组时，可以在声明处填写他们的类型或构造函数来完成声明
        //1.4.1---使用类型
        any: [], //不定义具体类型的数组
        bools: [cc.Boolean],
        strings: [cc.String],
        floats: [cc.Float],
        ints: [cc.Integer],
        //1.4.1---使用构造函数       
        nodes: [cc.Node],

        //2---完整声明---除了以上几种情况，其它类型都需要使用完整声明的方式来进行书写
        //为属性声明添加参数，这些参数控制了属性：在属性检查器中的显示方式和在场景序列化过程中的行为
        score: {
            //属性参数
            //所有属性参数都是可选的，但至少必须声明default、（get，set）参数中的其中一组
            //设置了get以后，这个属性就不能被序列化，也不能指定默认值，但仍然可以附带除了default，serializable外的大部分参数
            //属性参数---1---参数default（Any）---定义属性的默认值
            //用于声明属性的默认值，声明了默认值的属性会被CCClass实现为成员变量，
            //这个默认值仅在组件第一次添加到节点上时才会用到，再次修改默认值时，不会改变已经添加到场景里的组件的当前值
            //强制把所有属性设回默认值---在属性检查器的组件菜单中选择Reset
            //default允许设置为以下几种值类型
            //类型---1---任意number，string，boolean类型值
            //类型---2---null，undefined
            //类型---3---继承自cc.ValueType的子类，如cc.Vec2，cc.Color，cc.Rect的实例化对象
            // default: new cc.Vec2(),
            //类型---4---空数组[]，空对象{}
            //类型---5---允许返回任意类型值的function，这个function会在每次实例化该类时重新调用，并且以返回值作为新的默认值
            // default: function() {
            //     return 'default';
            // },
            // default: 123,
            //属性参数---2---参数visible（boolean）---在属性检查器面板中显示或隐藏
            //默认情况下，是否显示在属性检查器取决于属性名是否以下划线_开头，如果以_开头，则默认不显示在属性检查器，否则默认显示
            visible: true, //设置为false则不在属性检查器面板中显示该属性
            //属性参数---3---参数serializable（boolean）---序列化该属性
            //指定了default默认值的属性默认情况下都会被序列化
            //序列化后就会将编辑器中设置好的值保存到场景等资源文件中，并且在加载场景时自动还原之前设置好的值
            serializable: true, //设置false则不序列化（保存）该属性
            //属性参数---4---参数type（Any）---限定属性的数据类型
            //当default不能提供足够详细的类型信息时，为了能在属性检查器显示正确的输入控件，就要用type显式声明具体的类型
            type: cc.Integer,
            //属性参数---5---参数url（function---自称子cc.RawAsset的构造函数）---该属性为指定资源的url
            //如果属性是用来访问Raw Asset资源的url，为了能在属性检查器中选择资源，或者能正确序列化，需要把type参数指定为url参数
            // url: cc.Texture2D,
            //属性参数---6---参数override（boolean）---当重写父类属性时，需要定义该参数为true
            //所有属性都将被子类继承，如果子类要覆盖父类的同名属性，需要显式设置override参数，否则会有重名警告
            //属性参数---7---displayName（string）---在属性检查器面板中显示为另一个名字
            displayName: '-score-', //在属性检查器面板中显示成指定的名字
            //属性参数---8---tooltip（string）---在属性检查器面板中添加属性的Tooltip
            tooltip: 'tip', //当鼠标移到参数上时，显示对应的Tooltip
            //属性参数---9---get()---只定义get方法，相当于属性只读
            get: function () {
                console.log('------get');
                return this._score;
            },
            //属性参数---10---set(value)
            set: function (value) {
                console.log('------set');
                this._score = value;
            }
        },

        //3---数组声明---数组的default必须设置为[]，如果要在属性检查器中编辑，还需要设置type为构造函数
        names: {
            default: [],
            type: [cc.String] //用type指定数组的每个元素都是字符串类型；type写成数组，提高代码可读性
        },

        _hideId: '_hideId',

        //---使用自定义的类型
        customType: {
            default: directionType.LEFT,
            type: directionType
        }
    },


    onLoad() {
        console.log('_hideId = ' + this._hideId); //_hideId
        console.log('hideId = ' + this.hideId); //undefined
        this.score = 12345; //------set
        console.log('score = ' + this.score); //-----get
    },


    // start () {

    // },

    // update (dt) {},
});