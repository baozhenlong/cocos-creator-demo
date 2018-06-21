cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

        //---交换排序---借助比较和交换进行排序的方法
        //冒泡排序+快速排序

        console.log('\n------冒泡排序');
        //---冒泡排序（Bubble Sort），也叫气泡排序
        //两两比较相邻记录的关键字，如果反序则交换，直到没有反序的记录为止
        //时间复杂度---O(n^2)
        function bubbleSort(list) {
            var flag = false; //标记待排列是否已有序---true（有序），false（无序）
            for (let i = 0; i < list.length - 1 && !flag; i++) {
                console.log('i = ' + i);
                flag = true; //初始化为true
                //从第一个元素开始，进行两两比较
                for (let j = i; j < list.length; j++) {
                    if (list[j] > list[j + 1]) {
                        let temp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = temp;
                        flag = false;
                    }
                }
            }
        }
        var list = [2, 1, 3, 4, 6, 5];
        console.log(list);
        bubbleSort(list);
        console.log(list);

        //---选择排序
        //简单选择排序+堆排序

        console.log('\n------简单选择排序');
        //---简单选择排序
        //比较n-i次关键字，从n-i+1个记录中选出关键字最小的记录，并个第i个记录交换之
        //时间复杂度---O(n^2)
        function selectSort(list) {
            var min = 0;
            for (let i = 0; i < list.length - 1; i++) {
                min = i; //将当前下标定义为最小值下标
                for (let j = i + 1; j < list.length; j++) { //当前下标之后的数据
                    if (list[min] > list[j]) { //如果有小于当前最小值的关键字
                        min = j; //将此关键字的下标赋值给min
                    }
                }
                if (min !== i) { //找到最小值，并交换
                    let temp = list[min];
                    list[min] = list[i];
                    list[i] = temp;
                }
            }
        }
        var list = [2, 1, 3, 4, 6, 5];
        console.log(list);
        selectSort(list);
        console.log(list);

        console.log('\n------堆排序');
        //---堆排序---对简单选择排序的改进

        //---插入排序
        //直接插入排序+希尔排序

        console.log('\n------直接插入排序');
        //---直接插入排序
        //将一个记录插入到已经排好序的有序表中，从而得到一个新的、记录数+1的有序表
        //时间复杂度---O(n^2)
        function insertSort(list) {
            for (let i = 1; i < list.length; i++) { //循环从第2个元素开始
                console.log('for i = ' + i);
                console.log('list = ' + list);
                if (list[i] < list[i - 1]) { //需将list[i]插入到有序子表
                    var temp = list[i];
                    for (var j = i - 1; j >= 0 && list[j] > temp; j--) { //有序列表的记录后移，填充list[i]的位置
                        console.log('for j = ' + j);
                        list[j + 1] = list[j];
                        console.log('list = ' + list);
                    }
                    console.log('final j  = ' + j);
                    list[j + 1] = temp; //插入到正确位置
                    console.log('final = ' + list);
                }
            }
        }
        var list = [4, 7, 8, 6, 5];
        console.log(list);
        insertSort(list);
        console.log(list);

        console.log('\n------希尔排序');
        //---希尔排序---对直接插入排序的改进

        //---归并排序

    },

    // start() {},

    // update (dt) {}
});