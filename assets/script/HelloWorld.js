


// var data = {

// };

// module.exports = data;

// //别的脚本引用
// var data = require("data");

// var test2 = require("test2");

var hello = cc.Class({
    extends: cc.Component,
    properties: {
        // radio: cc.ScrollView,
        // lb: cc.Node,
        // // _test:{
        // //     default: null,
        // //     type: test2,
        // // }
        // pv: cc.PageView,
        // pai: cc.Node,
        // wb: cc.Node,

        ly: cc.Node,
        cardPf: cc.Prefab,
        num1: 1,
        num2: 2,
        num3: 3,
        lb: cc.Label
    },

    logNum: function(index){
        var num = "num" + index;
        console.log("num = "+ this[num]);
    },

    getNum: function(num){
        if(num == 53 || num == 54){
            console.log("num = " + num);                        
            return num;
        }else{
            var num = num % 13;
            if(num == 0){
                console.log("num = 13");
                return 13;
            }else{
                console.log("num = " + num);            
                return num;
            }
        }
    },

    getRandomInt: function(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("num = " + num);    //min - max
        return num;  
    },


    checkCard: function(cardArr){
        cardArr.sort(function(a, b){
            return a - b;
        });
        console.log("cardArr = " + JSON.stringify(cardArr));

        //两张
        if(cardArr.length == 2){
            if(cardArr[0] == cardArr[1]){
                //对子
                return {
                    num: cardArr[0],
                    type: "two", 
                    weight: 1,  
                };
            }
            if(cardArr[0] == 53 && cardArr[1] == 54){
                //王炸
                return {
                    num: cardArr[0],
                    type: "two",
                    weight: 3,
                };
            }
        }
        //3张牌
        if(cardArr.length == 3){
            if(cardArr[0] == cardArr[2]){
                return {
                    num: cardArr[0],
                    type: "three",
                    weight: 1,  
                };
            }
        }
        //4张牌
        if(cardArr.length == 4){
            if(cardArr[0] == cardArr[3]){
                //炸弹
                return {
                    num: cardArr[0],
                    type: "four",
                    weight: 2, 
                };
            }
            //3带一
            if(cardArr[0] == cardArr[2] && cardArr[2] !== cardArr[3]){
                //3张在前
                return {
                    num: cardArr[0],
                    type: "sanDaiYi",
                    weight: 1, 
                };
            }
            if(cardArr[0] !== cardArr[1] && cardArr[1] == cardArr[3]){
                //3张在后
                return {
                    num: cardArr[3],
                    type: "sanDaiYi",
                    weight: 1, 
                };
            }
        }
        //5张牌且不是顺子---3带2
        if(cardArr.length == 5){
            if(cardArr[0] == cardArr[2] && cardArr[3] == cardArr[4]){
                //3张在前
                return {
                    num: cardArr[0],
                    type: "sanDaiYiDui",
                    weight: 1, 
                };
            }
            if(cardArr[0] == cardArr[1] && cardArr[2] == cardArr[4]){
                //3张在后                
                return {
                    num: cardArr[4],
                    type: "sanDaiYiDui",
                    weight: 1, 
                };
            }
        }
        //6张牌且不是顺子---4带2
        if(cardArr.length == 6){
            for(var i = 0; i < cardArr.length; i++){
                var count = 0;
                var fourCard = 0;
                for(var j = 0; j < cardArr.length; j++){
                    if(cardArr[i] == cardArr[j]){
                        count++;
                    }
                }
                if(count == 4){
                    fourCard = cardArr[i];
                    return {
                        num: fourCard,
                        type: "siDaiEr",
                        weight: 1,
                    };
                }
            }
        }
        //8张牌且不是顺子---4带2对
        if(cardArr.length == 8){
            for(var i = 0; i < cardArr.length; i++){
                var count = 0;
                var fourCard = 0;
                for(var j = 0; j < cardArr.length; j++){
                    if(cardArr[i] == cardArr[j]){
                        count++;
                    }
                }
                if(count == 4){
                    fourCard = cardArr[i];
                    var otherCard = [];
                    for(var k = 0; k < cardArr.length; k++){
                        if(cardArr[k] !== fourCard){
                            otherCard.push(cardArr[k]);
                        }
                    }
                    if(otherCard[0] == otherCard[1] && otherCard[2] == otherCard[3]){
                        return {
                            num: fourCard,
                            type: "siDaiEr",
                            weight: 1,
                        };
                    }
                }
            }
        }
        //顺子
        //单顺子---34567
        if(cardArr.length > 4 && cardArr[0] > 2){
            for(var i = 0; i < cardArr.length; i++){
                if(i == cardArr.length - 1){
                    return {
                        num: cardArr[0],
                        type: "danShunZi",
                        weight: 1,
                    };
                }
                if(cardArr[i] !== cardArr[i+1] - 1){
                    //是否为顺子
                    break;
                }
            }
        }
        //双顺子---334455
        if(cardArr.length > 5 && cardArr[0] > 2 && cardArr.length % 2 == 0){
            for(var i = 0; i < cardArr.length; i = i + 2){
                if(cardArr[i] !== cardArr[i+1]){
                    //是否为对子
                    break;
                }
                if(i + 2 == cardArr.length){
                    return {
                        num: cardArr[0],
                        type: "shuangShunZi",
                        weight: 1,
                    };
                }
                if(cardArr[i] !== cardArr[i+2] - 1){
                    //是否为顺子
                    break;
                }
            }
        }
        //三顺子---333444
        if(cardArr.length > 5 && cardArr[0] > 2 && cardArr.length % 3 == 0){
            for(var i = 0; i < cardArr.length; i = i + 3){
                if(cardArr[i] !== cardArr[i+2]){
                    //是否为3张
                    break;
                }
                if(i + 3 == cardArr.length){
                    return {
                        num: cardArr[0],
                        type: "sanShunZi",
                        weight: 1,
                    };
                }
                if(cardArr[i] !== cardArr[i+3] - 1){
                    //是否为顺子
                    break;
                }
            }
        }
        //飞机带单---13334445
        if(cardArr.length > 7 && cardArr.length % 4 == 0){
            var tempArr = [];
            var tempCard = [];
            for(var i = 0; i < cardArr.length; i++){
                tempArr.push(cardArr[i]);
                if(i == cardArr.length-1 || cardArr[i] !== cardArr[i+1]){
                    tempCard.push(tempArr);
                    tempArr = [];
                }
            }
            var threeCount = 0;
            var threeCheck = false;
            var threeNumArr = [];
            var oneNumArr = [];
            for(var i = 0; i < tempCard.length; i++){
                if(tempCard[i].length == 1){
                    oneNumArr.push(tempCard[i][0]);
                }
                if(tempCard[i].length == 3){
                    threeNumArr.push(tempCard[i][0]);
                    threeCount++;
                }
            }
            for(var i = 0; i < threeNumArr.length; i++){
                if(threeNumArr[i] == 2){
                    break;
                }
            }

        }

    },

    callback: function(){

    },

    addCardItem: function(){
        var card = cc.instantiate(this.cardPf);
        card.tag = this.cardList[this.cardIndex];
        this.ly.addChild(card);
    },

    getChildIndexByPs: function(ps){
        // console.log("---getgetChildIndexByPs");
        var dif = 36;   //牌的间距
        var index = 0;  //牌的索引
        var x1 = this.border.x;
        var x2 = this.border.x + dif;
        var xMin = this.border.x;
        var xMax = this.border.x + this.border.width;
        // console.log("xmax = " + xMax);
        var yMin = this.border.y;
        var yMax = this.border.y + this.border.height;
        // do{
        //     console.log("---do");
        //     console.log("x1 = " + x1);
        //     console.log("x2 = " + x2);
        //     if(ps.x > x1 && ps.x < x2 ){
        //         console.log("---if");
        //         return index.toString();
        //     }else{
        //         console.log("---else");                
        //         x1 = x1 + dif;
        //         x2 = x2 + dif;
        //         index++;
        //     }
        // }while(x2 < this.border.x + this.border.width);

        if(ps.x > xMin && ps.x < xMax && ps.y > yMin && ps.y < yMax){
            // console.log("---父节点内")
            while(x2 <= xMax){
                // console.log("---x2 < xMax");
                // console.log("x1 = " + x1);
                // console.log("x2 = " + x2);
                if(ps.x > x1 && ps.x < x2 ){
                    // console.log("---find");
                    return index;
                }else{
                    // console.log("---no");                
                    index++;
                }
                x1 = x1 + dif;
                x2 = x2 + dif;
                // console.log("x1 = " + x1);
                // console.log("x2 = " + x2);
            }
        }
        return -1;
    },

    isHasDanShun: function(cardArr){
        if(cardArr.length < 5){
            return false;
        }
        var arr = this.sortCard(cardArr);
        console.log("card = " + arr);
        var count = 1;
        var tempArr = [arr[0]];
        for(var index = 0; index < arr.length - 1; index++){
            if(arr[index] == arr[index + 1] - 1){
                count++;
                tempArr.push(arr[index + 1]);
            }else if(arr[index] == arr[index + 1]){
                continue;
            }else{
                count = 1;
                tempArr = [arr[index + 1]];
            }
        }
        if(count > 4){
            console.log("shunZi = " + JSON.stringify(tempArr));
            return tempArr;
        }
        return false;
    },

    

    sortCard: function(cardArr){
        var arr = [];
        for(var index in cardArr){
            arr[index] =this.getCardValue(cardArr[index]);
        }
        arr.sort(function(a, b){
            return a - b;
        });
        return arr;
    },

    getCardValue: function (num){
        if(num == 53){
            // console.log("num = " + num);                        
            return 16;
        }else if(num == 54){
            // console.log("num = " + num);                        
            return 17;
        }else{
            var num = num % 13;
            if(num == 0){
                // console.log("num = 13");
                return 13;
            }else if(num == 1){
                // console.log("num = 13");
                return 14;
            }else if(num == 2){
                // console.log("num = 13");
                return 15;
            }else{
                // console.log("num = " + num);            
                return num;
            }
        }
    },

    //统计每张牌的数量
    countCard: function(cardArr){
        var arr = [];
        for(var index = 3; index < 18; index++){
            arr[index] = 0;
        }
        for(var i = 0; i < cardArr.length; i++){
            arr[cardArr[i]]++;
        }
        return arr;
    },

    isHasSanLian: function(arr){
        if(arr.length < 3){
            return false;
        }
        var count = 1;
        var tempArr = [arr[0]];
        for(var index = 0; index < arr.length - 1; index++){
            if(arr[index] == arr[index + 1] - 1){
                count++;
                tempArr.push(arr[index + 1]);
            }else{
                count = 1;
                tempArr = [arr[index + 1]];
            }
        }
        console.log("arr = " + JSON.stringify(tempArr));
        if(count > 2){
            return tempArr;
        }
        return false;
    },

    isHasShuangShun: function(cardArr){
        if(cardArr.length < 6){
            return false;
        }
        var arr = this.sortCard(cardArr);
        var count = 1;
        var totalTwoNum = 0;
        var countCardArr = this.countCard(arr);
        var tempArr = [];
        for(var value = 3; value < 18; value++){
            if(countCardArr[value] >= 2){
                totalTwoNum++;
                tempArr.push(value);
            }
        }
        console.log("arr = " + tempArr);
        if(totalTwoNum >= 3){
            return this.isHasSanLian(tempArr);
        }
        return false;
    },

    getCardNum: function(value){
        var num = -1;
        var arr = [0, 0, 0, 0];
        if(value == 17){
            return [54];
        }else if(value == 16){
            return [53];
        }else{
            if(value == 15){
                num = 2;
            }else if(value == 14){
                num = 1;
            }else if(value == 13){
                num = 0;
            }else{
                num = value;
            }
            for(var index = 0; index < arr.length; index++){
                arr[index] = num + index * 13;
            }
            return  arr;
        }
    },

    // pickOneCardToArr: function(preArr, curArr){
    //     var arr = [];
    //     for(var i = 0; i < curArr.length; i++){
    //         for(var j = 0; j < preArr[j].length; j++){
    //             if(curArr[i] == preArr[i][j]){
    //                 arr.push(preArr[i][j]);
    //                 break;                
    //             }
    //         }
    //     }
    //     console.log("arr = " + JSON.stringify(arr));
    //     return arr;
    // },

    pickOneCardToArr: function(preArr, curArr){
        var arr = [];
        for(var i = 0; i < preArr.length; i++){
            for(var j = 0; j < preArr[i].length; j++){
                var index = curArr.indexOf(preArr[i][j]);
                if(index !== - 1){
                    arr.push(curArr[index]);
                    break;
                }
            }
        }
        console.log("arr = " + JSON.stringify(arr));
        return arr;
    },

    pickTwoCardToArr: function(preArr, curArr){
        var arr = [];
        for(var i = 0; i < preArr.length; i++){
            var totalNum = 0;
            for(var j = 0; j < preArr[i].length; j++){
                var index = curArr.indexOf(preArr[i][j]);
                if(index !== - 1){
                    if(totalNum == 2){
                        break;
                    }else{
                        arr.push(curArr[index]);
                        totalNum++;
                    }
                }
            }
        }
        console.log("arr = " + JSON.stringify(arr));
        return arr;
    },

    sortCardBySmall: function(cardArr){
        var arr = [];
        var tempArr = cardArr;
        tempArr.sort(function(a, b){
            return a - b;
        });
        //花色排序
        for(var value = 3; value < 18; value++){
            for(var index = 0; index < tempArr.length; index++){
                var num = tempArr[index];              
                if(this.getCardValue(num) == value){
                    arr.push(tempArr[index]);
                }
            }
        }
        console.log("---花色排序" + JSON.stringify(arr));
        //牌值排序
        for(var i = 0; i < arr.length; i++){
            var mark = true;    //待排序列已经有序
            for(var j = 0; j < arr.length - 1 - i; j++){
                //从小到大
                var cur = arr[j];
                var next = arr[j+1];
                // console.log("cur = " + cur);
                // console.log("next = " + next);
                if(this.getCardValue(cur) >= this.getCardValue(next)){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    mark = false;
                    // console.log("arr[j] = " + arr[j]);
                    // console.log("arr[j+1] = " + arr[j+1]);
                }
            }
            if(mark){
                break;
            }
        }
        return arr;
    },

    isDanZhang: function(cardArr){
        if(cardArr.length == 1){
            // return this.getCardValue(cardArr[0]);
            var obj = {
                type: "danZhang",
                weight: 1,
                maxNum: this.getCardValue(cardArr[0]),
            };
            return obj;
        }
        return false;
    },

    isDuiZi: function(cardArr){
        var arr = this.sortCard(cardArr);
        if(arr.length == 2){
            if(arr[0] == arr[1]){
                // return arr[0];
                var obj = {
                    type: "duiZi",
                    weight: 1,
                    maxNum: arr[0],
                };
                return obj;
            }
        }
        return false;
    },

    getOneCardList: function(cardArr){
        //cardArr---按逻辑值从小到大排序
        var oneCardArr = [cardArr[0]];
        for(var i = 0; i < cardArr.length - 1; i++){
            if(cardArr[i] == cardArr[i+1]){
                continue;
            }else{
                oneCardArr.push(cardArr[i+1]);
            }
        }
        console.log("oneCard = "+ oneCardArr);
        return oneCardArr;
    },

    isHasBiggerShunZi: function(obj, oneCardList){
        var minNum = obj.minNum;
        var weight = obj.weight;
        if(oneCardList.length < obj.weight){
            return false;
        }
        var tempArr = [];
        var list = [];
        var mark = true;
        for(var index = 0; index < oneCardList.length - 1; index++){
            if(oneCardList[index] <= minNum){
                continue;                
            }else{
                if(mark){
                    // console.log("if mark index = " + index);
                    tempArr.push(oneCardList[index]);
                    mark = false;
                }
            }
            if(oneCardList[index] == oneCardList[index + 1] - 1){
                tempArr.push(oneCardList[index + 1]);                
            }else{
                tempArr = [];
                mark = true;
            }
            if(tempArr.length == weight){
                list.push(tempArr);
                // index = tempArr[0] - 1;
                index = oneCardList.indexOf(tempArr[0]);
                console.log("index = " + index);
                mark = true;
                tempArr = [];
            }
        }
        console.log("list = " + JSON.stringify(list));
        return list;
    },

    isHasBiggerSanBuDai: function(obj, threeCardList){
        var minNum = obj.minNum;
        var weight = obj.weight;
        if(threeCardList.length < weight){
            return false;
        }
        var tempArr = [];
        var list = [];
        var mark = true;
        for(var index = 0; index < threeCardList.length; index++){
            if(threeCardList[index] < minNum){
                continue;
            }else{
                if(mark){
                    tempArr.push(threeCardList[index]);
                    mark = false;
                }
            }
            if(threeCardList[index] == threeCardList[index + 1] - 1){
                tempArr.push(threeCardList[index + 1]);
            }else{
                tempArr = [];
                mark = true;
            }

            if(tempArr.length == weight){
                console.log("tempArr = " + JSON.stringify(tempArr));
                index = threeCardList.indexOf(tempArr[0]);
                list.push(tempArr);
                tempArr = [];
                mark = true;
            }
        }
        console.log("list = " + JSON.stringify(list));
        if(list.length !== 0){
            return list;
        }else{
            return false;
        }
    },

    getThreeCardList: function(cardArr){
        //cardArr---按逻辑值从小到大排序
        if(cardArr.length < 6){
            return false;
        }
        var countPerCardArr = this.countCard(cardArr);
        var threeCardArr = [];
        for(var value = 3; value < 15; value++){
            if(countPerCardArr[value] >= 3){
                threeCardArr.push(value);
            }
        }
        return threeCardArr;
    },

    getFeiJiBuDaiList: function(arr, targetArr){
        //arr---所有可能的三不带单张
        var list = [];
        for(var i = 0; i < arr.length; i++){
            var possibleArr = this.getPossibleCardList(arr[i]);
            var feiJiArr = [];
            for(var j = 0; j < possibleArr.length; j++){
                var totalNum = 0;
                for(var k = 0; k < possibleArr[j].length; k++){
                    var index = targetArr.indexOf(possibleArr[j][k]);
                    if(index !== -1){
                        feiJiArr.push(targetArr[index]);
                        totalNum++;
                        if(totalNum == 3){
                            break;                          
                        }
                    }
                }
            }
            list.push(feiJiArr);
        }
        console.log("list = " + JSON.stringify(list));
        return list;
    },

    getPossibleCardList: function(arr){
        var list = [];
        for(var index = 0; index < arr.length; index++){
            list.push(this.getCardNum(arr[index]));
        }
        return list;
    },

    getFeiJiDaiDanList : function(arr, targetArr){
        //arr---所有可能的三不带单张
        var list = [];
        for(var i = 0; i < arr.length; i++){
            var weight = arr[i].length;
            var possibleArr = this.getPossibleCardList(arr[i]);
            var feiJiArr = [];
            for(var j = 0; j < possibleArr.length; j++){
                var totalNum = 0;
                for(var k = 0; k < possibleArr[j].length; k++){
                    var index = targetArr.indexOf(possibleArr[j][k]);
                    if(index !== -1){
                        feiJiArr.push(targetArr[index]);
                        totalNum++;
                        if(totalNum == 3){
                            break;                          
                        }
                    }
                }
            }
            var singleCardArr = this.isHasSingleCard(targetArr);
            if(singleCardArr && singleCardArr.length >= weight){
                console.log("singleCard = " + JSON.stringify(singleCardArr));
                for(var m = 0; m < singleCardArr.length; m++){
                    var end = m + weight;
                    if(end > singleCardArr.length){
                        break;
                    }
                    var feiJiDaiDanArr = feiJiArr.concat();
                    var danArr = singleCardArr.slice(m, end);
                    for(var n = 0; n < danArr.length; n++){
                        feiJiDaiDanArr.push(danArr[n]);
                    }
                    list.push(feiJiDaiDanArr);
                }
            }else{
                list.push(feiJiArr);
            }
        }
        console.log("list = " + JSON.stringify(list));
        return list;
    },

    isHasSingleCard: function(targetArr){
        var arr = [];
        var cardList = this.sortCard(targetArr);
        var countPerCardArr = this.countCard(cardList);
        for(var value = 3; value < 18; value++){
            if(countPerCardArr[value] == 1){
                console.log("value = " + value);
                var numArr = this.getCardNum(value);
                console.log("singleNumArr = " + JSON.stringify(numArr));
                for(var i = 0; i < numArr.length; i++){
                    var index = targetArr.indexOf(numArr[i]);
                    if(index !== -1){
                        arr.push(targetArr[index]);
                    }
                }
            }
        }
        if(arr.length !== 0){
            return arr;
        }else{
            return false;
        }
    },


    getFeiJiDaiDuiList : function(arr, targetArr){
        //arr---所有可能的三不带单张
        var list = [];
        for(var i = 0; i < arr.length; i++){
            var weight = arr[i].length;
            var possibleArr = this.getPossibleCardList(arr[i]);
            var feiJiArr = [];
            for(var j = 0; j < possibleArr.length; j++){
                var totalNum = 0;
                for(var k = 0; k < possibleArr[j].length; k++){
                    var index = targetArr.indexOf(possibleArr[j][k]);
                    if(index !== -1){
                        feiJiArr.push(targetArr[index]);
                        totalNum++;
                        if(totalNum == 3){
                            break;                          
                        }
                    }
                }
            }
            var doubleCardArr = this.isHasDoubleCard(targetArr);
            if(doubleCardArr && doubleCardArr.length >= weight){
                console.log("doubleCardArr = " + JSON.stringify(doubleCardArr));
                for(var m = 0; m < doubleCardArr.length; m++){
                    var end = m + weight;
                    if(end > doubleCardArr.length){
                        break;
                    }
                    var feiJiDaiDuiArr = feiJiArr.concat();
                    var duiArr = doubleCardArr.slice(m, end);
                    for(var n = 0; n < duiArr.length; n++){
                        feiJiDaiDuiArr.push(duiArr[n][0]);
                        feiJiDaiDuiArr.push(duiArr[n][1]);                        
                    }
                    list.push(feiJiDaiDuiArr);
                }
            }else{
                list.push(feiJiArr);
            }
        }
        console.log("list = " + JSON.stringify(list));
        return list;
    },

    isHasDoubleCard: function(targetArr){
        var arr = [];
        var cardList = this.sortCard(targetArr);
        var countPerCardArr = this.countCard(cardList);
        for(var value = 3; value < 18; value++){
            if(countPerCardArr[value] == 2){
                console.log("value = " + value);
                var numArr = this.getCardNum(value);
                console.log("doubleNumArr = " + JSON.stringify(numArr));
                var totalNum = 0;
                var tempArr = [];
                for(var i = 0; i < numArr.length; i++){
                    var index = targetArr.indexOf(numArr[i]);
                    if(index !== -1){
                        tempArr.push(targetArr[index]);
                        totalNum++;
                        if(totalNum == 2){
                            arr.push(tempArr);  
                            break;
                        }
                    }
                }
            }
        }
        console.log("doubleCard = " + JSON.stringify(arr));        
        if(arr.length !== 0){
            return arr;
        }else{
            return false;
        }
    },

    onLoad: function () {
        var self = this;
        var color = new cc.Color(0, 0, 255);
        this.lb.node.color = color;
        // var  arr = [0,1,2,3,4,5];
        // var arr2 = arr.slice(2);
        // console.log("arr2 start=2 = " + arr2);  //2,3,4,5
        // var arr3 = arr.slice(-1);
        // console.log("arr3 start=-1 = " + arr3); //5
        // var arr4 = arr.slice(2, 5);
        // console.log("arr4 start=2,end=5 = " + arr4);    //2,3,4
        // var arr5 = arr.slice(2, 6);
        // console.log("arr5 start=2,end=6 = " + arr5);    //2,3,4,5
        // var arr6 = arr.slice(-2,5);
        // console.log("arr6 start=-2,end=5 = " + arr6);   //4


        // var obj = [];
        // if(obj){
        //     console.log("obj = " + obj);
        // }

        // var arr1 = [3,3,4,4,4,5,6,7,9,10, 11, 12, 13, 14];
        // var arr2 = this.getOneCardList(arr1);
        // var obj = {
        //     minNum : 3,
        //     weight: 5,
        // };
        // this.isHasBiggerShunZi(obj, arr2);

        // var arr1 = [3,16,4,17,30,5,6,19,32,45,7,20,33,8,21,34,9,22,35,10, 11,24, 12,25, 13, 14,27];
        // var arr1 = [3,4,17,30,5,6,19,32,45,7,20,33,8,21,34,9,22,35,10, 11, 12,13,27];
        
        // var sortCard = this.sortCard(arr1);
        // var arr2 = this.getThreeCardList(sortCard);
        // console.log("arr2 = " + JSON.stringify(arr2));
        // var obj = {
        //     minNum : 3,
        //     weight: 3,
        // };
        // var arr3 = this.isHasBiggerSanBuDai(obj, arr2);

        // // this.getFeiJiDaiDanList(arr3, arr1);
        // this.getFeiJiDaiDuiList(arr3, arr1);
        
        // var list = [];
        // var arr1 = [[1,1,1,1], [2,2,2,2]];
        // var arr2 = false;
        // var arr3 = [[53, 54]];

        // list =  list.concat(arr1, arr2);
        // var arr = arr1.concat(arr2);
        // // console.log("list1 = " + JSON.stringify(list1));
        // console.log("list = " + JSON.stringify(list));
        
        // console.log("arr = " + JSON.stringify(arr));
        
        // var arr = [55,5,5,5,6,6,,7,8,8,9,9,10,10,11,11,12,];

        // this.isHasShuangShun(arr);

        // var arr = [3,4,5];
        // var arr1 = [];
        // for(var i = 0; i < arr.length; i++){
        //     arr1.push(this.getCardNum(arr[i]));
        // }
        // //[[3,16,29,42],[4,17,30,43],[5,18,31,44]]
        // console.log("preArr = " + JSON.stringify(arr1));

        // var arr2 = [30,43,31,18,16];
        // // this.pickOneCardToArr(arr1, arr2);
        // var arr3 = [16,4,17,30,18,31,44,42,5];
        // this.pickTwoCardToArr(arr1, arr3);

        this.cardIndex = 0;
        this.ly.removeAllChildren();
        this.cardList = [0, 1, 2, 3, 4];
        for(var i = 0; i < this.cardList.length; i++){
            this.addCardItem();
        }

        // this.sortCardBySmall(arr3);
    
        this.children = this.ly.children;



        
        
        self.startIndexArr = [];

        this.ly.on(cc.Node.EventType.TOUCH_START, function(event){
            console.log("---start");
            self.border = this.ly.getBoundingBox();//(左下角x,左下角y,宽度,高度)
            console.log("border = " + JSON.stringify(this.border));
            console.log("border = " + this.border.x);
            console.log("border = " + this.border.y);
            console.log("border = " + this.border.width);
            console.log("border = " + this.border.height);
            var ps = self.ly.convertTouchToNodeSpaceAR(event.touch);
            console.log("startPs = " + ps);

            self.startPs = ps;

            self.startIndex = self.getChildIndexByPs(ps);
            self.lastIndex = self.startIndex;   
            console.log("index = " + this.startIndex);
            // self.startIndexArr.push(this.startIndex);
            self.children[this.startIndex].getChildByName("Lb").getComponent(cc.Label).string = 2;
        }, this);

        // this.lastMovePs = 0;

        this.ly.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            console.log("---move");

            var ps = self.ly.convertTouchToNodeSpaceAR(event.touch);
            // if(self.lastMovePs)
            // self.lastMovePs = ps;
            console.log("ps = " + ps);         

            if(ps.x < self.startPs.x){
                console.log("---left");
                var index = self.getChildIndexByPs(ps);
                if(index == -1){
                    // self.lastIndex = self.startIndex;                    
                    // console.log("---不在节点内 index = " + self.lastIndex);
                }else{
                    console.log("---在节点内 index = " + index); 
                    if(index < self.lastIndex){
                        self.children[index].getChildByName("Lb").getComponent(cc.Label).string = 2;                         
                    }else if(index > self.lastIndex){
                        self.children[self.lastIndex].getChildByName("Lb").getComponent(cc.Label).string = 1; 
                    }
                    self.lastIndex = index;                    
                }
            }else if(ps.x > self.startPs.x){
                console.log("---right");
                var index = self.getChildIndexByPs(ps);
                if(index == -1){
                    // self.lastIndex = self.startIndex;                    
                    // console.log("---不在节点内 index = " + self.lastIndex);
                }else{
                    console.log("---在节点内 index = " + index); 
                    if(index > self.lastIndex){
                        self.children[index].getChildByName("Lb").getComponent(cc.Label).string = 2;                         
                    }else if(index < self.lastIndex){
                        self.children[self.lastIndex].getChildByName("Lb").getComponent(cc.Label).string = 1; 
                    }
                    self.lastIndex = index;                    
                }
            }



        }, this);


        this.ly.on(cc.Node.EventType.TOUCH_END, function(event){
            console.log("---end");
            console.log("lastIndex = " + this.lastIndex);
            var ps = self.ly.convertTouchToNodeSpaceAR(event.touch);
            console.log("ps = " + ps);      
            self.endIndex = self.getChildIndexByPs(ps);

            // if(self.startIndex == self.endIndex){
            //     console.log("---oneCard");
            //     self.children[startIndex].y =+ 40;               
            // }else{
                // var index = self.startIndex <= self.endIndex ? self.startIndex : self.endIndex;
                var minIndex = 0;
                var maxIndex = 0;
                console.log("startIndex = " + this.startIndex);
                console.log("endIndex = " + this.endIndex);
                if(self.startIndex <= self.endIndex){
                    minIndex = self.startIndex;
                    maxIndex = self.endIndex;
                }else{
                    minIndex = self.endIndex;
                    maxIndex = self.startIndex;
                }
                for(var i = minIndex; i < maxIndex + 1; i++){
                    self.children[i].y += 40;
                }
            // }

            // self.children[this.startIndexArr[]].y += 30;
        }, this);

        // this.schedule(function(){
        //     self.getRandomInt(0, 4)
        // },0.2, cc.macro.REPEAT_FOREVER);

        // this.logNum(3);
        // this.logNum(1);
        // this.logNum(2);

        // this.getNum(1);
        // this.getNum(13);
        // this.getNum(14);
        // this.getNum(15);
        // this.getNum(27);
        // this.getNum(53);
        
        // var count = this.ly.childrenCount;
        // console.log("count = " + count);
        // var children = this.ly.children;
        // for(var i = 0; i < children.length; i++){
        //     console.log("name = " + children[i].name  + "index = " + children[i].getSiblingIndex());
        //     children[i].setLocalZOrder(children.length - i);
        // }
        // // for(var i = 0; i < children.length; i++){
        // //     console.log("change");
        // //     children[i].setSiblingIndex(children.length - 1);

        // // }
        // for(var i = 0; i < children.length; i++){
        //     console.log("name = " + children[i].name  + "index = " + children[i].getSiblingIndex());
        // }


        // this._test.test();
        // console.log("---type = " + typeof(this._test));

        // this.test2 = require("test2");
        // this.test2.hello();
        // this.startPv();
        // this.pv.node.on(cc.Node.EventType.TOUCH_END, function(event){
        //     console.log("--end");
        //     self.unschedule(self.timeCallBack);
        // });

        // console.log("index = " + this.getIndex());
        // // console.log("page = " + this.pv.getPages());
        // this.schedule(self.timeCallBack, 2, cc.macro.REPEAT_FOREVER);


        // var obj = {};
        // obj.testArray = [1,2,3,4,5];
        // obj.name = 'CSS3';
        // obj.date = '8 May, 2011';
        // var str = JSON.stringify(obj);    //将对象转换为字符串
        // console.log("str = " + str)
        // var str1 = JSON.parse(str); //将字符串转换为对象
        // console.log("str1 = " + str1);
        // var str2 = JSON.stringify(str1);
        // console.log("str2 = " + str2);

        // let obj1 = { a: 0 , b: { c: 0}};
        // let obj2 = Object.assign({}, obj1);
        // console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
        
        // obj1.a = 1;
        // console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
        // console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
        
        // obj2.a = 2;
        // console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
        // console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
        
        // obj2.b.c = 3;
        // console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
        // console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}
        
 
    },

    startPv(){
        var self = this;
        // var seq = cc.sequence(
        //     cc.callFunc(()=>{
        //     this.pv.scrollToRight(10);
        //     }),
        //     cc.delayTime(0.1),
        //     // cc.callFunc(()=>{
        //     //     self.pv.scrollToLeft(5);
        //     // })
        // );

        var seq = cc.sequence(
            cc.callFunc(()=>{
                self.pv.scrollToPage(1, 5);
                console.log("index = " + this.getIndex());
            }),
            cc.delayTime(5),
            cc.callFunc(()=>{
                self.pv.scrollToPage(2, 5);
                console.log("index = " + this.getIndex());
            }),
            cc.delayTime(5),
            cc.callFunc(()=>{
                self.pv.scrollToPage(0, 5);
                console.log("index = " + this.getIndex());
            }),
        );
        this.pv.node.runAction(cc.repeatForever(seq));
    },

    getIndex(){
        return this.pv.getCurrentPageIndex();
    },

    stopPv(){
        console.log("---停止自动滚动");
        this.pv.stopAutoScroll();
    },
    // ctor: function() {

    //     console.log("connect ctor ");

    //     this._test =  new test2();

    // },

    btnClicked: function(){
        console.log("---clicked");
        this.radio.scrollToRight(25);
        // this._test.hello();
    },
    wwwwwClicked: function(){
        console.log("---clicked");
        // this.radio.scrollToLeft(25);

        var moveTo = cc.moveTo(5, cc.p(-this.lb.width + 240, 0));
        var ac = cc.callFunc(()=>{
            console.log("---ac");
            this.lb.getComponent(cc.Label).string = "";
        }, this);
        this.lb.runAction(cc.sequence(moveTo, ac));
    },
    //1-2-3-2-1
    timeCallBack(){
        var index = this.getIndex();
        if(index >=0 && index < 3){
            if(index == 2){
                this.pv.scrollToPage(index - 1, 2);
            }else{
                this.pv.scrollToPage(index + 1, 2);
            }
        }
    },


    updatae(){

    },

    setOrder(){
        this.pai.setLocalZOrder(1000);
        this.wb.setLocalZOrder(10);
        
    },
});

module.exports = hello;
