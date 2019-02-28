class UiMinimap extends BaseUi {
    onInit() {
        this.game = this.state;
        this.minimap_margin = 10;
        this.minimap_pos_top_left = null;
        this.minimap_size = null;
        this.minimap_pos_bottom_right = null;
        this.current_destination = null;
        this.resetMinimapPosition();
        window.addEventListener("resize", this.onResize.bind(this));
    }

    worldPosToMinimap(world_pos) {
        var pos = {
            x: ((this.minimap_size.x * world_pos.x) / Constants.WORLD_SIZE_X) + this.minimap_pos_top_left.x,
            y: ((this.minimap_size.y * world_pos.y) / Constants.WORLD_SIZE_Y) + this.minimap_pos_top_left.y
        }
        return pos;
    }

    minimapPosToWorld(minimap_pos) {
        var world_pos = {
            x: (Constants.WORLD_SIZE_X * minimap_pos.x) / this.minimap_size.x,
            y: (Constants.WORLD_SIZE_Y * minimap_pos.y) / this.minimap_size.y
        };
        return world_pos;
    }

    resetMinimapPosition() {
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
            var world_pos = this.minimapPosToWorld(mousePosInMinimap);
            this.game.playerCallFunction("playerMoveTo", world_pos);
            this.current_destination = { x: mouse.x, y: mouse.y };
            return (true);
        }
        this.current_destination = null;
        return false;
    }

    onMouseRightClick() {
        // return bool (true to override click)
    }

    displayCurrentDestination() {
        if (!this.current_destination)
            return;
        var self_pos = this.worldPosToMinimap(this.game.self.s_pos);
        context.beginPath();
        context.moveTo(self_pos.x, self_pos.y);
        context.lineTo(this.current_destination.x, this.current_destination.y);
        context.stroke();
    }

    displayViewDistance() {
        var entity_pos = this.worldPosToMinimap(this.game.self.s_pos);
        var viewDistance = {
            x: (this.minimap_size.x * Constants.X_VIEW_RANGE) / Constants.WORLD_SIZE_X,
            y: (this.minimap_size.y * Constants.X_VIEW_RANGE / Constants.SCREEN_RATIO) / Constants.WORLD_SIZE_Y,
        };
        context.strokeStyle = "white";
        context.rect(entity_pos.x - viewDistance.x / 2, entity_pos.y - viewDistance.y / 2, viewDistance.x, viewDistance.y);
        context.stroke();
    }

    displayEntityOnMinimap(entity) {
        var ressource = null;
        // get the ressource
        switch (entity.type) {
            case "stargate":
                ressource = ressources.MINIMAP_STARGATE;
                break;
            case "player":
                ressource = ressources.MINIMAP_PLAYER;
                break
            default:
                return;
        }
        var entity_pos = this.worldPosToMinimap(entity.s_pos);
        ressource.drawCenterAt(entity_pos.x, entity_pos.y)
    }

    onResize() {
        this.resetMinimapPosition();
    }

    onUpdate(time_elapsed) {
        if (!this.game.self)
            return;
        // display minimap background
        ressources.MINIMAP_BACKGROUND_EARTH.drawAt(this.minimap_pos_top_left.x, this.minimap_pos_top_left.y);
        var that = this;
        this.game.runOnEntities(function (entity) {
            that.displayEntityOnMinimap(entity);
        });

        this.displayViewDistance();
        this.displayCurrentDestination();
    }
}