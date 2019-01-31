
function __loadAudio(name, loop = false) {
    var audio = new Audio("../res/sounds/" + name);
    audio.loop = loop;
    audio.oncanplaythrough = function () {
        g_loaded_res_counter += 1;
    };
    return audio;
}

class ResAudio {
    constructor(src, loop = false) {
        if (src instanceof Audio) {
            this._audio = src;
        } else {
            this._audio = __loadAudio(src);
        }
        this._loop = loop;
        this._audio.loop = loop;
    }

    setVolume(vol) {
        this._audio.volume = volume;
    }

    clone() {
        return new ResAudio(this._audio.cloneNode(), this._loop);
    }

    play() {
        this._audio.play();
    }
}
