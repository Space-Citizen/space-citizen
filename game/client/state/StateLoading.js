class StateLoading extends IState {
    onInit() {
        console.log("Loading ressources");
        context.font = "30px Arial";
    }

    onUpdate(time_elapsed) {
        if (g_loaded_res_counter >= g_res_count) {
            console.log("Ressources loaded");
            return new StateGame();
        }
        
        context.fillText("Loading " + g_loaded_res_counter + "/" + g_res_count, 10, 50);
    }

    onDestroy() {
        
    }
}