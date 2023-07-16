class CoinBar extends StatusBar {


    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',

    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 70;
        this.width = 180;
        this.height = 40;
        this.setPercentage(0);
    }

}