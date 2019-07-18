//---v1.10资源升级指南
{
    //兼容RawAsset
    {
        var file = {};
        //RawAsset调整为Asset，本质上无非就是从引擎层面把字符串转变成对象
        //只要保证跟引擎交互时，所使用的是对象即可
        //Asset转字符串
        {
            //对于Texture2D，RawAsset，AudioClip，ParticleAsset类型的资源来说，
            //可以直接通过.nativeUrl获得原有的URL
            //如果无法获取，则说明这是其他类型的Asset对象，其他类型的对象就不用升级，所以不用修改
            var url = file.nativeUrl || file
        }
        //字符串转Asset
        {
            var music_url = '';
            cc.loader.loadRes(music_url, cc.AudioClip, function (err, audioClip) {
                console.log(typeof audioClip);
                //'object'
            });
        }

        //不支持url类型
        var old_audio_bg_music = {
            default: null,
            url: cc.AudioClip
        };
        //将url改为type，并且确保default为null
        var new_audio_bg_music = {
            default: null,
            type: cc.AudioClip
        };
        //注意：如果原先定义的类型是cc.RawAsset，除了修改url为type，连带类型也应该改为cc.Asset
        var old_manifest = {
            default: null,
            url: cc.RawAsset
        };
        var new_manifest = {
            default: null,
            type: cc.Asset
        };
    }
    //cc.TextAsset：用于加载文本文件
    {
        //常见的文本格式：.txt，.plist，.xml，.json，.csv，.yaml，.ini，.md
        //都会导入为cc.TextAsset
        //声明：
        var file = {
            default: null,
            type: cc.TextAsset
        };
        //读取
        var text = file.text;
    }
    //cc.JsonAsset：用于加载JSON文件
    {
        //项目assets文件夹下的所有.json(不含发布后的imports目录)，都会导入为cc.JsonAsset
        cc.loader.loadRes('config/npc', function (err, asset) {
            var json = asset.json;
        });
        //直接读取
        {
            //声明
            var npc = {
                default: null,
                type: cc.JsonAsset
            };
            //读取
            var json = npc.json;
        }
    }
    //其余未知类型默认也全都导入为Asset
    {
        //对从编辑器导入的未知类型的文件来说，原先都是导入为无类型的cc.RawAsset，现在会导入为cc.Asset
        //声明：
        var asset = {
            default: null,
            type: cc.Asset
        };
        //访问：
        var url = asset.nativeUrl;
    }
}