
class UiPerfInfo extends BaseUi {

    onInit() {
        this.game = this.state;
        this.text = ressources.TEXT_INFO;
        this.text_margin = this.text.height * 1.5;
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
        this.text.drawAt("Ping: " + this.game.ping_ms + " ms", 0, 0);
        this.text.drawAt("Average ping: " + Math.round(this.game.average_ping_ms) + " ms", 0, this.text_margin);
        this.text.drawAt("FPS: " + Math.round(1 / time_elapsed), 0, this.text_margin * 2);
    }
}