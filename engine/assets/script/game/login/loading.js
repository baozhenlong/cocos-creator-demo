var PopupMgr = require('popup-mgr');
var AnimMgr = require('anim-mgr');
cc.Class({
    extends: cc.Component,

    properties: {
        sf: cc.SpriteFrame,
        tipNodeList: [cc.Node],
        testNode: cc.Node,
        subNode: cc.Node
    },

    onLoad() {
        console.log('------loading');
        //定义全局对象
        cc.vv = {}; //cc 模块---Cocos引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。
        cc.vv.popupMgr = new PopupMgr();
        cc.vv.animMgr = new AnimMgr();
        var subNodeJsBySup = this.subNode.getComponent('sup');
        var subNodeJsBySub = this.subNode.getComponent('sub');
        console.log('subNodeJsBySub name = ' + subNodeJsBySup.name); //sub<sub>
        console.log('subNodeJsBySub name = ' + subNodeJsBySub.name); //sub<sub>
    },

    onLeftClicked: function () {
        cc.vv.animMgr.playAnim('left-to-right', true);
    },

    onBottomClicked: function () {
        cc.vv.animMgr.playAnim('bottom-to-top', true);
    },

    getSeveralDecimalNum: function (num, decimal) {
        console.log('num = ' + num);
        var pow = Math.pow(10, decimal);
        var newNum = Math.round(num * pow) / pow;
        console.log('newNum = ' + newNum);
        return newNum;
    },

    showLogin: function () {
        this.preLoadSceneList(["hall"], function () {
            //cc.director(sceneName, cb)---通过场景名进行加载场景，加载完之后自动切换运行新场景
            //参数sceneName（String）---场景名，不包含扩展名
            //可选参数cb（Function）---指定场景加载后的回调函数
            cc.director.loadScene("hall");
        });
    },

    //预加载场景
    preLoadSceneList: function (sceneList, cb) {
        console.log("------loading preLoadSceneList");
        var len = sceneList.length;
        var count = 0;
        sceneList.forEach(function (scene) {
            //cc.director.preloadScene(sceneName, cb)---预加载场景
            //参数sceneName（String）---场景名，不包含扩展名
            //可选参数cb（Function）---场景预加载后的回调函数
            cc.director.preloadScene(scene, function () {
                count++;
                if (count == len && cb) {
                    console.log("------loading execute cb");
                    cb();
                }
            });
        });
    },

    showNobel: function () {
        cc.director.loadScene("noble");
    },

    onTestClicked: function () {

    },

    getTruncateStr: function (str, len) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0,
            curCharCode = -1,
            nextCharCode = -1,
            strLength = 0,
            truncateStr = '';
        console.log('str length = ' + str.length);
        for (var i = 0; i < str.length - 1; i++) {
            // console.log('i = ' + i);
            curCharCode = str.charCodeAt(i);
            if (curCharCode >= 0 && curCharCode <= 128) {
                //字母
                realLength += 1;
            } else {
                realLength += 2;
            }
            strLength = i + 1;
            // console.log('realLength = ' + realLength);
            if (realLength === len) {
                console.log('truncate str = ' + str.substr(0, strLength));
                return str.substr(0, strLength);
            }
            if (realLength === len - 1) {
                nextCharCode = str.charCodeAt(i + 1);
                console.log('next is = ' + str[i + 1]);
                if (nextCharCode >= 0 && nextCharCode <= 128) {
                    console.log('truncate str next is letter = ' + str.substr(0, strLength + 1));
                    return str.substr(0, strLength + 1);
                } else {
                    console.log('truncate str next is hanzi = ' + str.substr(0, strLength));
                    return str.substr(0, strLength);
                }
            }
        }
        console.log('truncate str original = ' + str);
        return str;
    },

    // update(dt) {

    // },

    // callFunc: function() {
    //     console.log("param = " + arguments[0]);
    // }

    // start () {

    // },

});