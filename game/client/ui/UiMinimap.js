class UiMinimap extends BaseUi {
    onInit() {
        this.game = this.state;
        this.current_destination = null;
        this.current_world_type = null;
        this.minimap_background = null;
    }

    getPercentPos() {
        var size = this.getPercentSize();
        var margin = 1;
        // bottom right of screen
        return new Position(100 - size.x - margin, 100 - size.y - margin);
    }

    getPercentSize() {
        var size = 20;
        return new Position(size, size);
    }

    worldPosToMinimap(world_pos) {
        var pos = {
            x: ((this.size.x * world_pos.x) / Constants.WORLD_SIZE_X) + this.pos_top_left.x,
            y: ((this.size.y * world_pos.y) / Constants.WORLD_SIZE_Y) + this.pos_top_left.y
        }
        return pos;
    }

    minimapPosToWorld(minimap_pos) {
        var world_pos = {
            x: (Constants.WORLD_SIZE_X * minimap_pos.x) / this.size.x,
            y: (Constants.WORLD_SIZE_Y * minimap_pos.y) / this.size.y
        };
        return world_pos;
    }

    displayStargate(entity, entity_pos) {
        ressources.MINIMAP_STARGATE.drawCenterAt(entity_pos.x, entity_pos.y)
    }

    displayPlayer(entity, entity_pos) {
        var ressource = null;
        var self = this.game.self;
        // if self
        if (entity.id === self.id)
            ressource = ressources.MINIMAP_PLAYER;
        else if (entity.c_faction === self.c_faction) {
            ressource = ressources.MINIMAP_ALLY;
        }
        else {
            ressource = ressources.MINIMAP_HOSTILE;
        }
        ressource.drawCenterAt(entity_pos.x, entity_pos.y);
    }

    onMouseLeftClick() {
        // check if click is in the minimap
        if (this.isMouseInsideUi()) {
            var rel_mouse_pos = this.relMousePos();
            this.current_destination = this.minimapPosToWorld(rel_mouse_pos);;
            this.game.playerCallFunction("playerMoveTo", this.current_destination);
            return true;
        }
        this.current_destination = null;
        return false;
    }

    onMouseRightClick() {
        // return bool (true to override click)
    }

    displayCurrentDestination() {
        if (!this.current_destination || isOutsideMap(this.game.self.pos))
            return;
        var self_screen_pos = this.worldPosToMinimap(this.game.self.pos);
        var dest_screen_pos = this.worldPosToMinimap(this.current_destination);
        context.beginPath();
        context.moveTo(self_screen_pos.x, self_screen_pos.y);
        context.lineTo(dest_screen_pos.x, dest_screen_pos.y);
        context.stroke();
    }

    displayViewDistance() {
        var self_pos = this.game.self.pos;
        if (isOutsideMap(self_pos))
            return;
        var top_left = this.worldPosToMinimap(
            this.game.worldPos(new Position(0, 0))
        );
        var bottom_right = this.worldPosToMinimap(
            this.game.worldPos(new Position(canvas.width, canvas.height))
        );
        context.strokeStyle = "white";
        context.rect(
            top_left.x, top_left.y,
            bottom_right.x - top_left.x, bottom_right.y - top_left.y
        );
        context.stroke();
    }

    displayEntity(entity) {
        // get world position to minimap
        const entity_pos = this.worldPosToMinimap(entity.pos);
        // do not display if the position is outside of the map
        if (isOutsideMap(entity.pos))
            return;
        switch (entity.type) {
            case "stargate":
                this.displayStargate(entity, entity_pos);
                break;
            case "player":
                this.displayPlayer(entity, entity_pos);
                break;
        }
    }

    onUpdate(time_elapsed) {
        if (!this.game.self)
            return;
        // display minimap background
        if (this.game.entities.background) {
            var background_entity = this.game.entities.background;
            if (this.current_world_type != background_entity.world_type) {
                this.current_world_type = background_entity.world_type;
                this.minimap_background = background_entity.image.resize(
                    convertScreenPercentToWorldSize(this.getPercentSize().x)
                );
            }
        }
        if (this.minimap_background) {
            this.minimap_background.drawAt(this.pos_top_left.x, this.pos_top_left.y);
        }
        // update other elements:
        var that = this;
        this.game.runOnEntities(function (entity) {
            that.displayEntity(entity);
        });

        this.displayViewDistance();
        this.displayCurrentDestination();
    }
}