'use strict';

var resultOfTheRoundInformation = document.getElementById('output');
var numberOfRoundsInformation = document.getElementById('round');
var computerOutcome = document.getElementById('computer-score');
var drawOutcome = document.getElementById('draw-score');
var playerOutcome = document.getElementById('user-score');
var choiceMove = document.querySelectorAll('.player-move');
var content = document.querySelectorAll('#content');

var playerChoice;
var gameResult;
var computerMove;
var params = {
    playerScore: '',
    namePlayer: '',
    computerScore: '',
    drawScore: '',
    gameResult: '',
    roundOfGame: '',
    playedRound: '',
    progress: []
};

//Funkcja która zostaje wywoływana gdy dana
//rozgrywka zostanie zakończona poprzez przycisk 
//'NewGame' - następuje reset wartości
var reset = function() {
    resultOfTheRoundInformation.innerHTML = '';
    computerOutcome.innerHTML = 0;
    playerOutcome.innerHTML = 0;
    drawOutcome.innerHTML = 0;
}

//Otwarcie modala z rozpoczęciem gry
var openGame = function() {
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-two').classList.add('show');
    document.querySelector('#modal-one').classList.remove('show');
}

//Rozpoczęcie nowej gry z wyborem ilości rund z
//dodaniem odpowiednich informacji do pozczególnych zadań
var newGame = function() {
    params.progress = [];
    params.playedRound = 0;
    params.playerScore = 0;
    params.computerScore = 0;
    params.drawScore = 0;
    params.roundOfGame = 0;
    document.querySelector('#modal-overlay').classList.remove('show');
    document.querySelector('#modal-two').classList.remove('show');
    params.namePlayer = document.getElementById('namePlayer').value;
    params.roundOfGame = document.getElementById('enteredRounds').value;
    if (params.roundOfGame > 0) {
        reset();
    }
    if (isNaN(params.roundOfGame)) {
        numberOfRoundsInformation.innerHTML = '<span style="color:red;">Please enter the number! </span><br>';
    } else if (params.roundOfGame <= 0) {
        numberOfRoundsInformation.innerHTML = '<span style="color:yellow;">The number must be greater than zero!</span> <br>';
    } else {
        numberOfRoundsInformation.innerHTML = 'If you win ' + params.roundOfGame + ' rounds you will be winner!<br>';
    };
};

//
var progress = function(playerChoice, computerMove, gameResult) {
    params.playerChoice = playerChoice;
    params.computerMove = computerMove;
    params.gameResult = gameResult;

    var progressGame = {};
    progressGame['round'] = params.playedRound;
    progressGame['player'] = params.playerChoice;
    progressGame['computer'] = params.computerMove;
    progressGame['result'] = params.gameResult;
    progressGame['score'] = params.playerScore + ' - ' + params.computerScore;
    params.progress.push(progressGame);
}

//Tabela przechowująca wyniki z poszczególnych rynd
var tableWithResults = function() {
    scoreTable.innerHTML = '<tr><th>Round</th><th>' + params.namePlayer + '</th><th>Computer</th><th>Result</th><th>Score</th></tr>';
    for (var i = 0; i < params.progress.length; i++) {
        scoreTable.innerHTML += '<tr><td>' +
            params.progress[i]['round'] + '</td><td>' +
            params.progress[i]['player'] + '</td><td>' +
            params.progress[i]['computer'] + '</td><td>' +
            params.progress[i]['result'] + '</td><td>' +
            params.progress[i]['score'] + '</td></tr>';
    }
}

//Obliczenie ruchów komputera
function getComputerMove() {
    return ['paper', 'rock', 'scissors'][Math.floor(Math.random() * 3)];
}

//Nadanie wartości poniższym elementom
//w celu poprawnego działania 'playerMove'
function valueChoice(value) {
    if (value == 'paper') {
        return '0';
    } else if (value == 'rock') {
        return '1';
    } else {
        return '2';
    }
};

//Petla przywiazujaca funkcje, nadajaca odpowiedni atrybut
for (var i = 0; i < choiceMove.length; i++) {
    choiceMove[i].addEventListener('click', function(event) {
        var dataMove = this.getAttribute('data-move');
        playerMove(dataMove);
    });
};

//Dodawanie poszczególnych wyników z informacją
//zależne od danego ruchu(wygranej/przegranej)
var playerMove = function(playerChoice) {
    computerMove = getComputerMove();
    if (params.computerScore < params.roundOfGame && params.playerScore < params.roundOfGame) {
        if (valueChoice(playerChoice) - valueChoice(computerMove) === -1 || valueChoice(playerChoice) - valueChoice(computerMove) === 2) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:green;">| WIN! | </span><span style="text-transform:uppercase;font-weight:bold;">' + params.namePlayer + '</span> played: <span style="text-transform:uppercase;">' + playerChoice + '</span> computer played: <span style="text-transform:uppercase;">' + computerMove) + '</span>';
            gameResult = '<strong><span style="color:green;">WON!</span></strong>';
            params.playerScore++;
            params.playedRound++;
            playerOutcome.innerHTML = params.playerScore;
            progress(playerChoice, computerMove, gameResult);
        } else if (valueChoice(playerChoice) - valueChoice(computerMove) === 0) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:yellow;">| DRAW | </span><span style="text-transform:uppercase;font-weight:bold;">' + params.namePlayer + '</span> played: <span style="text-transform:uppercase;">' + playerChoice + '</span> computer played: <span style="text-transform:uppercase;">' + computerMove) + '</span>';
            gameResult = '<strong><span style="color:#e1b12c;">DRAW</span></strong>';
            params.drawScore++;
            params.playedRound++;
            drawOutcome.innerHTML = params.drawScore;
            progress(playerChoice, computerMove, gameResult);
        } else {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:#c23616;">| LOSS |  </span><span style="text-transform:uppercase;font-weight:bold;">' + params.namePlayer + '</span> played: <span style="text-transform:uppercase;">' + playerChoice + '</span> computer played: <span style="text-transform:uppercase;">' + computerMove) + '</span>';
            gameResult = '<strong><span style="color:#c23616;">LOSE</span></strong>';
            params.computerScore++;
            params.playedRound++;
            computerOutcome.innerHTML = params.computerScore;
            progress(playerChoice, computerMove, gameResult);
        }
        if (params.playerScore == params.roundOfGame || params.computerScore == params.roundOfGame) {
            finishGame();
        };
    };
};

//Zakończenie gry
var finishGame = function() {
    if (params.playerScore > params.computerScore) {
        document.querySelector('#modal-one p').innerHTML = '<span style="color:green;">YOU WON THE ENTIRE GAME!</span>';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';
        tableWithResults();
        showModal();
    } else {
        document.querySelector('#modal-one p').innerHTML = '<span style="color:#c23616;">YOU LOSE THE ENTIRE GAME!</span>';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';
        tableWithResults();
        showModal();
    }
};

//Działanie modala
var closeButtons = document.querySelectorAll('.modal .close');
var modals = document.querySelectorAll('.modal');

var showModal = function() {
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-one').classList.add('show');
};

var hideModal = function(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
};

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event) {
        event.stopPropagation();
    });
};