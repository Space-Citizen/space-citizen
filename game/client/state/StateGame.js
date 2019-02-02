

class StateGame extends IState {
    onInit() {
        this.socket = io.connect(Constants.SERVER);
        this.socket.on(Events.CONNECT, this.eventConnect.bind(this));
        this.socket.on(Events.DISCONNECT, this.eventDisconnect.bind(this));
        this.socket.on(Events.SERVER_UPDATE_ENTITIES, this.eventUpdateEntities.bind(this));
        this.socket.on(Events.SERVER_DELETE_ENTITY, this.eventDeleteEntity.bind(this));
        this.socket.on(Events.SERVER_KILL_ENTITY, this.eventKillEntity.bind(this));
        this.socket.on(Events.SERVER_RESET_MAP, this.eventResetMap.bind(this));
        this.socket.on(Events.SERVER_CALL_FUNCTION, this.eventServerCallFunction.bind(this));

        this.playerAuth();
        this.initWorld();

        this.aim = this.manager.addUi("aim", new UiAim(this));
    }

    playerAuth() {
        // get the token from the url
        var url_params = {}
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            url_params[key] = value;
        });
        // send it to the server
        this.socket.emit(Events.PLAYER_AUTH, url_params['x-access-token']);
    }

    initWorld() {
        this.pos = new Position(0, 0);
        this.entities = {};
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

    onUpdate(time_elapsed) {
        if (this.id in this.entities) {
            this.self = this.entities[this.id];
            this.pos.x = this.self.pos.x; // this.self.pos will be changed during the execution of the code below
            this.pos.y = this.self.pos.y; // this is why I m saving it now, to prevent shifting during the display
            this.updateEntities(time_elapsed);
        } else {
            ressources.NO_SIGNAL.drawCenterAt(canvas.width / 2, canvas.height / 2);
        }
    }

    playerCallFunction(func_name, ...args) {
        if (this.self) {
            this.socket.emit(Events.PLAYER_CALL_FUNCTION, func_name, ...args);
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
            this.entities[id].delete();
        }
    }

    eventKillEntity(id) {
        if (id in this.entities) {
            this.entities[id].kill();
        }
    }

    eventServerCallFunction(entity_id, func_name, ...args) {
        if (!(entity_id in this.entities)) {
            console.error("eventServerCallFunction: entity " + entity_id + " not found");
            return;
        }
        var entity = this.entities[entity_id];
        entity[func_name](...args);
    }

    eventUpdateEntities(entities_info) {
        //async >> await sleep(1000);
        for (var x in entities_info) {
            var server_entity = entities_info[x];
            if (!(server_entity.id in this.entities)) {
                createEntity(server_entity, this);
            }
            this.entities[server_entity.id].onServerUpdate(server_entity);
        }
    }

    addEntity(entity) {
        this.entities[entity.id] = entity;
    }

    deleteEntity(id) {
        if (id in this.entities) {
            delete this.entities[id];
        }
        else {
            console.log("Error eventDeleteEntity " + id + " does not exist");
        }
    }

    updateEntities(time_elapsed) {
        var entities = this.entities;
        var keys = Object.keys(entities);
        // TODO OPTIMIZE?
        keys.sort(function (a, b) {
            var ent_a = entities[a];
            var ent_b = entities[b];
            var priority = ent_a.getPriority() - ent_b.getPriority();
            if (priority != 0) {
                return (priority);
            }
            return ent_a.pos.y - ent_b.pos.y;

        });

        var arrayLength = keys.length;
        for (var x = 0; x < arrayLength; x++) {
            var key = keys[x];
            if (entities.hasOwnProperty(key)) {
                var entity = entities[key];
                if (entity.id != this.self.id) {
                    entity.onUpdate(time_elapsed);
                }
            }
        }
        this.self.onUpdate(time_elapsed);
    }

    eventResetMap() {
        //ressources.SOUND_HYPERWINDOW.clone().play();
        this.initWorld();
    }

    relPos(pos) {
        // convert world pos to screen pos
        // Constants.SCREEN_RATIO
        var res = new Position(
            (pos.x - this.pos.x) / Constants.X_VIEW_RANGE * canvas.width + canvas.width / 2,
            (pos.y - this.pos.y) / Constants.X_VIEW_RANGE * (canvas.height * Constants.SCREEN_RATIO) + canvas.height / 2
        );
        return res;
    }

    worldPos(pos) {
        // convert screen pos to world
        var res = new Position(
            (pos.x - canvas.width / 2) * Constants.X_VIEW_RANGE / canvas.width + this.pos.x,
            (pos.y - canvas.height / 2) * Constants.X_VIEW_RANGE / (canvas.height * Constants.SCREEN_RATIO) + this.pos.y
        );
        return res;
    }
}
