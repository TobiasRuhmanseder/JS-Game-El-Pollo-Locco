let level1;

function initLevel1() {

    level1 = new Level(
        [
            new Chicken(500),
            new Chicken(600),
            new Chicken(700),
            new ChickenSmall(400),
            new Endboss(800),

        ],
        [
            new Cloud(300),
            new Cloud(1000),
            new Cloud(1800),
            new Cloud(2600),
            new Cloud(3400),
            new Cloud(4200),
            new Cloud(5000),
            new Cloud(5800),
            new Cloud(6600),
            new Cloud(7400)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5), 
            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6)
        ],
        [
            new Coin(480, 180),
            new Coin(540, 180),
            new Coin(600, 180),
            new Coin(1280, 180),
            new Coin(1280, 110),
            new Coin(1340, 180),
            new Coin(1340, 110),
            new Coin(1800, 170),
            new Coin(1850, 170),
            new Coin(1900, 170),
            new Coin(1950, 170),
            new Coin(2675, 170),
            new Coin(2740, 170),
            new Coin(2800, 170),
            new Coin(3200, 250),
            new Coin(3300, 170),
            new Coin(3400, 250),
            new Coin(3500, 170),
            new Coin(3600, 250),
            new Bottle(800, 60),
            new Bottle(900, 60),
            new Bottle(1410, 30),
            new Bottle(1410, 170),
            new Bottle(1835, 65),
            new Bottle(1935, 65),
            new Bottle(2375, 45),
            new Bottle(2450, 45),
            new Bottle(2525, 45)
        ],
        [
            new Platform(500, 300),
            new Platform(800, 220),
            new Platform(1300, 300),
            new Platform(2400, 220),
            new Platform(2700, 300)
        ],
        new Audio('audio/sandstorm_background.mp3')


    )
}