class BaseEntityShip extends BaseEntity {
    onInit() {
        this.ship = createShip(this.c_ship_type);
        this.hit_circle = this.ship.getBodySize() / 2;
        this.sprite_explosion = ressources.EXPLOSION_2.clone();
        this.sound_explosion = this.getAudio(ressources.SOUND_EXPLOSION_1);
        this.initItems()
    }

    initItems() {
        var items = {
            shield_mk1: ItemShieldMk1
        }
        this.items = [];
        for (var x in this.c_items_name) {
            var item_name = this.c_items_name[x];
            var item_class = items[item_name];
            if (item_class) {
                this.items.push(new items[item_name](this));
            } else {
                console.log("Ignored item: " + item_name);
            }
        }
    }

    getScreenPos() {
        return this.game.relPos(this.pos);
    }

    onUpdate(time_elapsed) {
        super.onUpdate(time_elapsed);
        this.ship.onUpdate(time_elapsed);
        this.bearing = this.s_bearing;
        var screen_pos = this.getScreenPos();
        var hp_percent = this.s_hp / this.c_max_hp * 100;
        var shield_percent;
        if (this.c_max_shield == 0)
            shield_percent = 0;
        else
            shield_percent = this.s_shield / this.c_max_shield * 100;

        if (this.isAlive()) {
            var show_thrusters = this.s_target ? true : false;
            this.ship.draw(
                screen_pos,
                this.c_name,
                hp_percent,
                shield_percent,
                this.bearing,
                show_thrusters
            );
        } else {
            this.sprite_explosion.drawCenterAt(screen_pos.x, screen_pos.y, this.bearing);
            if (this.sprite_explosion.isFinished()) {
                super.kill();
            }
        }
    }

    getHitCircle() {
        return this.hit_circle;
    }

    getPriority() {
        return priority.SHIPS;
    }

    kill() {
        this.sound_explosion.play();
    }
}
