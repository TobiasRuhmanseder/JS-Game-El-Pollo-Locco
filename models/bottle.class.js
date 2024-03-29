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

    /**
     * this function is used to animate the bottle on the canvas
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 650);
    }

    /**
     * this function when a bottle is picked up
     */
    collected() {
        let index = world.level.collectables.indexOf(this);
        playAudio(this.collecting_Sound, 1);
        world.level.collectables.splice(index, 1);
        world.collectedAmmountBottles++;
        world.bottleBar.setPercentage(100 / world.totalBottles * world.collectedAmmountBottles);

    }

}