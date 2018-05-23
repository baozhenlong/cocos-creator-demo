var popupSup = require('popup-sup');
cc.Class({
    extends: popupSup,

    properties: {
        tipLb: cc.Label
    },

    onLoad() {

    },

    popup: function(params, openFunc, closeFunc) {
        this._super(params, openFunc, closeFunc);
        this.tip = params[0];
        this.goFunc = params[1];
        this.initUi();
    },

    hide: function() {
        this._super();
    },

    initUi: function() {
        this.tipLb.string = this.tip;
    },

    onCloseClicked: function() {
        this.hide();
    },

    onCancelClicked: function() {
        this.hide();
    },

    onGoClicked: function() {
        this.goFunc();
        this.hide();
    },

    // start () {

    // },

    // update (dt) {},
});