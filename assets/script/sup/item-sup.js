cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    init: function(uiJs, parentNode, data, index) {
        console.log('------item-sup init');
        console.log('data = ' + JSON.stringify(data));
        console.log('index = ' + index);
        this.uiJs = uiJs;
        this.parentNode = parentNode;
        this.data = data;
        this.index = index;
    }

    // start () {

    // },

    // update (dt) {},
});