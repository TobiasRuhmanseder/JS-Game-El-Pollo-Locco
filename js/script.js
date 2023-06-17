btnSound = new Audio('audio/hover_btn.mp3');




window.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById('playButtonId');;
    if (playButton) {
        playButton.addEventListener('mouseover', playHoverSound);
    }
});


function playHoverSound() {
    btnSound.play();
}

function toggleVolume() {
    let id = document.getElementById('volumeId');
    console.log('los');
    if (mute) id.src = 'img/volume_on.svg';
    else id.scr = 'img/volume_mute.svg';

}

document.getElementById('volumeId').src = 'img/volume_mute.svg';