class World {
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = [];
    throwing = true;
    ctx;
    canvas;
    keyboard;
    camera_x;
    level = level1;
    groundY = 190;
    alreadyInCalculation = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusik();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsThrowableObjectsWithTheGround();
            this.checkCollisionsThrowableObjectsWithEnemies();
            this.checkCollisionsWithCollectables();
            this.checkCollisionsWithPlatforms();
        }, 25)
    }

    playBackgroundMusik() {
        playAudio(this.level.backgroundMusik, 0.2)
    }

    allowThrowing() {
        this.throwing = false;
        setTimeout(() => {
            this.throwing = true
        }, 1500);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.throwing) {
            this.allowThrowing();
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }

    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            let instanceOf = enemy instanceof Endboss;
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                if (this.character.isCollidingOnTop(enemy) && !this.character.hurts && !instanceOf && this.character.speedY <= 0) {
                    this.character.speedY = 15;
                    enemy.hitEnemy();
                    playAudio(enemy.hurt_sound, 0.5)
                } else {
                    if (!enemy.isHurt(2)) {
                        this.character.hit();
                        this.character.backwardJump();
                        this.statusBar.setPercentage(this.character.energy);
                        console.log('Collision with Character, energy is ', this.character.energy);
                    }
                }
            }
        })

    }

    checkCollisionsWithCollectables() {
        this.level.collectables.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                obj.collected();
            }
        })
    }

    checkCollisionsWithPlatforms() {
        let checkVar = 0;
        this.level.platforms.forEach((platform) => {
            if (this.character.isCollidingOnTopOfThePlatform(platform)) {
                checkVar++;
                if (this.character.offsetBottomY() - this.character.speedY >= platform.y + platform.offset.top) { // if the character would come under the plaftform, calculate the difference and subtract it from the SpeedY so that you get exactly the platform "offset Y top" coordinate 
                    this.character.isOnAPlatform = true;
                    this.character.speedY = this.character.speedY - (platform.y + platform.offset.top - (this.character.offsetBottomY() - this.character.speedY));
                    console.log(this.character.speedY);
                    this.character.y -= this.character.speedY;
                }
            }
        })
        if (checkVar < 1) this.character.isOnAPlatform = false;
    }

    checkCollisionsThrowableObjectsWithTheGround() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.y >= bottle.bottleGround && !bottle.break) {
                this.bottleBreaks(bottle);
            }
        })
    }

    checkCollisionsThrowableObjectsWithEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isHurt(1.5) && !enemy.isDead) {
                    enemy.hitEnemy();
                    playAudio(enemy.hurt_sound, 0.5)
                    this.bottleBreaks(bottle);
                }
            })
        })
    }

    bottleBreaks(bottle) {
        bottle.break = true;
        bottle.intervalCounter = 200;
        clearInterval(bottle.animateBottleInterval);
        clearInterval(bottle.throwInterval);
        clearInterval(bottle.applyGravityInterval);
        bottle.animate();
        bottle.breaking_sound.play();
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            clearInterval(bottle.animateBottleInterval);
        }, 1300);
    }

    enemyHurt(enemy) {
        enemy.energy -= 20;
        /* enemy.hurt_sound.play(); */
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); /* delete the canvas before it load new */
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects --------
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.level.platforms);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        /* draw wird immer wieder aufgerufen - soweit die Grafikkarte hergibt */
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffset(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}