
class EntityBackground extends BaseEntity {
    onInit() {
        switch (this.s_world_type) {
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
        var div = 1.5;
        var off = new Position(
            this.game.pos.x / div,
            this.game.pos.y / div
        );
        var background_pos = this.game.relPos({ x: 0, y: 0 });
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
