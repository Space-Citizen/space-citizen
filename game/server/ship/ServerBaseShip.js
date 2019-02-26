
class ServerBaseShip {

    getSpeed() {
        // m/s
        return 60;
    }

    getInertiaLength() {
        // start slow down at
        return 20;
    }

    getStopTargetDist() {
        return 2;
    }

    getType() {
        throw new Error("Method 'getType()' must be implemented.");
    }
}

module.exports = ServerBaseShip;