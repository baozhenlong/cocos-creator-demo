//localStorage
//1---localStorage.setItem(key,value)---存储数据，将value存储到key字段
//参数key（String）---用来索引的字符串键值
//参数value（String）---要保存的字符串数据
//2---localStorage.getItem(key)---读取数据，获取指定key本地存储的值；没有返回null
//参数key（String）---获取数据对应的字符串键值
//3---localStorage.removeItem(key)---移除键值对，删除指定key本地存储的值
//参数key（String）---删除数据对应的字符串键值
//4---localStorage.clear()---清除所有的key值;
//5---localStorage.length---获取本地存储key的个数;
//6---localStorage.key(i)---按照序号读取本地存储变量的key值
//访问所有数据
// for (var i = 0; i < cc.sys.localStorage.length; i++) {
//     console.log('i = ' + i + ' key = ' + cc.sys.localStorage.key(i));
// }
var localStorageMgr = {
    setData: function(key, value) {
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    },
    getData: function(key) {
        return JSON.parse(cc.sys.localStorage.getItem(key));
    },
    removeData: function(key) {
        cc.sys.localStorage.removeItem(key);
    },

    setBgmVolume: function(value) {
        this.setData('bgmVolume', value);
    },
    getBgmVolume: function() {
        return this.getData('bgmVolume');
    },
    setSfxVolume: function(value) {
        this.setData('sfxVolume', value);
    },
    getSfxVolume: function() {
        return this.getData('sfxVolume');
    },
    setBagRedTip: function(value) {
        this.setData('bagRedTip', value);
    },
    getBagRedTip: function(value) {
        return this.getData('bagRedTip');
    },
    setNobleRedTip: function(value) {
        this.setData('nobleRedTip', value);
    },
    getNobleRedTip: function(value) {
        return this.getData('nobleRedTip');
    }

};
module.exports = localStorageMgr;