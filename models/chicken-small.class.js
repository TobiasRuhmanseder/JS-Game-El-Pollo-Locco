class ChickenSmall extends MovableObject {
    animateChickenInterval;
    hurt_sound = new Audio('audio/chicken_small.mp3');
    isDead = false;
    height = 35;
    width = 35;
    y = 480 - 35 - this.height;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',

    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x
        this.speed = 0.35;
        this.energy = 20;
        this.animate();
        this.applyGravity();
    }

    animate() {
        this.animateChickenInterval = setInterval(() => {
            /* this.moveLeft(); */
        }, 1000 / 60)

        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(this.animateChickenInterval);
                this.isDead = true;
            }
            else
                this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setInterval(() => {
            if (!this.isDead)
                this.speedY = 20;


        }, 3000)

    }
}