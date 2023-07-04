class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    platforms;
    backgroundMusik;
    level_end_x = 6000;


    constructor(enemies, clouds, backgroundObjects, coins, platforms, backgroundMusik) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.platforms = platforms;
        this.backgroundMusik = backgroundMusik;
    }
}