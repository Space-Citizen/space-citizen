class StateGame extends IState {
    onInit() {
        this.socket = io.connect(Constants.SERVER);
        this.socket.on(Events.CONNECT, this.eventConnect.bind(this));
        this.socket.on(Events.DISCONNECT, this.eventDisconnect.bind(this));
        this.socket.on(Events.SERVER_UPDATE_ENTITIES, this.eventUpdateEntities.bind(this));
        this.socket.on(Events.SERVER_DELETE_ENTITY, this.eventDeleteEntity.bind(this));
        this.initWorld();
    }

    initWorld() {
        this.entities = {};
    }

    eventConnect() {
        this.initWorld();
        this.id = this.socket.io.engine.id;
        console.log("connected as " + this.id);
    }

    eventDisconnect() {
        console.log("Disconnected");
    }

    eventDeleteEntity(id) {
        this.entities[id].onDestroy();
        delete this.entities[id];
    }

    eventUpdateEntities(entities_info) {
        //async >> await sleep(1000);
        for (var x in entities_info) {
            var server_entity = entities_info[x];
            if (!(server_entity.id in this.entities)) {
                this.entities[server_entity.id] = createEntity(server_entity, this);
            }
            this.entities[server_entity.id].onServerUpdate(server_entity);
        }
    }

    updateEntities(timeElapsed) {
        for (var key in this.entities) {
            var entity = this.entities[key];
            entity.onUpdate(timeElapsed);
        }
    }

    onUpdate(timeElapsed) {
        if (this.id in this.entities) {
            this.self = this.entities[this.id];
            this.displayWorld();
            this.updateEntities(timeElapsed);

            console.log(mouse.left_click);
            if (mouse.left_click) {
                this.socket.emit(Events.PLAYER_MOVE_TO, this.worldPos(mouse));
            }
        }
    }

    onDestroy() {
        this.socket.disconnect(true);
    }


    relPos(pos) {
        // convert world pos to screen pos
        // Constants.SCREEN_RATIO
        var res = new Position(
            (pos.x - this.self.pos.x) * canvas.width + canvas.width / 2,
            (pos.y - this.self.pos.y) * (canvas.height * Constants.SCREEN_RATIO) + canvas.height / 2
        );
        return res;
    }

    worldPos(pos) {
        // convert screen pos to world
        var res = new Position(
            (pos.x - canvas.width / 2) / canvas.width + this.self.pos.x,
            (pos.y - canvas.height / 2) / (canvas.height * Constants.SCREEN_RATIO) + this.self.pos.y
        );
        return res;
    }

    displayWorld() {
        ressources.BACKGROUND.drawCenterAt(canvas.width / 2, canvas.height / 2);
    }
}
