class UiMinimap extends BaseUi {
    onInit() {
        this.game = this.state;
        // constants
        this.minimap_margin = 10;
        this.minimap_pos_top_left = undefined;
        this.minimap_size = undefined;
        this.minimap_pos_bottom_right = undefined;
        this.current_destination = undefined;
        this.current_self_position = undefined;
        this.setMinimapPosition();
    }

    setMinimapPosition() {
        this.minimap_pos_top_left = {
            x: canvas.width - ressources.MINIMAP_BACKGROUND_EARTH.size().x - this.minimap_margin,
            y: canvas.height - ressources.MINIMAP_BACKGROUND_EARTH.size().y - this.minimap_margin
        };
        this.minimap_size = ressources.MINIMAP_BACKGROUND_EARTH.size();
        this.minimap_pos_bottom_right = {
            x: this.minimap_pos_top_left.x + this.minimap_size.x,
            y: this.minimap_pos_top_left.y + this.minimap_size.y
        };
    }

    onMouseLeftClick() {
        // check if click is in the minimap
        if (mouse.x >= this.minimap_pos_top_left.x && mouse.y >= this.minimap_pos_top_left.y
            && mouse.x <= this.minimap_pos_bottom_right.x && mouse.y <= this.minimap_pos_bottom_right.y) {
            var mousePosInMinimap = {
                x: mouse.x - this.minimap_pos_top_left.x,
                y: mouse.y - this.minimap_pos_top_left.y
            };
            var worldPos = {
                x: (Constants.WORLD_SIZE_X * mousePosInMinimap.x) / this.minimap_size.x,
                y: (Constants.WORLD_SIZE_Y * mousePosInMinimap.y) / this.minimap_size.y
            };
            this.game.playerCallFunction("playerMoveTo", worldPos);
            this.current_destination = { x: mouse.x, y: mouse.y };
            return (true);
        }
        this.current_destination = undefined;
    }

    onMouseRightClick() {
        // return bool (true to override click)
    }

    displayCurrentDestination() {
        if (!this.current_destination || !this.current_self_position)
            return;
        context.beginPath();
        context.moveTo(this.current_self_position.x, this.current_self_position.y);
        context.lineTo(this.current_destination.x, this.current_destination.y);
        context.stroke();
    }

    displayViewDistance(entityPos) {
        var viewDistance = {
            x: (this.minimap_size.x * Constants.X_VIEW_RANGE) / Constants.WORLD_SIZE_X,
            y: (this.minimap_size.y * Constants.X_VIEW_RANGE / Constants.SCREEN_RATIO) / Constants.WORLD_SIZE_Y,
        };
        context.strokeStyle = "white";
        context.rect(entityPos.x - viewDistance.x / 2, entityPos.y - viewDistance.y / 2, viewDistance.x, viewDistance.y);
        context.stroke();
    }

    displayMinimap() {
        if (!this.game.entities)
            return;
        // display minimap background
        ressources.MINIMAP_BACKGROUND_EARTH.drawAt(this.minimap_pos_top_left.x, this.minimap_pos_top_left.y);
        // for each entity
        for (var index in this.game.entities) {
            const entity = this.game.entities[index];
            var ressource = undefined;
            // get the ressource
            switch (entity.type) {
                case "stargate":
                    ressource = ressources.MINIMAP_STARGATE;
                    break;
                case "player":
                    ressource = ressources.MINIMAP_PLAYER;
                    break
                default:
                    break;
            }
            if (!ressource)
                continue;
            var entityPos = {
                x: ((this.minimap_size.x * entity.s_pos.x) / Constants.WORLD_SIZE_X) + this.minimap_pos_top_left.x,
                y: ((this.minimap_size.y * entity.s_pos.y) / Constants.WORLD_SIZE_Y) + this.minimap_pos_top_left.y
            }
            // draw the ressource
            ressource.drawCenterAt(entityPos.x, entityPos.y)
            // if entity is self, draw the view distance
            if (entity.id === this.game.self.id) {
                this.current_self_position = entityPos;
                this.displayViewDistance(entityPos);
            }
        };
        this.displayCurrentDestination();
    }
    onResize() {
        console.log("resized");
        this.setMinimapPosition();
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        this.displayMinimap();
    }
}