class SpeedTypingGame {
    constructor(totalTime) {
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('seconds');
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.textarea = document.getElementById('textarea');
        this.texts = ['hola', 'adios', 'goodbye', 'hello'];
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
    textTesting() {
        if (this.textarea.value === this.textToType.innerText)
        this.victory();
    }
    victory() {
        clearInterval(this.countdown);
        this.timer.textContent = `CORRECT`;
        this.nextBtn.classList.remove('hide');
        this.textToType.classList.add('hide');
    }
    shuffleText(x) {
        x.sort(() => Math.random() - .5);
        this.textToType.innerText = x[this.currentIndex];
    }
    nextText() {
        if (this.textToType.innerText === 'undefined') {
            this.restartBtn.classList.remove('hide');
        } else {
            this.currentIndex++;
        }
        this.resetState();
    }
    resetState() {
        this.textToType.classList.remove('hide');
        this.textToType.innerText = this.texts[this.currentIndex];
        this.textarea.value = '';
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
    let nextBtn = document.getElementById('next-btn');
    let restartBtn = document.getElementById('restart-btn');
    let textarea = document.getElementById('textarea');
    let stg = new SpeedTypingGame(10);
    
    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hide');
        textToType.classList.remove('hide');
        stg.startGame();
    });
    
    textarea.addEventListener('keyup', () => {
        stg.textTesting();
    });

    nextBtn.addEventListener('click', () => {
        nextBtn.classList.add('hide');
        stg.nextText();
    });
    restartBtn.addEventListener('click', () => {
        restartBtn.classList.add('hide');
        stg.startGame();
    })
}
