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

    init: function(bagUiJs, data, index) {
        this.bagUiJs = bagUiJs;
        this.data = data;
        this.nameLb.string = data.name;
        this.index = index;
    },

    registerTouchEvent: function() {
        this._super();
    },

    unregisterTouchEvent: function() {
        this._super();
    },

    touchHandle: function(event) {
        // console.log('------sub touchHandle');
        this.bagUiJs.updateCheckMark(this.index);
        this.bagUiJs.updateDetailUi(this.data.name, this.data.detail, this.data.use);
    },

    // start () {

    // },

    // update (dt) {},
});