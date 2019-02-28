class UiMinimap extends BaseUi {
    onInit() {
        this.game = this.state;
        this.minimap_percent_x = 20;
        this.minimap_margin = 10;
        this.minimap_size = null;
        this.minimap_pos_top_left = null;
        this.minimap_pos_bottom_right = null;
        this.current_destination = null;
        this.resetMinimapPosition();
        window.addEventListener("resize", this.onResize.bind(this));
        this.displayStargate = this.displayStargate.bind(this);
        this.displayPlayer = this.displayPlayer.bind(this);
        this.display_functions = {
            "stargate": this.displayStargate,
            "player": this.displayPlayer
        };
    }

    // Display functions

    displayStargate(entity, entity_pos) {
        ressources.MINIMAP_STARGATE.drawCenterAt(entity_pos.x, entity_pos.y)
    }

    displayPlayer(entity, entity_pos) {
        var ressource = null;

        // if self
        if (entity.id === this.game.self.id)
            ressource = ressources.MINIMAP_PLAYER;
        // if same faction
        else if (entity.s_faction === this.game.self.s_faction) {
            ressource = ressources.MINIMAP_ALLY;
        }
        // if enemy faction
        else if (entity.s_faction !== this.game.self.s_faction)
            ressource = ressources.MINIMAP_HOSTILE;

        if (ressource)
            ressource.drawCenterAt(entity_pos.x, entity_pos.y);
    }

    //

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
        this.minimap_size = new Position(
            convertPercentToScreen(this.minimap_percent_x),
            convertPercentToScreen(this.minimap_percent_x / Constants.SCREEN_RATIO),
        )
        this.minimap_pos_top_left = {
            x: canvas.width - this.minimap_size.x - this.minimap_margin,
            y: canvas.height - this.minimap_size.y - this.minimap_margin
        };
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
            this.current_destination = new Position(mouse.x, mouse.y);
            return (true);
        }
        this.current_destination = null;
        return false;
    }

    onMouseRightClick() {
        // return bool (true to override click)
    }

    isPlayerOutsideTheMap() {
        const player_pos = this.game.self.s_pos;

        if (player_pos.x < 0 || player_pos.x >= Constants.WORLD_SIZE_X
            || player_pos.y < 0 || player_pos.y >= Constants.WORLD_SIZE_Y)
            return (true);
        return (false);
    }

    displayCurrentDestination() {
        if (!this.current_destination || this.isPlayerOutsideTheMap())
            return;
        var self_pos = this.worldPosToMinimap(this.game.self.s_pos);
        context.beginPath();
        context.moveTo(self_pos.x, self_pos.y);
        context.lineTo(this.current_destination.x, this.current_destination.y);
        context.stroke();
    }

    displayViewDistance() {
        if (this.isPlayerOutsideTheMap())
            return;
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
        if (!this.display_functions[entity.type])
            return;
        // get world position to minimap
        const entity_pos = this.worldPosToMinimap(entity.s_pos);
        this.display_functions[entity.type](entity, entity_pos);
    }

    onResize() {
        this.resetMinimapPosition();
    }

    onUpdate(time_elapsed) {
        if (!this.game.self)
            return;
        // display minimap background
        var background_entity = this.game.entities.background;
        if (background_entity) {
            var background = background_entity.image.resize(
                convertScreenPercentToWorldSize(this.minimap_percent_x)
            );
            background.drawAt(this.minimap_pos_top_left.x, this.minimap_pos_top_left.y);
        }
        var that = this;
        this.game.runOnEntities(function (entity) {
            that.displayEntityOnMinimap(entity);
        });

        this.displayViewDistance();
        this.displayCurrentDestination();
    }
}