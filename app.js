class SpeedTypingGame {
    constructor(totalTime) {
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('seconds');
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.texts = ['hola', 'adios', 'buenas', 'arigato', 'byebye', 'namaste'];
        this.textToType = document.getElementById('text-to-type');
        this.currentIndex = 0;
    }
    startGame() {
        this.timeRemaining = this.totalTime;
        setTimeout(() => {
            this.shuffleText(this.texts);
            this.countdown = this.startCountdown();
        }, 100);
        this.timer.innerText = this.timeRemaining;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        this.timer.textContent = `TIME'S UP`;
    }
    victory() {
        clearInterval(this.countdown);
        this.timer.textContent = `CORRECT`;
    }
    shuffleText(texts) {
        texts.sort(() => Math.random() - .5);
        this.textToType.innerText = texts[this.currentIndex];
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let startBtn = document.getElementById('start-btn');
    let textToType = document.getElementById('text-to-type');
    let stg = new SpeedTypingGame(5);
    
    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hide');
        textToType.classList.remove('hide');
        stg.startGame();
    });
}