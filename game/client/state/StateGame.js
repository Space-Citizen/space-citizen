class StateGame extends IState {
    onInit() {
        this.socket = io.connect(Constants.SERVER);
        //console.log(this.socket);
        this.socket.on(Events.CONNECT, this.eventConnect.bind(this));
        this.socket.on(Events.DISCONNECT, this.eventDisconnect.bind(this));
        this.socket.on(Events.SERVER_UPDATE_ENTITIES, this.eventUpdateEntities.bind(this));
        this.socket.on(Events.SERVER_DELETE_ENTITY, this.eventDeleteEntity.bind(this));
        this.socket.on(Events.SERVER_RESET_MAP, this.eventResetMap.bind(this));

        this.initWorld();
    }

    initWorld() {
        this.entities = {};
        this.target = null;
    }

    runOnEntities(func) {
        var entities = this.entities;
        for (var key in entities) {
            if (entities.hasOwnProperty(key)) {
                var entity = entities[key];
                func(entity);
            }
        }
    }


    targetEntityAt(world_pos) {
        // target closest entity from mouse pos
        var min_dist = null;
        var res = null;
        this.runOnEntities(function (entity) {
            var dist = Helper.dist(world_pos, entity.pos);
            if (dist < entity.hitCircle()) {
                if (min_dist == null || (min_dist != null && dist < min_dist)) {
                    min_dist = dist;
                    res = entity;
                }
            }
        });
        this.target = res;
        return res != null;
    }

    onUpdate(timeElapsed) {
        if (this.id in this.entities) {
            this.self = this.entities[this.id];
            this.displayWorld();
            this.updateEntities(timeElapsed);

            if (mouse.right_click) {
                this.socket.emit(Events.PLAYER_MOVE_TO, this.worldPos(mouse));
            }
            if (mouse.left_click) {
                this.targetEntityAt(this.worldPos(mouse));
            }
            console.log(this.self);
        }
    }

    onDestroy() {
        this.socket.disconnect(true);
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
        if (id in this.entities) {
            this.entities[id].onDestroy();
            delete this.entities[id];
        }
        else {
            console.log("Error eventDeleteEntity " + id + " does not exist");
        }
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
            if (entity.id != this.self.id) {
                entity.onUpdate(timeElapsed);
            }
        }
        this.self.onUpdate(timeElapsed);
    }

    eventResetMap() {
        this.initWorld();
    }


    relPos(pos) {
        // convert world pos to screen pos
        // Constants.SCREEN_RATIO
        var res = new Position(
            (pos.x - this.self.pos.x) / Constants.X_VIEW_RANGE * canvas.width + canvas.width / 2,
            (pos.y - this.self.pos.y) / Constants.X_VIEW_RANGE * (canvas.height * Constants.SCREEN_RATIO) + canvas.height / 2
        );
        return res;
    }

    worldPos(pos) {
        // convert screen pos to world
        var res = new Position(
            (pos.x - canvas.width / 2) * Constants.X_VIEW_RANGE / canvas.width + this.self.pos.x,
            (pos.y - canvas.height / 2) * Constants.X_VIEW_RANGE / (canvas.height * Constants.SCREEN_RATIO) + this.self.pos.y
        );
        return res;
    }

    displayWorld() {
        ressources.BACKGROUND_SPACE.drawCenterAt(canvas.width / 2, canvas.height / 2);
        if (this.target) {
            var screen_pos = this.relPos(this.target.pos);
            ressources.TARGET_BLUE.drawCenterAt(screen_pos.x, screen_pos.y);
        }
    }
}
