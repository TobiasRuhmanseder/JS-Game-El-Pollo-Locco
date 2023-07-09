class Character extends MovableObject {
    characterConditionInterval;
    characterDieInterval;
    world;
    walking_sound = new Audio('audio/walking5.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurts.mp3');
    stop = true;
    height = 270;
    width = 120;
    speed = 2.5;
    counter = 0; /* speed for Animation  */
    longIdle = 0;
    amountCounter = 0;
    speedSound = 1;
    y = 190;
    isOnAPlatform = false;
    offset = {
        top: 120,
        bottom: 10,
        left: 40,
        right: 35
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',


    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png'
    ];


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animateMove();
        this.animateCondition();
        this.animateWalkingSpeed();
        this.applyGravity();
        this.checkCollidingWithTheGround();
    }

    animateMove() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.hurts) {
                if (this.otherDirection) this.stopIncreasingSpeed();
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    playAudio(this.walking_sound, 1);
                    this.walking_sound.playbackRate = this.speedSound;
                }
                this.increasingSpeed();
            }
            else if (this.world.keyboard.LEFT && this.x > 0 && !this.hurts) {
                if (!this.otherDirection) this.stopIncreasingSpeed();
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    playAudio(this.walking_sound, 1);
                    this.walking_sound.playbackRate = this.speedSound;
                }
                this.increasingSpeed();
            }
            if (this.world.keyboard.SPACE && (!this.isAboveGround())) {
                this.jump();
                this.walking_sound.pause();
                this.stopIncreasingSpeed();
            }

            if (this.world.keyboard.SPACE && this.isOnAPlatform) {
                this.jump();
                this.isOnAPlatform = false;
                this.walking_sound.pause();
                this.stopIncreasingSpeed();
            }


            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    animateCondition() {
        this.characterConditionInterval = setInterval(() => {
            if (this.isDead()) {
                this.walking_sound.pause();
                stopAllInterval();
                this.characterDieAnimation();
            }
            else if (this.isHurt(0.7)) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isAboveGround() && !this.isOnAPlatform && this.speedY >= 0) {
                this.longIdle = 0;
                this.characterJumpAnimation();
                clearInterval(this.characterConditionInterval);
            }
            else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT && this.x > 0) && this.x < this.world.level.level_end_x) {
                this.counter++;
                if (this.counter >= 4) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.amountCounter += 0.25;
                    this.counter = 0 + this.amountCounter;
                }
            }
            else {
                this.counter = 0;
                this.amountCounter = 0;
            }
        }, 50);
    }

    animateWalkingSpeed() {

        setInterval(() => {
            if ((!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) || this.x <= 0 || this.x > this.world.level.level_end_x) {
                this.walking_sound.pause(); /* stops the music if not pressed left or right */
                this.stopIncreasingSpeed();
                this.longIdle++
                if (this.longIdle <= 20) this.playAnimation(this.IMAGES_IDLE);
                else this.playAnimation(this.IMAGES_LONG_IDLE);
            }
            else this.longIdle = 0;
        }, 300);
    }


    checkCollidingWithTheGround() {
        setInterval(() => {
            if (this.y >= this.world.groundY) {
                this.isOnAPlatform = false;
                this.isJumping = false;
            }
        }, 500);

    }

    increasingSpeed() {
        if (this.speed < 8) {
            this.speed *= 1.01;
            this.speedSound *= 1.008;
        }
    }

    stopIncreasingSpeed() {
        this.speed = 2.5;
        this.speedSound = 1;
        this.counter = 0;
        this.amountCounter = 0;
    }

    backwardJump() {
        if (!this.hurts) {
            this.hurts = true;
            this.speedY = 15;
            this.stopIncreasingSpeed();
            playAudio(this.hurt_sound, 1);
            if (this.otherDirection) {
                this.backwardIntervall = setInterval(() => { this.x++ }, 1000 / 200);
            }
            else {
                this.backwardIntervall = setInterval(() => { this.x-- }, 1000 / 200);
            }
            setTimeout(() => {
                clearInterval(this.backwardIntervall);
                this.hurts = false;
            }, 700);
        }
    }

    characterJumpAnimation() {
        this.characterJumpInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_JUMPING);
        }, 160);
        setTimeout(() => {
            this.currentImage = 0;
            this.animateCondition();
            clearInterval(this.characterJumpInterval);
        }, 800);
    }

    characterDieAnimation() {
        this.characterDieInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 380);
        setTimeout(() => {
            clearInterval(this.characterDieInterval)
            gameOver(false);
        }, 1900);
    }
}