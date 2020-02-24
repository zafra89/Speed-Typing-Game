class SpeedTypingGame {
    constructor(totalTime) {
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('seconds');
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.textarea = document.getElementById('textarea');
        this.texts = [
            'Its had resolving otherwise she contented therefore',
            'It as announcing it me stimulated frequently continuing',
            'Promotion an ourselves up otherwise my newspaper',
            'Extremity direction existence as dashwoods do up',
            'Securing marianne led welcomed offended but offering six raptures'
        ];
        this.textToType = document.getElementById('text-to-type');
        this.playAgainText = document.getElementById('play-again-text');
        this.info = document.getElementById('info');
        this.currentIndex = 0;
    }
    startGame() {
        this.timeRemaining = this.totalTime;
        this.playAgainText.classList.add('hide');
        this.timer.classList.remove('correct');
        this.timer.classList.remove('incorrect');
        setTimeout(() => {
            this.shuffleText(this.texts);
            this.countdown = this.startCountdown();
            this.info.classList.remove('hide');
            this.textarea.classList.remove('hide');
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
        this.timer.classList.add('incorrect')
        this.textToType.classList.add('hide');
        this.playAgainText.classList.remove('hide');
        this.textarea.classList.add('hide');
        this.startBtn.classList.remove('hide');
        this.currentIndex = 0;
        this.startBtn.textContent = `Restart`;
    }
    textTesting() {
        if (this.textarea.value === this.textToType.innerText)
        this.victory();
    }
    victory() {
        clearInterval(this.countdown);
        clearTimeout(this.timeRemaining);
        this.timer.textContent = `CORRECT`;
        this.nextBtn.classList.remove('hide');
        this.textToType.classList.add('hide');
        this.textarea.value = '';
        this.timer.classList.add('correct')
    }
    shuffleText(x) {
        x.sort(() => Math.random() - 0.5);
        this.textToType.innerText = x[this.currentIndex];
    }
    nextText() {
        clearInterval(this.countdown);
        this.currentIndex++;
        this.timer.innerText = this.timeRemaining;
        this.timer.classList.remove('correct');
        if (this.currentIndex >= this.texts.length) {
            this.playAgainText.classList.remove('hide');
            this.info.classList.add('hide');
            this.textarea.classList.add('hide');
            this.startBtn.classList.remove('hide');
            this.currentIndex = 0;
            this.startBtn.textContent = `Restart`;
        } else {
            this.timeRemaining = this.totalTime;
            this.textToType.innerText = this.texts[this.currentIndex];
            this.textarea.value = '';
            this.textToType.classList.remove('hide');
            this.countdown = this.startCountdown();
        }
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
    let textarea = document.getElementById('textarea');
    let stg = new SpeedTypingGame(20);
    
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
}
