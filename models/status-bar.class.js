class StatusBar extends DrawableObject {

    percentage = 100;

    /**
     * this function is used to set the percent in the bars
     * 
     * @param {number} percentage - percent der status bar
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function is used to choose the right image based on the percentage
     * 
     * @returns number
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }

}