

class UiTargetReticle extends BaseUi {

    onInit() {
    }

    onUpdate(timeElapsed) {
        if (this.game.target) {
            var screen_pos = this.game.relPos(this.game.target.pos);
            ressources.TARGET_RED.drawCenterAt(screen_pos.x, screen_pos.y, this.rotation);
        }
    }
}
