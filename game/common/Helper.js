
class Helper {

    static moveInDirection(pos, bearing, speed, time_elapsed) {
        var dir_x = Math.cos(bearing) * speed;
        var dir_y = Math.sin(bearing) * speed;
        pos.x += dir_x * time_elapsed;
        pos.y += dir_y * time_elapsed;
    }

    static getDirection(pos_a, pos_b) {
        // get direction (angle) from pos_a to pos_b
        var m = (pos_a.y - pos_b.y) / (pos_a.x - pos_b.x);
        var ang = Math.atan(m);
        if (pos_a.x > pos_b.x) {
            ang += Math.PI;
        }
        return ang;
    }

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

    static isInt(n) {
        return n % 1 === 0;
    }

    static randint(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

if (typeof module != 'undefined') {
    module.exports = Helper;
}
