let canvas;
let world;
let keyboard = new Keyboard();
let lose_Sound = new Audio('audio/lose.mp3');
let win_Sound = new Audio('audio/win.mp3');
let mute = false; 

function init() {
    playGame();
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

function gameOver(bo) {
    document.getElementById('canvas').classList.add('d-none');
    if (bo) {
        document.getElementById('gameOverId').classList.remove('d-none');
        win_Sound.play();
        showButtonAfterPlayedMusik(win_Sound);

    } else {
        document.getElementById('lostId').classList.remove('d-none');
        lose_Sound.play();
        showButtonAfterPlayedMusik(lose_Sound);
    }
}

function showButtonAfterPlayedMusik(sound) {
    current_sound = sound;

    current_sound.addEventListener('ended', () => {
        console.log('juhuuuuuuuuu');
        document.getElementById('goBackMenuId').classList.remove('d-none');
    })
}

function stopAllInterval() {
    for (let i = 1; i < 999; i++) window.clearInterval(i);
}

function playGame() {
    document.getElementById('menuId').classList.add('d-none'); //close Menu
    document.getElementById('canvas').classList.remove('d-none'); //open canvas
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function goBackToMenu() {
    window.location.replace('index.html');
}



