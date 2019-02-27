class UiMinimap extends BaseUi {
    onInit() {
        this.game = this.state;
        // constants
        this.minimap_margin = 10;
        this.minimapPosTopLeft = {
            x: canvas.width - ressources.MINIMAP_BACKGROUND_EARTH.size().x - this.minimap_margin,
            y: canvas.height - ressources.MINIMAP_BACKGROUND_EARTH.size().y - this.minimap_margin
        };
        this.minimapSize = ressources.MINIMAP_BACKGROUND_EARTH.size();
        this.minimapPosBottomRight = {
            x: this.minimapPosTopLeft.x + this.minimapSize.x,
            y: this.minimapPosTopLeft.y + this.minimapSize.y
        };
    }

    onMouseLeftClick() {
        // return bool (true to override click)
    }

    onMouseRightClick() {
        if (mouse.x >= this.minimapPosTopLeft.x && mouse.y >= this.minimapPosTopLeft.y
            && mouse.x <= this.minimapPosBottomRight.x && mouse.y <= this.minimapPosBottomRight.y) {
            var mousePosInMinimap = {
                x: mouse.x - this.minimapPosTopLeft.x,
                y: mouse.y - this.minimapPosTopLeft.y
            };
            mousePosInMinimap.x = (Constants.WORLD_SIZE_X * mousePosInMinimap.x) / this.minimapSize.x;
            mousePosInMinimap.y = (Constants.WORLD_SIZE_Y * mousePosInMinimap.y) / this.minimapSize.y;
            this.game.playerCallFunction("playerMoveTo", mousePosInMinimap);
            return (true);
        }
    }
    displayViewSize(entityPos) {
        var viewSize = {
            x: (this.minimapSize.x * Constants.X_VIEW_RANGE) / Constants.WORLD_SIZE_X,
            y: (this.minimapSize.y * Constants.X_VIEW_RANGE / Constants.SCREEN_RATIO) / Constants.WORLD_SIZE_Y,
        };
        context.strokeStyle = "white";
        context.rect(entityPos.x - viewSize.x / 2, entityPos.y - viewSize.y / 2, viewSize.x, viewSize.y);
        context.stroke();
    }

    displayMinimap() {
        if (!this.game.entities)
            return;
        // display minimap background
        ressources.MINIMAP_BACKGROUND_EARTH.drawAt(this.minimapPosTopLeft.x, this.minimapPosTopLeft.y);
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
                x: ((this.minimapSize.x * entity.s_pos.x) / Constants.WORLD_SIZE_X) + this.minimapPosTopLeft.x,
                y: ((this.minimapSize.y * entity.s_pos.y) / Constants.WORLD_SIZE_Y) + this.minimapPosTopLeft.y
            }
            ressource.drawCenterAt(entityPos.x, entityPos.y)
            if (entity.id === this.game.self.id) {
                this.displayViewSize(entityPos);
            }
        };
    }

    onUpdate(time_elapsed) {
        this.minimapPosTopLeft = {
            x: canvas.width - ressources.MINIMAP_BACKGROUND_EARTH.size().x - this.minimap_margin,
            y: canvas.height - ressources.MINIMAP_BACKGROUND_EARTH.size().y - this.minimap_margin
        };
        this.minimapSize = ressources.MINIMAP_BACKGROUND_EARTH.size();
        this.minimapPosBottomRight = {
            x: this.minimapPosTopLeft.x + this.minimapSize.x,
            y: this.minimapPosTopLeft.y + this.minimapSize.y
        };
        this.displayMinimap();
    }
}