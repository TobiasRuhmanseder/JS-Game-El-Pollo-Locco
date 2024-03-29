class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;

    /**
     * this function is used to load the image
     * 
     * @param {string} path - path from the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * this function is used to draw the image into the canvas
     * 
     * @param {ctx} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
     * this function is used to load images from a array
     * 
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /* -----------------     draw collision rectangel - only for development -------------------------- */

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Collectables || this instanceof Platform || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /* ------------------------------------------------------------------------------------------------- */

}