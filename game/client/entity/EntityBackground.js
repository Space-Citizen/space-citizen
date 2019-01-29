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
        this.image.drawCenterAt(canvas.width / 2, canvas.height / 2);
    }

    onDestroy() {

    }

    getHitCircle() {
        return 0;
    }

    getPriority() {
        return priority.BACKGROUND;
    }
}
