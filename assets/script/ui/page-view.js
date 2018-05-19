//页面视图每个页面的大小类型
var SizeMode = cc.Enum({
    Unified: 0, //统一大小
    Free: 1 //随意大小
});
//页面视图的滚动类型
var Direction = cc.Enum({
    Horizontal: 0, //水平
    Vertical: 1 //垂直
});
//页面视图组件
var PageView = cc.Class({
    extends: cc.ScrollView,

    ctor: function() {
        this._curPageIndex = 0;
        this._lastPageIndex = 0;
        this._pageList = [];
        this._scrollCenterOffsetX = 0; //每一个页面居中时，需要的偏移量X
        this._scrollCenterOffsetY = 0; //每一个页面居中时，需要的偏移量Y      
    },

    properties: {
        //内容节点
        content: {
            default: null,
            tyep: cc.Node,
            override: true
        },
        //页面大小类型
        sizeMode: {
            default: SizeMode.Unified,
            type: SizeMode
        },
        //视图滚动类型
        direction: {
            default: Direction.Horizontal,
            type: Direction
        },
        //滚动临界值---默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原
        scrollThreshold: {
            default: 0.5,
            type: cc.Float
        },
        //快速滑动翻页临界值---当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值
        autoPageTurningThreshold: {
            default: 100,
            type: cc.Float
        },
        //每个页面翻页时所需的时间，单位秒
        pageTurningSpeed: {
            default: 0.3,
            type: cc.Float
        }
    },


    onLoad() {

    },

    //返回视图中的所有页面
    getPageList: function() {
        return this._pageList;
    },

    //返回当前页面索引
    getCurPageIndex: function() {
        return this._curPageIndex;
    },

    //设置当前页面索引
    setCurPageIndex: function(index) {
        this.scrollToPage(index, true);
    },

    //在当前页面视图的尾部插入一个新视图
    addPage: function(page) {
        if (!page || this._pageList.indexOf(page) !== -1) {
            return;
        }
        this.content.addChild(page);
        this._pageList.push(page);
        this._updatePageView();
    },

    //将页面插入指定位置
    insertPage: function(page, index) {
        if (index < 0 || this._pageList.indexOf(page) !== -1) {
            return;
        }
        var pageCount = this._pageList.length;
        if (index >= pageCount) {
            this.addPage(page);
        } else {
            this._pageList.splice(index, 0, page);
            this.content.addChild(page);
            this._updatePageView();
        }
    },

    //移除指定页面
    removePage: function(page) {
        if (!page) {
            return;
        }
        var index = this._pageList.indexOf(page);
        if (index === -1) {
            return;
        }
        this.removePageAtIndex(index);
    },

    //移除指定下标的页面
    removePageAtIndex: function(index) {
        var pageList = this._pageList;
        if (index < 0 || index >= pageList.length) {
            return;
        }
        var page = pageList[index];
        if (!page) {
            return
        }
        this.content.removeChild(Page);
        pageList.splice(index, 1);
        this._updatePageView();
    },

    //移除所有页面
    removeAllPage: function() {
        var pageList = this._pageList;
        for (var i = 0; i < pageList.length; i++) {
            this.content.removeChild(pageList[i]);
        }
        this._pageList.length = 0;
        this._updatePageView();
    },

    //滚动到指定页面
    scrollToPage: function(index, timeInSecond) {
        if (index < 0 || index > this._pageList.length) {
            return;
        }
        timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
        this._curPageIndex = index;
        this.scrollToOffset(this._moveOffsetValue(index), timeInSecond, true);
    },

    //刷新页面视图
    _updatePageView: function() {
        var pageCount = this._pageList.length;
        if (this._curPageIndex >= pageCount) {
            this._curPageIndex = pageCount === 0 ? 0 : pageCount - 1;
            this._lastPageIndex = this._curPageIndex;
        }
        //进行排序
        for (var i = 0; i < pageCount; i++) {
            this._pageList[i].setSiblingIndex(i);
            if (this.direction === Direction.Horizontal) {
                this._scrollCenterOffsetX[i] = Math.abs(this.content.x + this._pageList[i].x);
            } else {
                this._scrollCenterOffsetY[i] = Math.abs(this.content.y + this._pageList[i].y);
            }
        }
        //当页面数组变化时修改content的大小
    },

    //通过index获取偏移值数值
    _moveOffsetValue: function(index) {
        var offset = cc.p(0, 0);
    }



    // start () {

    // },

    // update (dt) {},
});