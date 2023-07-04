class MovableObject extends DrawableObject {
    applyGravityInterval;
    speed = 0.15;
    x = 120;
    y;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 1;
    hurts = false;
    backwardIntervall = 0;
    bottleGround = 390;



    applyGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this.y - this.speedY > 190 && this instanceof Character) {   // if the character would come over the ground, calculate the difference and subtract it from the SpeedY so that you get exactly the ground y coordinate 
                    this.speedY = this.speedY - (190 - (this.y - this.speedY));
                }
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return this.y < this.bottleGround;
        } else {
            return this.y < 190;
        }
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
            /* obj.onCollisionCourse */; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    isCollidingOnTop(obj) {
        return this.y + this.height - this.offset.bottom <= obj.y + obj.height;
    }

    isCollidingOnTopOfThePlatform(obj) {
        return this.y + this.height - this.offset.bottom <= obj.y + obj.offset.top;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
        playAudio(this.jump_sound, 1);
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitEnemy() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    isHurt(time) {
        let timepassed = new Date().getTime() - this.lastHit; /* Difference in ms */
        timepassed = timepassed / 1000;
        return timepassed < time;
    }

    isDead() {
        return this.energy == 0;
    }
}