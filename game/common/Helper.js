
class Helper {

    static regul(self, err, kp, kd, ki, kia = 15) {
        // regulation algorithm
        // self, must be an object which will be used to store variables (use 'this')
        // kp, kd and ki are weight variables
        // kp: short time variation
        // kd: medium time variation
        // ki: long time variation
        // kia: number of values used for average
        if (!self.__p_err) {
            self.__err_average = err; // average err
            self.__p_err = err; // previous err
        }
        self.__err_average = (self.__err_average * kia + err) / (kia + 1);
        var res = (kp * err) + kd * (err - self.__p_err) + (ki * self.__err_average);
        self.__p_err = err;
        return res;
    }

    static moveInDirection(pos, bearing, speed, time_elapsed) {
        var dir_x = Math.cos(bearing) * speed;
        var dir_y = Math.sin(bearing) * speed;
        if (time_elapsed >= 1) {
            // we dont want to go further than target
            time_elapsed = 1;
        }
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

    static onInterval(self, name, time_sec) {
        // returns true every 'time_sec', else return false
        // name will be used as an identifier
        // self, must be an object which will be used to store variables (use 'this')
        var id = "__interval_" + name;
        if (!(id in self) || Date.now() > self[id]) {
            self[id] = Date.now() + time_sec * 1000;
            return true;
        }
        return false;
    }
}

if (typeof module != 'undefined') {
    module.exports = Helper;
}
