cc.Class({
    extends: cc.Component,

    properties: {
        pageView: cc.PageView,
        curNum: 1,
        totalNum: 5,
        pageTemplate: cc.Prefab
    },

    onLoad() {
        //---cc.PageView

        //---pageView.sizeMode
        //页面视图中每个页面大小类型（Enum）
        //统一大小---cc.PageView.SizeMode.Unified
        //随意大小---cc.PageView.SizeMode.Free

        //---pageView.direction
        //页面视图滚动类型（Enum）
        //水平---cc.PageView.Direction.Horizontal
        //垂直---cc.PageView.Direction.Vertical

        //---pageView.scrollThreshold
        //滚动临界值（Number）---默认单位%，当拖拽超出该数值时，松开会自动滚动下一个，小于时则还原

        //---pageView.autoPageTurningThreshold
        //快速滑动翻页临界值（Number）---当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值，该值与临界值比较，>，则进行自动翻页

        //---pageView.pageTurningEventTiming
        //pageTurning的发送时机（Number）

        //---pageView.indicator
        //页面视图指示器组件
        //1---indicator.spriteFrame
        //每个页面标记显示的图片（SpriteFrame）
        //2---indicator.direction
        //页面标记摆放方向
        //水平---cc.PageViewIndicator.Direction.HORIZONTAL
        //垂直---cc.PageViewIndicator.Direction.VERTICAL
        //3---indicator.cellSize
        //每个页面标记的大小（Size）
        //4---indicator.spacing
        //每个页面标记之间的间距（Number）

        //---pageTurningSpeed
        //翻页所需时间（Number）----单位：秒

        //---pageView.content
        //可滚动展示内容的节点（Node）

        //---pageView.inertia
        //是否开启滚动惯性（Boolean）

        //---pageView.brake
        //刹车（Number）---开启惯性后，在用户停止触摸后滚动多快停止，0-永不停止，1-立刻停止

        //---pageView.elastic
        //回弹（Boolean）---是否允许滚动内容超过边界，并在停止触摸后回弹

        //---pageView.bounceDuration
        //回弹持续时间（Number）---0-立即反弹
    },

    showPage: function (index) {
        //---pageView.setCurrentPageIndex(index)
        //设置当前页面索引
        //参数index（Number）
        this.pageView.setCurrentPageIndex(index);
        //---start
        // pageView.scrollToPage(index, true);
        //---end
    },

    //返回首页
    onJumpHome: function () {
        //---pageView.scrollToPage(index, timeInSecond = 0.3)
        //滚动到指定页面
        //参数index
        //参数timeInSecond---滚动所需事件
        this.pageView.scrollToPage(0);
    },

    //创建页面实例
    createPage: function () {
        var page = cc.instantiate(this.pageTemplate);
        page.position = cc.v2(0, 0);
        //---pageView.getPages()
        //返回视图中的所有页面
        //返回值（[Node]）
        var pages = this.pageView.getPages();
        console.log('own page num = ' + pages.length);
        page.getComponentInChildren(cc.Label).string = pages.length + 1;
        return page;
    },

    //添加页面
    //1---在尾部添加
    onAddPage: function () {
        this.plusPage(() => {
            //---pageView.addPage(page)
            //在当前页面视图的尾部插入一个新视图
            //参数page（Node）
            this.pageView.addPage(this.createPage());
        });
    },
    //2---在当前页添加
    onInsertPage: function () {
        this.plusPage(() => {
            //---pageView.insertPage(page, Index)
            //参数page（Node）
            //参数Index（Number）
            this.pageView.insertPage(this.createPage(), this.pageView.getCurrentPageIndex());
        });
    },
    plusPage: function (callback) {
        if (this.curNum >= this.totalNum) {
            return;
        }
        this.curNum++;
        if (callback) {
            callback();
        }
    },

    //减少页面
    //1---移除最后一个页面
    onRemovePage: function () {
        this.lessPage(() => {
            //---pageView.removePage(page)
            //移除指定页面
            //参数page（Node）
            var pages = this.pageView.getPages();
            this.pageView.removePage(pages[pages.length - 1]);
        });
    },
    //2---移除当前页
    onRemovePageAtIndex: function () {
        this.lessPage(() => {
            this.pageView.removePageAtIndex(this.pageView.getCurrentPageIndex());
        });
    },
    lessPage: function (callback) {
        if (this.curNum <= 0) {
            return;
        }
        this.curNum--;
        if (callback) {
            callback();
        }
    },
    //3---移除所有页面
    onRemoveAllPages: function () {
        //---pageView.removeAllPage()
        //移除所有页面
        this.pageView.removeAllPages();
        this.curNum = 0;
    },

    //---pageView.pageEvents
    //滚动视图的事件回调函数
    onPageEvent: function (sender, eventType) {
        //翻页事件---cc.PageView.EventType.PAGE_TURNING
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
            return;
        }
        console.log(sender.name);

        //---pageView.getCurrentPageIndex()
        //返回当前页面索引
        //返回值（Number）
        console.log('currentPageIndex = ' + sender.getCurrentPageIndex());
    }

    // start() {},

    // update (dt) {}
});