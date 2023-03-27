class Endboss extends MovableObject {

    IMAGES_WALKING = [
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'D:/Developer_Akademie/Modul11_ElPolloLoco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
    }


}