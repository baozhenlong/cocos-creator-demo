cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //1---scheduleOnce(callback, delay)---开始一个执行一次的计时器
        //参数callback（Function）---回调函数
        //interval（Number）---延迟时间；0---回调函数在下一帧立即执行
        //计时器将在2秒后执行1次回调，之后停止计时
        this.scheduleOnce(function () {
            console.log('------scheduleOnce');
        }, 2);

        //2---schedule(callback, interval, repeat, delay)---开始一个计时器
        //如果回调函数已调度，那么不会重复调度它，只会更新时间间隔参数
        //参数callback（Function）---回调函数
        //参数interval（Number）---以秒为单位的时间间隔；默认为0---每帧调用
        //参数repeat（Number）---重复次数；总的执行次数 === repeat+1；默认为cc.macro.REPEAT_FOREVER---一直循环
        //参数delay（Number）---延迟时间，在延迟指定的时间之后开始计时；默认为0---回调函数在下一帧立即执行    
        //计时器将在5秒后开始计时，每2秒执行一次回调，重复3次
        var interval = 2;
        var repeat = 3; //
        var delay = 5; //
        this.schedule(function () {
            console.log('------schedule');
        }, interval, repeat, delay);

        //3---unschedule(callback, target)---可以使用回调函数本身来取消一个计时器---下一次不执行回调函数
        //参数callback（Function）---需要取消计时器的回调函数
        //参数target（Object）---绑定回调函数的this
        this.count = 0;
        this.callback = function () {
            if (this.count === 5) {
                console.log('unschedule this.count = ' + this.count); //5
                this.unschedule(this.callback);
            }
            console.log('this.count = ' + this.count); //0,1,2,3,4,5
            this.count++;
        };
        this.schedule(this.callback, 1);
    },

    onCancelAllSchedule: function () {
        //4---取消这个组件的所有计时器
        this.unscheduleAllCallbacks();
    }

    // start () {

    // },

    // update (dt) {},
});