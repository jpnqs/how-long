

class SoundClip {
    constructor(src, loop = false) {
        this.sound = new Audio(src);
        this.sound.loop = loop;
    }

    play() {
        this.sound.play();
        // auto pause after playing
        if (!this.sound.loop) {
            this.sound.onended = () => {
                this.stop();
            }
        }
    }

    stop() {
        this.sound.pause();
    }
}