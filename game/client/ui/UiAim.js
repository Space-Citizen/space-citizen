
// Aim and move

class UiAim extends BaseUi {

    onInit() {
        this.target = null;
        this.game = this.state;
    }

    getPercentPos() {
        return new Position(0, 0);
    }

    getPercentSize() {
        // This UI uses the all screen, fake values here
        return new Position(1, 1);
    }

    targetEntityAt(world_pos) {
        // target closest entity from mouse pos
        var min_dist = null;
        var res = null;
        var that = this;
        this.game.runOnEntities(function (entity) {
            if (entity.id == that.game.self.id) {
                return false;
            }
            var dist = Helper.dist(world_pos, entity.pos);
            if (dist < entity.getHitCircle()) {
                if (min_dist == null || (min_dist != null && dist < min_dist)) {
                    min_dist = dist;
                    res = entity;
                }
            }
        });
        this.target = res;

        //
        if (res != null) {
            this.game.playerCallFunction("s_launchMissile", res.id);
        }
        //
        return res != null; // if target found, returns true
    }

    getTarget() {
        return this.target;
    }

    onMouseLeftClick() {
        this.game.playerCallFunction("s_playerMoveTo", this.game.worldPos(mouse));
        return true;
    }

    onMouseRightClick() {
        return this.targetEntityAt(this.game.worldPos(mouse));
    }

    onUpdate(time_elapsed) {
        if (this.game.self && this.target) {
            if (!(this.target.id in this.game.entities)) {
                this.target = null;
            }
            else {
                var screen_pos = this.game.relPos(this.target.pos);
                ressources.TARGET_RED.drawCenterAt(screen_pos.x, screen_pos.y);
            }
        }
    }
}
