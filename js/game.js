let canvas;
let world;
let keyboard = new Keyboard();
let lose_Sound = new Audio('audio/lose.mp3');
let win_Sound = new Audio('audio/win.mp3');
let mute = false;

/**
 * this function is used to start the relevant function at start
 */
function init() {
    bindMobileGamingButton();
    bindKeyboardButtons();
}

/**
 * this function is used to integration the used keys on the keyboard
 */
function bindKeyboardButtons() {
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
}


/**
 * this function is used to integration the mobile gaming button
 */
function bindMobileGamingButton() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.D = true;
    })

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.D = false;
    })

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = true;
    })

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = false;
    })
}

/**
 * this function is used to initiate the end of the game
 * 
 * @param {boolean} bo - if true the character wins the game if false he loses
 */
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

/**
 * this function is used to shows the button on the endscreen after the musik has finished playing
 * 
 * @param {string} sound - transmits the correct path of the currently played sound
 */
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

/**
 * his function is used to stop all running intervals
 */
function stopAllInterval() {
    for (let i = 1; i < 999; i++) window.clearInterval(i);
}

/**
 * this function is used to stats the game
 */
function playGame() {
    document.getElementById('menuId').classList.add('d-none'); //close Menu
    document.getElementById('canvas').classList.remove('d-none'); //open canvas
    document.getElementById('playbuttons').classList.remove('d-none'); //open canvas
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * his function is used to go back to the main Menu
 */
function goBackToMenu() {
    window.location.replace('index.html');
}



