class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 600;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.x = x;
        this.animate();
    }

    /**
     * this function is used to animate the cloud animation
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}