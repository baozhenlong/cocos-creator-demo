cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    //---座位---5人
    getIndexBySeatId: function (seatId, ownSeatId) {
        //0,1,2,3,4
        var index = 0;
        if (seatId === ownSeatId) {
            index = 2;
        } else {
            var diff = seatId - ownSeatId;
            index = diff + 2;
            if (index >= 5) {
                index -= 5;
            } else if (index < 0) {
                index += 5;
            }
        }
        return index;
    }

    // start() {},

    // update (dt) {}
});