

class UiAim extends BaseUi {

    onInit() {
        this.target = null;
    }

    targetEntityAt(world_pos) {
        // target closest entity from mouse pos
        var min_dist = null;
        var res = null;
        this.game.runOnEntities(function (entity) {
            var dist = Helper.dist(world_pos, entity.pos);
            if (dist < entity.getHitCircle()) {
                if (min_dist == null || (min_dist != null && dist < min_dist)) {
                    min_dist = dist;
                    res = entity;
                }
            }
        });
        this.target = res;
        console.log(this.target);
        return res != null; // if target found, returns true
    }

    getTarget() {
        return this.target;
    }

    onMouseLeftClick() {
        this.targetEntityAt(this.game.worldPos(mouse));
    }

    onMouseRightClick() {

    }

    onEntityRemoved(entity_id) {
        if (this.target && this.target.id === entity_id) {
            this.target = null;
        }
    }

    onUpdate(time_elapsed) {
        if (this.target) {
            var screen_pos = this.game.relPos(this.target.pos);
            ressources.TARGET_RED.drawCenterAt(screen_pos.x, screen_pos.y);
        }
    }
}
