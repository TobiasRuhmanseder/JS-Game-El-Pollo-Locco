class Coin extends Collectables {
    collecting_Sound = new Audio('audio/coin.mp3');
    offset = {
        top: 50,
        bottom: 50,
        left: 35,
        right: 35
    }

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 650);
    }

    collected() {
        let index = world.level.collectables.indexOf(this);
        playAudio(this.collecting_Sound, 1);
        world.level.collectables.splice(index, 1);
        world.collectedAmmountCoins++;
        world.coinBar.setPercentage(100 / world.totalCoins * world.collectedAmmountCoins);

    }


}