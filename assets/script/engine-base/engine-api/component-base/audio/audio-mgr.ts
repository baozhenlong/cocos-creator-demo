
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioMgr extends cc.Component {

    @property({
        type: cc.AudioClip
    })
    audioClip: cc.AudioClip = null;

    private audioID: number = -1;

    play(): void {
        this.audioID = cc.audioEngine.play(this.audioClip, true, 1);
    }

    resume(): void {
        if (this.audioID !== -1) {
            let state: cc.audioEngine.AudioState = cc.audioEngine.getState(this.audioID);
            cc.log('resume state', state);
            if (state === cc.audioEngine.AudioState.PAUSED) {
                cc.audioEngine.resume(this.audioID);
            }
        }
    }

    pause(): void {
        if (this.audioID !== -1) {
            let state: cc.audioEngine.AudioState = cc.audioEngine.getState(this.audioID);
            cc.log('pause state', state);
            if (state === cc.audioEngine.AudioState.PLAYING) {
                cc.audioEngine.pause(this.audioID);
            }
        }
    }

    loopPauseResume(): void {
        if (this.audioID !== -1) {
            // notice
            // 状态改变需要一定时间
            let state: cc.audioEngine.AudioState = cc.audioEngine.getState(this.audioID);
            cc.log('state', state);
            if (state === cc.audioEngine.AudioState.PLAYING) {
                cc.audioEngine.pause(this.audioID);
                cc.audioEngine.resume(this.audioID);
                cc.log('loop 瞬时暂停恢复后状态', cc.audioEngine.getState(this.audioID)); // 1
                this.scheduleOnce(() => {
                    cc.log('loop 瞬时暂停恢复后状态 0.1 ', cc.audioEngine.getState(this.audioID)); // -1
                }, 0.1);
            }
            // if (state === cc.audioEngine.AudioState.PLAYING) {
            //     cc.audioEngine.pause(this.audioID);
            //     cc.log('loop 第一次暂停后状态', cc.audioEngine.getState(this.audioID));
            // }
            // if (state === cc.audioEngine.AudioState.PAUSED) {
            //     cc.audioEngine.resume(this.audioID);
            //     cc.log('loop 第一次恢复后状态', cc.audioEngine.getState(this.audioID));
            // }
            // if (state === cc.audioEngine.AudioState.PLAYING) {
            //     cc.audioEngine.pause(this.audioID);
            //     cc.log('loop 第二次暂停后状态', cc.audioEngine.getState(this.audioID));
            // }
            // 最后状态不一定是暂停
        }
    }
}
