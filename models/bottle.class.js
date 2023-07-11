class Bottle extends Collectables {
    collecting_Sound = new Audio('audio/bottle_collect.mp3');
    offset = {
        top: 12,
        bottom: 10,
        left: 30,
        right: 30
    }

    IMAGE_BOTTLE_AIR = [
        'img/6_salsa_bottle/salsa_bottle.png',
    ];

    IMAGE_BOTTLE_GROUND = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];




    constructor(x, y) {
        super().loadImage(this.IMAGE_BOTTLE_AIR);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 100;
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 650);
    }

}