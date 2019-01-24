
class Helper {
    static dist(pos_a, pos_b) {
        var a = Math.pow(pos_b.y - pos_a.y, 2) + Math.pow(pos_b.x - pos_a.x, 2);
        return Math.sqrt(a);
    }
    static map(x, sA, eA, sB, eB) {
        return ((((sA - x) / (sA - eA)) * (eB - sB)) + sB);
    }
}

if (typeof module != 'undefined') {
    module.exports = Helper;
}
