//使用AudioEngine播放
//1---在脚本内定义一个audioClip资源对象
//2---直接使用cc.audioEngine.play(path, loop, volume)播放
cc.Class({
    extends: cc.Component,

    properties: {
        egAudio: {
            default: [],
            url: [cc.AudioClip]
        }
    },

    onLoad() {
        //1---play()---播放音频剪辑
        //参数path（String）---音频剪辑
        //可选参数loop（Boolean）---是否循环播放，默认为false
        //参数volume（Number）---音量，默认为1
        //返回值audioID（Number）---可以通过这个audioID来操作这个音频对象
        console.log('typeof egAudio = ' + (typeof this.egAudio[0])); //string
        console.log('egAudio = ' + this.egAudio[0]); //res/raw-assets/resources/audio/bomb.mp3
        //1.1---使用url播放
        var url = 'resources/audio/bomb.mp3';
        var realUrl = cc.url.raw(url);
        console.log('realUrl = ' + realUrl); //res/raw-assets/resources/audio/bomb.mp3
        this.egAudioId = cc.audioEngine.play(realUrl);
        cc.audioEngine.setVolume(this.egAudioId, 0.5);
        console.log('this.egAudioId volume = ' + cc.audioEngine.getVolume(this.egAudioId)); //0.5
        console.log('this.egAudioId = ' + this.egAudioId); //0
        //1.2---使用cc.AudioClip播放
        console.log(cc.audioEngine.play(this.egAudio[2], false, 1)); //1        
        console.log(cc.audioEngine.play(this.egAudio[1], false, 1)); //2
    },

    audioHandle: function() {
        //2---setLoop(audioId, loop)---设置音频是否循环
        //参数audioId（Number）---audio id
        //参数loop（Boolean）---是否循环
        cc.audioEngine.setLoop(this.egAudioId, true);
        //3---isLoop(audioId)---获取音频的循环状态
        //参数audioId（Number）---audio id
        cc.audioEngine.isLoop(this.egAudioId);
        //4---setVolume(audioId, volume)---设置音量
        //参数audioId（Number）---audio id
        //参数volume（Number）---音量
        cc.audioEngine.setVolume(this.egAudioId, 1);
        //5---getVolume(audioId)---获取音量
        //参数audioId（Number）---audio id
        var volume = cc.audioEngine.getVolume(this.egAudioId);
        //6---pause(audioId)---暂停指定音频
        //参数audioId（Number）---audio id        
        cc.audioEngine.pause(this.egAudioId);
        //7---pauseAll(audioId)---暂停正在播放的所有音频
        //参数audioId（Number）---audio id        
        cc.audioEngine.pauseAll();
        //8---resume(audioId)---恢复指定音频
        //参数audioId（Number）---audio id        
        cc.audioEngine.resume(this.egAudioId);
        //9---resumeAll(audioId)---恢复正在播放的所有音频
        //参数audioId（Number）---audio id        
        cc.audioEngine.resumeAll();
        //10---stop()---停止指定音频   
        cc.audioEngine.stop(this.egAudioId);
        //11---stopAll(audioId)---停止正在播放的所有音频
        //参数audioId（Number）---audio id   
        cc.audioEngine.stopAll(this.egAudioId);
    }

    // start () {

    // },

    // update (dt) {},
});