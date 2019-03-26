
class ServerBaseShip {

    getMaxHp() {
        return 100;
    }

    getSpeed() {
        // m/s
        return 60;
    }

    getInertiaLength() {
        // start slow down at
        return 15;
    }

    getStopTargetDist() {
        return 2;
    }

    getType() {
        throw new Error("Method 'getType()' must be implemented.");
    }
}

module.exports = ServerBaseShip;
