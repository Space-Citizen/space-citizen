class StateGame extends IState {
    onInit() {
        this.socket = io.connect(Constants.SERVER);
        this.socket.on(Events.CONNECT, this.eventConnect.bind(this));
        this.socket.on(Events.UPDATE_ENTITIES, this.eventUpdateEntities.bind(this));
        this.entities = {};
    }

    updateEntities(timeElapsed) {
        for (var key in this.entities) {
            var entity = this.entities[key];
            entity.onUpdate(timeElapsed);
        }
    }

    onUpdate(timeElapsed) {
        context.drawImage(ressources.BACKGROUND, 0, 0,
            ressources.BACKGROUND.width, ressources.BACKGROUND.height,
            0, 0, canvas.width, canvas.height);
        if (this.id in this.entities) {
            this.self = this.entities[this.id];
            this.displayWorld();
            this.updateEntities(timeElapsed);

            console.log(mouse.left_click);
            if (mouse.left_click) {
                this.socket.emit("mousePos", this.worldPos(mouse));
            }
        }
    }

    onDestroy() {
        this.socket.disconnect(true);
    }

    eventConnect() {
        this.id = this.socket.io.engine.id;
        console.log("connected as " + this.id);
    }

    eventUpdateEntities(entities_info) {
        //async >> await sleep(1000);
        for (var x in entities_info) {
            var server_entity = entities_info[x];
            if (!(server_entity.id in this.entities)) {
                this.entities[server_entity.id] = createEntity(server_entity);
            }
            this.entities[server_entity.id].onServerUpdate(server_entity);
        }
    }

    relPos(pos) {
        // convert world pos to screen pos
        var res = new Position(
            pos.x - this.self.pos.x + canvas.width / 2,
            pos.y - this.self.pos.y + canvas.height / 2
        );
        return res;
    }

    worldPos(pos) {
        // convert screen pos to world
        var res = new Position(
            pos.x + this.self.pos.x - canvas.width / 2,
            pos.y + this.self.pos.y - canvas.height / 2
        );
        return res;
    }

    displayEntity(entity) {
        context.beginPath();
        var screen_pos = this.relPos(entity.pos);
        //context.stroke();
        var img = entity.image;
        context.drawImage(img, screen_pos.x - img.width / 2, screen_pos.y - img.height / 2);
    }

    displayWorld() {
        for (var key in this.entities) {
            if (this.entities.hasOwnProperty(key)) {
                var entity = this.entities[key];
                this.displayEntity(entity);
                //entity.onUpdate(timeElapsed);
            }
        }
    }
}
