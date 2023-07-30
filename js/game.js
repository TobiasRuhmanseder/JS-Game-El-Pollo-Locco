let canvas;
let world;
let keyboard = new Keyboard();
let lose_Sound = new Audio('audio/lose.mp3');
let win_Sound = new Audio('audio/win.mp3');
let mute = false;

function init() {
    bindMobileGamingButton();
}

window.addEventListener("keydown", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/* Function for the mobile gaming button */
function bindMobileGamingButton() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    })

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })
}

function gameOver(bo) {
    document.getElementById('canvas').classList.add('d-none');
    if (bo) {
        document.getElementById('gameOverId').classList.remove('d-none');
        playAudio(win_Sound, 1, 1);
        showButtonAfterPlayedMusik(win_Sound);
    } else {
        document.getElementById('lostId').classList.remove('d-none');
        playAudio(lose_Sound, 1, 1);
        showButtonAfterPlayedMusik(lose_Sound);
    }
}

function showButtonAfterPlayedMusik(sound) {
    current_sound = sound;
    if (!mute) {
        current_sound.addEventListener('ended', () => {
            document.getElementById('goBackMenuId').classList.remove('d-none');
        })
    } else {
        setTimeout(() => { document.getElementById('goBackMenuId').classList.remove('d-none'); }, 3000)
    }
}

function stopAllInterval() {
    for (let i = 1; i < 999; i++) window.clearInterval(i);
}

function playGame() {
    document.getElementById('menuId').classList.add('d-none'); //close Menu
    document.getElementById('canvas').classList.remove('d-none'); //open canvas
    document.getElementById('playbuttons').classList.remove('d-none'); //open canvas
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function goBackToMenu() {
    window.location.replace('index.html');
}



