class StateLoading extends IState {
    onInit() {
        console.log("Loading ressources");
        context.font = "30px Arial";
    }

    drawLoading(x, y, size, percent) {
        var x_size = percentWidthToScreen(size);
        var y_size = x_size / 30;

        var x = x - x_size / 2;
        var y = y - y_size / 2;

        context.beginPath();
        context.fillStyle = "grey"
        context.fillRect(x, y, x_size, y_size);
        context.stroke();

        context.beginPath();
        context.fillStyle = "blue"
        context.fillRect(x, y, x_size * percent / 100, y_size);
        context.stroke();
    }

    onUpdate(time_elapsed) {
        if (g_loaded_res_counter >= g_res_count) {
            console.log("Ressources loaded");
            return new StateGame();
        }
        this.drawLoading(canvas.width / 2, canvas.height / 2, 80, g_loaded_res_counter / g_res_count * 100);
        context.fillStyle = "white";
        context.textAlign = "center";
        context.font = "30px Verdana";
        context.fillText("Loading " + g_loaded_res_counter + "/" + g_res_count,
            canvas.width / 2, canvas.height / 3);
    }

    onDestroy() {

    }
}