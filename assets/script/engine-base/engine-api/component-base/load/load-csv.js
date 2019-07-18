let data = new Map();
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        let self = this;
        let url = 'csv/tips';
        cc.loader.loadRes(url, function (err, res) {
            if (err) {
                console.log('[加载csv失败]------');
            } else {
                console.log('[加载csv成功]------typeof res =', (typeof res));
                //res是一个string
                console.log('[加载csv成功]------res =', res);
                //解析换行符---每行以换行符分隔
                let data_arr = res.text.split('\n');
                //解析标号---每列以逗号分隔
                let idx_obj = {};
                let idx = 0;
                //以索引号存储标题
                for (let value of data_arr[0].trim().split(',')) {
                    idx_obj[value] = idx++;
                }
                //剔除标题
                console.log('[加载csv成功]------title =', idx_obj);
                //{"id":0,"":1,"text":2}
                data_arr.shift();
                let parse_data = [];
                for (let value of data_arr) {
                    parse_data.push(value.trim().split(','));
                }
                console.log('[加载csv成功]------parse_data =', parse_data);
                //[["1","","技能可以在房间内使用珍珠购买哦！"],["2","","野蛮打击、集结号角可以在房间内使用珍珠购买哦！"]]
                self.on_load(idx_obj, parse_data);
            }
        });
    },

    on_load: function (idx_obj, parse_data) {
        //通过标题索引获取数据
        for (let value of parse_data) {
            let id = value[idx_obj["id"]];
            if (id == '') {
                continue;
            }
            let obj = {};
            obj.text = value[idx_obj['text']];
            data.set(id, obj);
        }
        for (let [key, value] of data) {
            console.log('[csv数据]------key =', key, ',value =', value);
        }
    }

    // start () {s

    // },

    // update (dt) {},
});