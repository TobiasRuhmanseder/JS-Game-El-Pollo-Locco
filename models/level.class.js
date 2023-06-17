class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 6000;
    backgroundMusik;

    constructor(enemies, clouds, backgroundObjects, backgroundMusik) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.backgroundMusik = backgroundMusik;
    }
}