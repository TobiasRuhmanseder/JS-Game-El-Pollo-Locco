class Platform extends MovableObject {

    offset = {
        top: 10,
        bottom: 0,
        left: 0,
        right: 0
    }


    constructor(x, y) {
        super().loadImage('img/11_jumping_platforms/jumping_platf_1.png');
        this.x = x;
        this.y = y;
        this.width = 180;
        this.height = 50;
    }


}

