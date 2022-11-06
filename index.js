let bubbles = ['one', 'two', 'three', 'four'];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let scores = document.querySelectorAll('.score');
let noPop = 0;
let total = 50;
let currentBubble = 0;
let gameOver = false;
let shadow = document.querySelector('.shadow');
let startBtn = document.querySelector('.start-btn');
let round = 0;

function createBubble() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * bubbles.length);
    div.className = 'bubble bubble-' + bubbles[rand];
    rand = Math.floor(Math.random() * (windowWidth - 150));
    div.style.left = rand + 'px';

    div.dataset.number = currentBubble;
    currentBubble++;

    document.body.appendChild(div);


    animateBubble(div);

}

function animateBubble(elem) {
    let position = 0;
    let interval = setInterval(frame, 0);

    function frame() {
        if (position >= (windowHeight + 150) && (document.querySelector('[data-number ="' + elem.dataset.number + '"]') !== null)) {
            clearInterval(interval);
            gameOver = true;
        } else {
            position+=3;
            elem.style.top = windowHeight - position + 'px';
        }
    }

}

function deleteBubble(elem) {
    elem.remove();
    noPop++;
}

function startGame() {
    const audio = document.querySelector("audio");
    audio.volume = 0.2;
    // play from the beginning
    audio.currentTime = 0;
    audio.play();
    // get current time
    let startTime = new Date().getTime();
    // add 60 seconds
    let endTime = startTime + 60000;
    restartGame();
    let timeout = 0;

    for(i=0;i<10;i++){
        createBubble();
    }

    let loop = setInterval(function () {
        timeout = Math.floor(Math.random() * 600 - 100);
        // pop random bubble
        for(i=0;i<6;i++){
            createBubble();
        }
        currentTime = new Date().getTime();
        if (currentTime > endTime) {
            clearInterval(loop);
            shadow.style.display = 'flex';
            if (round % 2 == 0) {
                shadow.querySelector('.red-team').textContent = 32;
                shadow.querySelector('.blue-team').textContent = 22;
            }
            else {
                shadow.querySelector('.red-team').textContent = 22;
                shadow.querySelector('.blue-team').textContent = 22;
            }
        }

    }, 800 + timeout);

    let loop2 = setInterval(function () {
        // random pop
        random = Math.floor(Math.random() * 10);
        if (random > 1) {
            popRandom();
        }
        currentTime = new Date().getTime();
        if (currentTime > endTime) {
            clearInterval(loop2);
            const audio = document.querySelector("audio");
            // stop audio
            audio.pause();
        }
    }, 100);

}

function restartGame() {
    let forRemoving = document.querySelectorAll('.bubble');
    for (let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();
    }
    gameOver = false;
    noPop = 0;
    round += 1;
}

function popRandom() {
    let bubbles = document.querySelectorAll('.bubble');
    let random = Math.floor(Math.random() * bubbles.length);
    deleteBubble(bubbles[random]);
}
document.querySelector('.restart').addEventListener('click', function () {
    shadow.style.display = 'none';
    startGame();
});

startBtn.addEventListener('click', function () {
    startGame();
    document.querySelector('.main-game').style.display = 'none';
});
