class Chicken extends MovableObject {
    animateChickenInterval;
    hurt_sound = new Audio('audio/chicken.mp3');
    isDead = false;
    height = 80;
    width = 80;
    y = 480 - 35 - this.height;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 1200; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5;
        this.energy = 20;
        this.animate();
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

    }
}