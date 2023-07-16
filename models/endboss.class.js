class Endboss extends MovableObject {
    hurt_sound = new Audio('audio/chicken.mp3');
    endboss_sound = new Audio('audio/endboss_sound.mp3');
    die_sound = new Audio('audio/endboss_die.mp3');
    endbossDieInterval;
    animateEndbossInterval;
    energyInterval;
    hadFirstContact = false;
    height = 450;
    y = 500 - 15 - this.height;
    width = 300;
    isDead = false;
    offset = {
        top: 120,
        bottom: 10,
        left: 40,
        right: 35
    }

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'

    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.x = 4000;
        this.speed = 15;
        this.animate();
    }

    animate() {
        let i = -1;
        this.animateEndbossInterval = setInterval(() => {
            if (i < 16 && i >= 0) {
                this.playAnimation(this.IMAGES_ALERT);
                i++;
                if (i == 14) world.throwing = true;
            }
            else {
                if (this.hadFirstContact && !this.isHurt(1.5)) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.moveLeft();
                } else if (this.hadFirstContact) this.playAnimation(this.IMAGES_HURT);
            }
            if (world.character.x >= this.x - 450 && !this.hadFirstContact) {
                i = 0;
                playAudio(this.endboss_sound, 0.15);
                this.hadFirstContact = true;
            }
            if (world.character.x >= this.x - 900 && !this.hadFirstContact) {
                world.throwing = false;

            }
        }, 150);

        this.energyInterval = setInterval(() => {
            if (this.energy <= 0) {
                this.endbossDieAnimation();
                stopAudio(this.endboss_sound);
                clearInterval(this.animateEndbossInterval);
                clearInterval(this.energyInterval);
                playAudio(this.die_sound, 0.5, 1);
            }

        }, 200);
    }

    endbossDieAnimation() {
        this.endbossDieInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 700);
        setTimeout(() => {
            clearInterval(this.endbossDieInterval)
            gameOver(true);
        }, 2300);
    }

}