// Juego de adivinanza de numero:
document.addEventListener('DOMContentLoaded', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    const guessInput = document.getElementById('guess-input');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', () => {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            alert('Por favor, introduce un número válido entre 1 y 100.');
            return;
        }

        if (userGuess === randomNumber) {
            alert(`🎉 ¡Felicidades! Adivinaste el número ${randomNumber} en ${attempts} intento(s).`);
            resultDiv.innerHTML = `🎉 ¡Has ganado! El número era <strong>${randomNumber}</strong>.`;
            checkButton.style.display = 'none';
            resetButton.style.display = 'inline-block';
        } else if (userGuess < randomNumber) {
            alert('El número es mayor. ¡Inténtalo de nuevo!');
            resultDiv.textContent = 'El número es mayor. ¡Sigue intentando!';
        } else {
            alert('El número es menor. ¡Inténtalo de nuevo!');
            resultDiv.textContent = 'El número es menor. ¡Sigue intentando!';
        }
    });

    resetButton.addEventListener('click', () => {
        location.reload();
    });
});


// Juego de preguntas y respuestas:
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Quién es considerado el padre de la informática?",
            answers: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
            correct: "Charles Babbage"
        },
        {
            question: "¿Qué significa HTML?",
            answers: [
                "Hyperlinks and Text Markup Language",
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyper Text Machine Language"
            ],
            correct: "Hyper Text Markup Language"
        },
        {
            question: "¿Cuál fue la primera red de computadoras del mundo?",
            answers: ["Internet", "ARPANET", "Ethernet", "Intranet"],
            correct: "ARPANET"
        },
        {
            question: "¿Qué empresa desarrolló el lenguaje de programación Java?",
            answers: ["Sun Microsystems", "Microsoft", "Oracle", "Google"],
            correct: "Sun Microsystems"
        },
        {
            question: "¿En qué año se lanzó la primera versión de Windows?",
            answers: ["1981", "1985", "1990", "1995"],
            correct: "1985"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const resultElement = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        answersElement.innerHTML = "";

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-button');
            button.addEventListener('click', () => checkAnswer(answer));
            answersElement.appendChild(button);
        });
    }

    function checkAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correct) {
            score++;
            resultElement.textContent = "¡Correcto! 🎉";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Incorrecto. La respuesta correcta era: ${currentQuestion.correct}`;
            resultElement.style.color = "red";
        }

        setTimeout(() => {
            currentQuestionIndex++;
            resultElement.textContent = "";

            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showFinalScore();
            }
        }, 1500);
    }

    function showFinalScore() {
        questionElement.textContent = `Juego terminado. Tu puntuación es: ${score} de ${questions.length}`;
        answersElement.innerHTML = "";
        restartButton.style.display = "inline-block";
    }

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        restartButton.style.display = "none";
        loadQuestion();
    });

    loadQuestion();
});


// Juego de emparejar cartas:
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusDiv = document.getElementById('status');

    const icons = ["⭐", "🌟", "🔥", "🍀", "💎", "🌈", "🌙", "☀️"];
    const cards = [...icons, ...icons];
    let flippedCards = [];
    let matchedPairs = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cards);
        cards.forEach(icon => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.icon = icon;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) {
            return;
        }

        this.classList.add('flipped');
        this.textContent = this.dataset.icon;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.icon === card2.dataset.icon) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === icons.length) {
                statusDiv.textContent = "¡Felicidades! Has encontrado todos los pares 🎉";
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = "";
                card2.textContent = "";
            }, 1000);
        }

        flippedCards = [];
    }

    createBoard();
});


// Juego de piedra, papel y tijera:
document.addEventListener('DOMContentLoaded', () => {
    const choices = ['Piedra', 'Papel', 'Tijera'];
    const resultDiv = document.getElementById('result');
    const scoreDiv = document.getElementById('score');

    let userScore = 0;
    let computerScore = 0;

    // Agregar eventos a los botones
    document.getElementById('rock').addEventListener('click', () => playRound('Piedra'));
    document.getElementById('paper').addEventListener('click', () => playRound('Papel'));
    document.getElementById('scissors').addEventListener('click', () => playRound('Tijera'));

    function playRound(userChoice) {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = determineWinner(userChoice, computerChoice);

        // Actualizar puntajes
        if (result === 'win') {
            userScore++;
            resultDiv.textContent = `Ganaste 🎉: ${userChoice} vence a ${computerChoice}`;
            resultDiv.style.color = "green";
        } else if (result === 'lose') {
            computerScore++;
            resultDiv.textContent = `Perdiste 😢: ${computerChoice} vence a ${userChoice}`;
            resultDiv.style.color = "red";
        } else {
            resultDiv.textContent = `Empate 😐: Ambos eligieron ${userChoice}`;
            resultDiv.style.color = "blue";
        }

        // Actualizar marcador
        scoreDiv.textContent = `Puntuación - Tú: ${userScore} | Computadora: ${computerScore}`;
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'draw'; // Empate
        }

        if (
            (userChoice === 'Piedra' && computerChoice === 'Tijera') ||
            (userChoice === 'Papel' && computerChoice === 'Piedra') ||
            (userChoice === 'Tijera' && computerChoice === 'Papel')
        ) {
            return 'win'; // Usuario gana
        }

        return 'lose'; // Computadora gana
    }
});

