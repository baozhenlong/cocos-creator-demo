cc.Class({
    extends: cc.Component,

    properties: {
        egAudio: {
            default: [],
            url: [cc.AudioClip]
        }
    },

    onLoad() {
        //---使用AudioEngine播放音频
        //1---在脚本内定义一个audioClip资源对象
        //2---直接使用cc.audioEngine.play(filePath, loop, volume)播放

        //---audioEngine.play(filePath, loop = false, volume = 1)---播放音频剪辑
        //参数filePath（String）---音频剪辑
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

    audioHandle: function () {
        //---audioEngine.setLoop(audioId, loop)
        //设置音频是否循环
        //参数audioId（Number）---audio id
        //参数loop（Boolean）---是否循环
        cc.audioEngine.setLoop(this.egAudioId, true);

        //---audioEngine.isLoop(audioId)
        //获取音频的循环状态
        //参数audioId（Number）---audio id
        cc.audioEngine.isLoop(this.egAudioId);

        //---audioEngine.setVolume(audioId, volume)
        //设置音量
        //参数audioId（Number）---audio id
        //参数volume（Number）---音量：[0, 1]
        cc.audioEngine.setVolume(this.egAudioId, 1);

        //---audioEngine.getVolume(audioId)
        //获取音量
        //参数audioId（Number）---audio id
        var volume = cc.audioEngine.getVolume(this.egAudioId);

        //---audioEngine.pause(audioId)
        //暂停指定音频
        //参数audioId（Number）---audio id        
        cc.audioEngine.pause(this.egAudioId);

        //---audioEngine.pauseAll()
        //暂停正在播放的所有音频     
        cc.audioEngine.pauseAll();

        //---audioEngine.resume(audioId)
        //恢复指定音频
        //参数audioId（Number）---audio id        
        cc.audioEngine.resume(this.egAudioId);

        //---audioEngine.resumeAll()
        //恢复正在播放的所有音频      
        cc.audioEngine.resumeAll();

        //---audioEngine.stop()
        //停止指定音频   
        cc.audioEngine.stop(this.egAudioId);

        //---audioEngine.stopAll()
        //停止正在播放的所有音频
        cc.audioEngine.stopAll();
    }

    // start () {

    // },

    // update (dt) {},
});