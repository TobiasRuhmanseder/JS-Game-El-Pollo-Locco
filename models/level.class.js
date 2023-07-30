class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    platforms;
    backgroundMusik;
    level_end_x = 6000;

    constructor(enemies, clouds, backgroundObjects, collectables, platforms, backgroundMusik) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
        this.platforms = platforms;
        this.backgroundMusik = backgroundMusik;
    }
}