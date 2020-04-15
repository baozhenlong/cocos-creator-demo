//场景上都有的模块
var KeyboardSup = require('keyboard-sup');
cc.Class({
    extends: KeyboardSup,

    properties: {

    },

    onLoad() {
        console.log('------scene-sup onLoad');
        this._gameControlJs = cc.find('gameControl').getComponent('game-control');
        this.time = 10;
    },

    registerMsg: function () {
        this._super();
        console.log('------scene-sup registerMsg');
    },

    unregisterMsg: function () {
        this._super();
        console.log('------scene-sup unregisterMsg');
    },

    start() {
        console.log('------scene-sup start');
    },

    onDestroy: function () {
        console.log('------scene-sup onDestroy');
    },

    update(dt) {
        // if (this.time > 0) {
        //     this.time -= dt;
        //     console.log('parseInt(this.time) = ' + parseInt(this.time));
        // } else {
        //     this.time = 10;
        // }
    },
});