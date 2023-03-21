class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 600;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/2.png');
        this.x = 0 + Math.random() * 700; // Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}