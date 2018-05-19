cc.Class({
    extends: cc.Component,

    properties: {

    },

    ctor: function() {
        console.log('------anim-mgr ctor');
        this.animCacheObj = {};
    },

    getAnim: function(animName) {
        return this.animCacheObj[animName];
    },

    animHandle: function(animName, animNode) {
        if (this.animCacheObj.hasOwnProperty(animName)) {
            console.log('------anim-mgr animHandle has');
        } else {
            console.log('------anim-mgr animHandle retain');
            this.animCacheObj[animName] = animNode;
        }
    },

    releaseAnim: function(animName, animNode) {
        console.log('------anim-mgr releaseAnim');
        if (!this.animCacheObj[animName]) {
            delete this.animCacheObj[animName];
        }
        if (animNode.isValid) {
            animNode.destroy();
        }
    },

    playAnim: function(animName, isStopCurAnim = false) {
        console.log('------anim-mgr playAnim');
        var animNode = this.getAnim(animName);
        if (isStopCurAnim) {
            this.stopCurAnim();
        }
        if (animNode && animNode.isValid) {
            console.log('------anim-mgr playAnim cache');
            this.playHandle(animName, animNode);
            return;
        }
        if (animNode && animNode.isValid === false) {
            this.releaseAnim(animName, animNode);
        }
        this.createAnim(animName, animNode);
    },

    createAnim: function(animName, animNode) {
        console.log('------anim-mgr createAnim');
        var self = this;
        cc.loader.loadRes('anim/' + animName, function(err, res) {
            if (err) {
                console.log('------anim-mgr createAnim err');
                return;
            } else {
                console.log('------anim-mgr createAnim successful animName = ' + animName);
                let animNode = cc.instantiate(res);
                self.playHandle(animName, animNode);
            }
        });
    },

    playHandle: function(animName, animNode) {
        console.log('------anim-mgr playHandle')
        this.animHandle(animName, animNode);
        var parent = cc.director.getScene().getChildByName('Canvas');
        animNode.parent = parent;
        this.curAnim = animNode.getComponent(cc.Animation);
        var animClips = this.curAnim.getClips();
        this.curAnim.on('finished', this.onStop, animNode);
        this.curAnim.play(animClips[0].name);
    },

    onStop: function() {
        console.log('------anim-mgr onStop this.name = ' + this.name);
        this.parent = null;
    },

    stopCurAnim: function() {
        console.log('------anim-mgr stopCurAnim this.curAnim = ' + this.curAnim);
        if (this.curAnim) {
            this.curAnim.stop();
            this.curAnim.node.parent = null;
        }
    },

});