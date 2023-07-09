class Collectables extends MovableObject {



    collected() {
        let index = world.level.collectables.indexOf(this);
        playAudio(this.collecting_Sound, 1);
        world.level.collectables.splice(index, 1);
    }

}