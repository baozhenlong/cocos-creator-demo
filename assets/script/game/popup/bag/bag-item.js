var ToggleSup = require('toggle-sup');
cc.Class({
    extends: ToggleSup,

    properties: {
        nameLb: cc.Label,
    },

    onLoad() {
        this.checkMarkNode.active = this.isChecked;
        this.registerTouchEvent();
    },

    onDestroy: function() {
        this.unregisterTouchEvent();
    },

    init: function(uiJs, parentNode, data, index) {
        console.log('------bag-item init');
        this._super(uiJs, parentNode, data, index);
        this.nameLb.string = data.name;
        if (index === 0) {
            this.setCheck(true);
        }
    },

    touchHandle: function() {
        console.log('------bag touchHandle');
        this._super();
        this.uiJs.updateDetailUi(this.data.name, this.data.detail, this.data.use);
    },

    // start () {

    // },

    // update (dt) {},
});