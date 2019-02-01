
class Helper {
    static accurateDist(pos_a, pos_b) {
        // accurate distance calculation (also very cpu expensive)
        var a = Math.pow(pos_b.y - pos_a.y, 2) + Math.pow(pos_b.x - pos_a.x, 2);
        return Math.sqrt(a);
    }

    static updateDict(dest, src) {
        for (var key in src) {
            dest[key] = src[key];
        }
        return dest;
    }

    static dist(pos_a, pos_b) {
        // optimized distance calculation (also less precise)
        var dx = Math.abs(pos_b.x - pos_a.x)
        var dy = Math.abs(pos_b.y - pos_a.y)
        return (1007 / 1024 * Math.max(dx, dy) + 441 / 1024 * Math.min(dx, dy));
    }

    static isFunc(variable) {
        if (typeof variable === "function") {
            return true;
        }
        return false;
    }

    static map(x, sA, eA, sB, eB) {
        return ((((sA - x) / (sA - eA)) * (eB - sB)) + sB);
    }
}

if (typeof module != 'undefined') {
    module.exports = Helper;
}
