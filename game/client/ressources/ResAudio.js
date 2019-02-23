
function __loadAudio(name, loop = false) {
    var audio = new Audio("/game/res/sounds/" + name);
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

    setVolume(volume) {
        this._audio.volume = volume;
    }

    clone() {
        var res = new ResAudio(this._audio.cloneNode(), this._loop);
        res.setVolume(this._audio.volume);
        return res;
    }

    play() {
        this._audio.play();
    }
}
