class Character extends MovableObject {
    world;
    walking_sound = new Audio('audio/running.mp3')
    stop = true;
    height = 270;
    width = 120;
    speed = 3;
    y = 480 - 35 - this.height;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
                this.walking_sound.playbackRate = 2.0;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
                this.walking_sound.playbackRate = 2.0;
            }

            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) this.walking_sound.pause(); /* stops the music if not pushed left or right */

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                playAnimation(this.IMAGES_WALKING);//Walk animation
            }
        }, 50);
    }

    jump() {

    }
}