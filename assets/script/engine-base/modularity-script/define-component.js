cc.Class({
    extends: cc.Component,

    properties: {
        introduce: 'defineCompent'
    },

    onLoad() {

    },

    // start () {

    // },

    // update (dt) {},
});
//当在脚本中声明了一个组件，Creator会默认把它导出，其它脚本直接直接require这个模块就能使用这个组件
//module.exports的默认值---当module.exports没有任何定义时，Creator会自动优先将exports设置为脚本中定义的Component