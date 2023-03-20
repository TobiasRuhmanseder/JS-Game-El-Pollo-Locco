class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;
    canvas;
    clouds = [
        new Cloud()
    ];

    backgroundObjects = [
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
    ]



    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height); /* delete the canvas before it load new */
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}