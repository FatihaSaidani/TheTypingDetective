const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.'
];

// declaring variables
let words = [];
let wordIndex = 0;
let startTime;
let timerInterval;

// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start');
const toggleRulesButton = document.getElementById('toggle-rules');
const rulesElement = document.getElementById('rules');

// adding the toggle rules visibility
toggleRulesButton.addEventListener('click', () => {
    if (rulesElement.style.display === 'none') {
        rulesElement.style.display = 'block';
        toggleRulesButton.textContent = 'Hide Rules';
    } else {
        rulesElement.style.display = 'none';
        toggleRulesButton.textContent = 'Show Rules';
    }
});

// Adding a function to start the game
startButton.addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(word => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.focus();

    startTime = new Date().getTime();
    startTimer();

    restartButton.style.display = 'none';
});

// Countdown timer functionality
function startTimer() {
    let timeLeft = 60;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

// Handle typing input
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        clearInterval(timerInterval);
        endGame(true);
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;

        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
    } else {
        typedValueElement.className = 'error';
    }
});

// Adding function to end game
function endGame(isSuccess) {
    const elapsedTime = (new Date().getTime() - startTime) / 1000;
    const wpm = Math.round((words.length / elapsedTime) * 60);

    if (isSuccess) {
        messageElement.innerText = `CONGRATULATIONS! You finished in ${elapsedTime.toFixed(2)} seconds with a speed of ${wpm} WPM(Words per minute).`;
    } else {
        messageElement.innerText = 'Time is up! Try again!';
    }
    restartButton.style.display = 'inline';
}

// Restart Button Functionality
restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerElement.textContent = '';
    messageElement.innerText = '';
    typedValueElement.value = '';
    quoteElement.innerHTML = '';
    restartButton.style.display = 'none';
});

// function adding the particles 
particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,  
        density: {
          enable: true,
          value_area: 800,  
        },
      },
      size: {
        value: 5, 
      },
      move: {
        speed: 3, 
        direction: "none",
        out_mode: "out",  
      },
      line_linked: {
        enable: false,  
      },
      opacity: {
        value: 0.6, 
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
        },
      },
      color: {
        value: "#00f2fe",  
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse", 
        },
      },
    },
  });
  