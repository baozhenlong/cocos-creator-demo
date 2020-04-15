cc.Class({
    extends: cc.Component,

    properties: {
        bgmVolume: 1.0,
        sfxVolume: 1.0,
        bgmAudioId: -1
    },

    ctor: function() {

    },

    onLoad() {},

    init: function() {
        //初始化volume
        var bgmV = localStorageMgr.getBgmVolume();
        if (bgmV) {
            this.bgmVolume = bgmV;
        }
        var sfxV = localStorageMgr.getSfxVolume();
        if (sfxV) {
            this.bgmVolume = sfxV;
        }
    },

    //播放背景音乐
    playBgm: function(audioClip) {
        if (this.bgmAudioId >= 0) {
            cc.audioEngine.stop(this.bgmAudioId);
        }
        this.bgmAudioId = cc.audioEngine.play(audioClip, true, this.bgmVolume);
        return this.bgmAudioId;
    },

    //播放音效
    playSfx: function(audioClip) {
        return cc.audioEngine.play(audioClip, false, this.sfxVolume);
    },

    setBgmVolume: function(value) {
        if (value !== this.bgmVolume) {
            localStorageMgr.setBgmVolume(value);
            this.bgmVolume = value;
            cc.audioEngine.setVolume(this.bgmAudioId, value);
        }
    },

    setSfxVolume: function(value) {
        if (this.sfxVolume !== value) {
            localStorage.setSfxVolume(value);
            this.sfxVolume = value;
        }
    }

    // start () {

    // },

    // update (dt) {},
});