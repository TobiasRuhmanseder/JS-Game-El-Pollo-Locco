class World {
    character = new Character();
    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    totalBottles = 0;
    collectedAmmountBottles = 0;
    collectedAmmountCoins = 0;
    totalCoins = 0;
    throwableObjects = [];
    throwing = true;
    no_throwing_sound = new Audio('audio/no_throwing_objects.mp3');
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
        this.calculateAmountCollectables();
    }

    /**
     * this function is used to set the world
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * this function is used to run all the intervals
     */
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

    /**
     * this function is used to play the background musik
     */
    playBackgroundMusik() {
        playAudio(this.level.backgroundMusik, 0.2);
    }

    /**
     * this function is used to stop the background musik by muting
     */
    stopBackgroundMusik() {
        stopAudio(this.level.backgroundMusik);
    }

    /**
     * this function is used to allow the throwing after throw something
     */
    allowThrowing() {
        this.throwing = false;
        setTimeout(() => {
            this.throwing = true
        }, 1500);
    }

    /**
     * this function is used to check if a throwing object is available
     */
    checkThrowObjects() {
        if (this.canThrowing()) this.throwingObject();
        else if (this.canNotThrowing()) {
            playAudio(this.no_throwing_sound, 1);
            setTimeout(() => { this.no_throwing_sound.pause }, 2000);
        }
    }

    /**
     * this function is used to return true or false if throwing is allowed
     * 
     * @returns true or false
     */
    canThrowing() {
        return this.keyboard.D && this.throwing && this.collectedAmmountBottles > 0;
    }

    /**
     * this function is used to return true or false if cant be throwing
     * 
     * @returns true or false
     */
    canNotThrowing() {
        return this.keyboard.D && this.throwing && this.collectedAmmountBottles <= 0;
    }

    /**
     * this function is used to throwing an object
     */
    throwingObject() {
        this.allowThrowing();
        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.collectedAmmountBottles--;
        this.bottleBar.setPercentage(100 / world.totalBottles * world.collectedAmmountBottles);
    }

    /**
     * this function is used to check collidings with enemies
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            let instanceOf = enemy instanceof Endboss;
            if (this.collidingWithEnemy(enemy)) {
                if (this.jumpingOnAEnemy(instanceOf, enemy)) this.jumpedOnAEnemy(enemy);
                else {
                    if (enemy.energy > 0 && !this.character.hurts) this.hitCharacterbyCollidingEnemy();
                }
            }
        })
    }
    /**
     * this function is used to return the requirement colliding with an enemy
     * 
     * @param {obj} enemy 
     * @returns true or false
     */
    collidingWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !enemy.isDead;
    }

    /**
     * this function is used to return the requirement jumping on a enemy
     * 
     * @param {obj} instanceOf 
     * @param {obj} enemy 
     * @returns  true or false
     */
    jumpingOnAEnemy(instanceOf, enemy) {
        return this.character.isCollidingOnTop(enemy) && !this.character.hurts && !instanceOf && this.character.speedY <= 0;
    }

    /**
     * this function is used to by jumping on a enemy
     * 
     * @param {obj} enemy 
     */
    jumpedOnAEnemy(enemy) {
        this.character.jumpedOnAEnemy = true;
        this.character.speedY = 15;
        enemy.hitEnemy();
        enemy.hurts = true;
        playAudio(enemy.hurt_sound, 0.5)
        setTimeout(() => this.character.jumpedOnAEnemy = false, 1000);
    }

    /**
     * this function is used to hit the character by colliding with an enemy
     */
    hitCharacterbyCollidingEnemy() {
        this.character.hit();
        this.character.backwardJump();
        this.healthBar.setPercentage(this.character.energy);
    }

    /**
     * this function is used to check a collison with collectables linke coins or bottles
     */
    checkCollisionsWithCollectables() {
        this.level.collectables.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                obj.collected();
            }
        })
    }

    /**
     * this function is used to check a collision with a platform
     */
    checkCollisionsWithPlatforms() {
        let checkVar = 0;
        this.level.platforms.forEach((platform) => {
            if (this.character.isCollidingOnTopOfThePlatform(platform)) {
                checkVar++;
                if (this.character.offsetBottomY() - this.character.speedY >= platform.y + platform.offset.top) this.standingOnThePlatform(platform);  // if the character would come under the plaftform, calculate the difference and subtract it from the SpeedY so that you get exactly the platform "offset Y top" coordinate 
            }
        })
        if (checkVar < 1) this.character.isOnAPlatform = false;
    }

    /**
     * this function is used to by lading on a platform
     * 
     * @param {obj} platform 
     */
    standingOnThePlatform(platform) {
        this.character.isOnAPlatform = true;
        this.character.speedY = this.character.speedY - (platform.y + platform.offset.top - (this.character.offsetBottomY() - this.character.speedY));
        this.character.y -= this.character.speedY;
    }

    /**
     * this function is used to check a collison with a throwable object with the ground
     */
    checkCollisionsThrowableObjectsWithTheGround() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.y >= bottle.bottleGround && !bottle.break) {
                this.bottleBreaks(bottle);
            }
        })
    }

    /**
     * this function is used to check a collision with a throwable objecte with a enemy
     */
    checkCollisionsThrowableObjectsWithEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isHurt(1.5) && !enemy.isDead) this.bottleCollidingWithEnemy(enemy, bottle);
            })
        })
    }

    /**
     * this function is used to by colliding a bottle with a enemy
     * 
     * @param {obj} enemy 
     * @param {obj} bottle 
     */
    bottleCollidingWithEnemy(enemy, bottle) {
        enemy.hitEnemy();
        playAudio(enemy.hurt_sound, 0.5);
        this.bottleBreaks(bottle);
    }

    /**
     * this function is used to when the bottle collides an breaks
     * 
     * @param {obj} bottle 
     */
    bottleBreaks(bottle) {
        bottle.break = true;
        bottle.intervalCounter = 200;
        this.clearTheBottleIntervals(bottle);
        bottle.animate();
        this.playBottleThrowSound(bottle);
    }

    /**
     * this function is used to play the bottle throwing sound
     * 
     * @param {obj} bottle 
     */
    playBottleThrowSound(bottle) {
        playAudio(bottle.breaking_sound, 1);
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            clearInterval(bottle.animateBottleInterval);
        }, 1300);
    }

    /**
     * this function is used to clear all intervals from the bottle after the colliding action
     * 
     * @param {obj} bottle 
     */
    clearTheBottleIntervals(bottle) {
        clearInterval(bottle.animateBottleInterval);
        clearInterval(bottle.throwInterval);
        clearInterval(bottle.applyGravityInterval);
    }

    /**
     * this function is used to reduces the energy from the enemy
     * 
     * @param {obj} enemy 
     */
    enemyHurt(enemy) {
        enemy.energy -= 20;
    }

    /**
     * this function is used to draw all images, objects.... into the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); /* delete the canvas before it load new */
        this.ctx.translate(this.camera_x, 0);
        this.allmovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects --------
        this.allfixedObjects();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        /* draw wird immer wieder aufgerufen - soweit die Grafikkarte hergibt */
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     *  all movable Objects 
     */
    allmovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.level.platforms);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * akk fixed objects
     */
    allfixedObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }

    /**
     * this function is used to add objects to the map
     * 
     * @param {obj} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx); // draw collision rectangel - only for development 
        // mo.drawFrameOffset(this.ctx); // draw collision rectangel - only for development 
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * this function is used to flip the image/object when they turn to the other/left side
     * 
     * @param {obj} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * this function is used to flip the image/object back they turn to the straight side
     * 
     * @param {obj} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * this function is used to calculate all the collecables objects for the percentage calculation for the status bar
     */
    calculateAmountCollectables() {
        this.level.collectables.forEach((obj) => {
            if (obj instanceof Bottle) this.totalBottles++;
            if (obj instanceof Coin) this.totalCoins++;
        })
    }
}