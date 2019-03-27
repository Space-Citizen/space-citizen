
class ServerBaseItem {

    constructor(entity_ship) {
        this.ship = entity_ship;
        this.onInit();
    }

    onInit() {

    }

    getType() {
        throw new Error("Method 'getType()' must be implemented.");
    }
}

module.exports = ServerBaseItem;
