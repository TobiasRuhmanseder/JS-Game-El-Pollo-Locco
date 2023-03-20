class Chicken extends MovableObject {
    height = 80;
    width = 80;
    y = 480 - 35 - this.height;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    }
}