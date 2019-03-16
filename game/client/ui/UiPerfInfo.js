
class UiPerfInfo extends BaseUi {

    onInit() {
        this.game = this.state;
        this.text = ressources.TEXT_INFO;
    }

    getPercentPos() {
        return new Position(0, 0);
    }

    getPercentSize() {
        return new Position(1, 1);
    }

    onMouseLeftClick() {
    }

    onMouseRightClick() {
    }

    onUpdate(time_elapsed) {
        this.text.drawAt("ping: " + this.game.ping_ms + " ms", 0, 0);
    }
}