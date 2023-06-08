class ThrowableObject extends MovableObject {
    animateBottleInterval;
    throwInterval;
    break = false;
    intervalCounter = 80;
    throwing_sound = new Audio('audio/throwing.mp3');
    breaking_sound = new Audio('audio/glas_breaking2.mp3');
    direction = world.character.otherDirection;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_BREAK = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_BREAK);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.throw();
        this.animate();
    }

    animate() {
        this.animateBottleInterval = setInterval(() => {
            if (this.break) this.playAnimation(this.IMAGES_BOTTLE_BREAK);
            else this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        }, this.intervalCounter);



    }

    throw() {
        this.throwing_sound.play();
        this.speedY = 18;
        this.applyGravity();
        world.character.longIdle = 0; // wake up if the character is sleeping
        this.throwInterval = setInterval(() => {
            if (this.direction) this.x -= 12;
            else this.x += 12;
        }, 25)

    }
}