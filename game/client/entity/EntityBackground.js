
class EntityBackground extends BaseEntity {
    onInit() {
        this.world_type = this.s_world_type;
        switch (this.world_type) {
            case WorldTypes.EARTH:
                this.image = ressources.BACKGROUND_EARTH;
                break;
            case WorldTypes.MARS:
                this.image = ressources.BACKGROUND_MARS;
                break;
            default:
                this.image = ressources.BACKGROUND_SPACE;
        }
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        var background_pos = this.game.relPos(new Position(0, 0));
        this.image.drawAt(
            background_pos.x,
            background_pos.y
        );
    }

    getHitCircle() {
        return 0;
    }

    getPriority() {
        return priority.BACKGROUND;
    }
}
