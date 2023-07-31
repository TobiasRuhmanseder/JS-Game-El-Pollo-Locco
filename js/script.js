btnSound = new Audio('audio/hover_btn.mp3');
swipeSound = new Audio('audio/swipe.mp3');


/**
 * this function is used to play Sound by hoverning the buttons in the main menu
 */
function playHoverSound() {
    playAudio(btnSound, 0.2);
}

/**
 * this function is used to toggle the volume from mute to not mute or vice versa
 */
function toggleVolume() {
    if (mute) {
        document.getElementById('volumeId').src = 'img/volume_on.svg';
        mute = false;
        if (world) world.playBackgroundMusik();
    }
    else {
        if (world) world.stopBackgroundMusik();
        document.getElementById('volumeId').src = 'img/volume_mute.svg';
        mute = true;
    }

}

/**
 * this function is used to to wrapping the .play function with checking the mute bollean
 * 
 * @param {string} path - the path of the sound file
 * @param {number} volume - numer of volume
 * @param {number} repeat - the number of 1 dont repeat the sound
 */
function playAudio(path, volume, repeat) {
    if (mute) { } //do nothing
    else {
        path.volume = volume;
        path.play();
        if (repeat == 1) path.loop = false;
    }
}

/**
 * this function is used to stop the sound
 * 
 * @param {*} path - the path of the sound file
 */
function stopAudio(path) {
    if (mute) { } //do nothing
    else {
        path.pause();
    }
}

/**
 * this function is used to open the keyboard instruction 
 */
function openKeyboardInstruction() {
    document.getElementById('keyboard-infoId').style.top = '0px';
    playAudio(swipeSound, 0.2);
}

/**
 * this function is used to close the keyboard instruction
 */
function closeKeyboardInstruction() {
    document.getElementById('keyboard-infoId').style.top = '-500px';
    playAudio(swipeSound, 0.2);
}


