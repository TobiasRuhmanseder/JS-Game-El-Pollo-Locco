class MovableObject extends DrawableObject {
    applyGravityInterval;
    speed = 0.15;
    x = 120;
    y;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 1;
    hurts = false;
    backwardIntervall = 0;
    bottleGround = 390;
    chickenGround = 410;
    lastCalculateSpeedY = false;

    /**
     * this function is used to apply the gravity and calculate them
     */
    applyGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() && !this.isOnAPlatform || this.speedY > 0) {
                if (this.y - this.speedY > 190 && this instanceof Character) {   // if the character would come over the ground, calculate the difference and subtract it from the SpeedY so that you get exactly the ground y coordinate 
                    this.speedY = this.speedY - (190 - (this.y - this.speedY))
                }
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30)
    }

    /**
     * this function is used to check if the one is over the ground
     * 
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return this.y < this.bottleGround;
        } else if (this instanceof ChickenSmall) {
            return this.y < this.chickenGround;
        } else {
            return this.y < 190;
        }
    }

    /**
     * this function is used to check if the character is collinding with an object
     * 
     * @param {class} obj 
     * @returns true or false
     */
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
            /* obj.onCollisionCourse */; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    /**
      * this function is used to check if the character is collinding on the top of an object
      * 
      * @param {class} obj 
      * @returns true or false
      */
    isCollidingOnTop(obj) {
        return this.y + this.height - this.offset.bottom <= obj.y + obj.height;
    }

    /**
     * this function is used to check if the character is collinding on top on a platform
     * 
     * @param {class} obj 
     * @returns true or false
     */
    isCollidingOnTopOfThePlatform(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom <= obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right && this.speedY <= 0;
    }

    /**
     * this function is used to returns the offset bottom y
     * 
     * @returns 
     */
    offsetBottomY() {
        return this.y + this.height - this.offset.bottom;
    }

    /**
     * this function is used to load the animate images
     * 
     * @param {string} images - path from the images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * this function is used to move the object to the right
     */
    moveRight() {
        this.x += this.speed;
    }
    /**
     * this function is used to move the object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * this function is used to jump with the object
     */
    jump() {
        this.speedY = 27;
        this.isJumping = true;
        playAudio(this.jump_sound, 1);
    }

    /**
     * this function is used to hit the object
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function is used to hit an enemy
     */
    hitEnemy() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function is used to whether an enemy... has just been injured
     * 
     * @param {numer} time 
     * @returns true or false
     */
    isHurt(time) {
        let timepassed = new Date().getTime() - this.lastHit; /* Difference in ms */
        timepassed = timepassed / 1000;
        return timepassed < time;
    }

    /**
     * this function is used to return the requirement isDead
     */
    isDead() {
        return this.energy == 0;
    }
}