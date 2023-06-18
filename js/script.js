btnSound = new Audio('audio/hover_btn.mp3');
swipeSound = new Audio('audio/swipe.mp3');




window.addEventListener("DOMContentLoaded", () => {
    let playButton = document.getElementById('playButtonId');
    let volumeButton = document.getElementById('volumeId');
    let keyButton = document.getElementById('keybuttonId');
    if (playButton) {
        playButton.addEventListener('mouseover', playHoverSound);
        volumeButton.addEventListener('mouseover', playHoverSound);
        keyButton.addEventListener('mouseover', playHoverSound);
    }
});


function playHoverSound() {
    playAudio(btnSound, 0.2);
}

function toggleVolume() {
    if (mute) {
        document.getElementById('volumeId').src = 'img/volume_on.svg';
        mute = false;
    }
    else {
        document.getElementById('volumeId').src = 'img/volume_mute.svg';
        mute = true;
    }

}

function playAudio(path, volume) {
    if (mute) { } //do nothing
    else {
        path.volume = volume;
        path.play();
    }
}

function openKeyboardInstruction() {
    /* document.getElementById('keyboard-infoId').classList.remove('d-none'); */
    document.getElementById('keyboard-infoId').style.top = '0px';
    playAudio(swipeSound, 0.2);
}

function closeKeyboardInstruction() {
    document.getElementById('keyboard-infoId').style.top = '-500px';
    playAudio(swipeSound, 0.2);
}


