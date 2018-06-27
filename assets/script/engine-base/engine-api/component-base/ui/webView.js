cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //---cc.WebView
        //用于在游戏中显示网页

        //---webView.url
        //指定WebView加载的网址（String）---它应该是一个http或者https开头的字符串

    },

    //---webView.webviewLoadedEvents
    //WebView的回调事件，当网页加载过程中，加载完成后，加载出错时都会调用此函数
    onWebViewLoaded: function (sender, eventType) {
        //---网页视图事件类型（Enum）
        //加载完成---cc.WebView.EventType.LOADED
        //加载中---cc.WebView.EventType.LOADING
        //加载出错---cc.WebView.EventType.ERROR
        if (eventType === cc.WebView.EventType.LOADED) {
            console.log('is loaded!');
        } else if (event === cc.WebView.EventType.LOADING) {
            console.log('is loading!');
        } else if (event === cc.WebView.EventType.ERROR) {
            console.log('load error!');
        }
    }

    // start() {},

    // update (dt) {}
});