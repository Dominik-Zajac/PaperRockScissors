'use strict';
//var winningFinalScore = document.getElementById('winningResult');
//var lostFinalScore = document.getElementById('lostResult');
var resultOfTheRoundInformation = document.getElementById('output');
var numberOfRoundsInformation = document.getElementById('round');
var computerOutcome = document.getElementById('computer-score');
var drawOutcome = document.getElementById('draw-score');
var playerOutcome = document.getElementById('user-score');
var choiceMove = document.querySelectorAll('.player-move');
var content = document.getElementById('content');
var params = {playerScore: '', computerScore: 0, drawScore: '', gameResult: '', roundOfGame: 0, playedRound: '', progress:[]};
//Funkcja która zostaje wywoływana gdy dana
//rozgrywka zostanie zakończona poprzez przycisk 
//'NewGame' - następuje reset wartości
var reset = function() {
    resultOfTheRoundInformation.innerHTML = '';
    computerOutcome.innerHTML = 0;
    playerOutcome.innerHTML = 0;
    drawOutcome.innerHTML = 0;
    //lostFinalScore.innerHTML = '';
    //winningFinalScore.innerHTML = '';
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
    params.roundOfGame = window.prompt('How many rounds do you want to play?');
    scoreTable.innerHTML = '<tr><th>Round</th><th>Player move</th><th>Computer move</th><th>Result</th><th>Score</th></tr>';
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
var progress = function(playerChoice, computerMove, gameResult) {
    params.playerChoice = playerChoice;
    params.computerMove = computerMove;
    params.gameResult = gameResult;

    var progressGame = {};
    progressGame['round'] = params.playedRound;
    progressGame['player'] = params.playerChoice;
    progressGame['computer'] = params.computerMove;
    progressGame['result'] = params.gameResult;
    progressGame['score'] = params.playerScore + '-' + params.computerScore;
    params.progress.push(progressGame);
}

var tableWithResults = function() {
    for (var i = 0; i < params.progress.length; i++) {
        scoreTable.innerHTML += '<tr><td>' +
        params.progress[i]['round'] + '</td><td>' +
        params.progress[i]['player'] + '</td><td>' +
        params.progress[i]['computer'] + '</td><td>' +
        params.progress[i]['result'] + '</td><td>' +
        params.progress[i]['score'] + '</td></tr>';
    }
}

//Nadanie wartości poniższym elementom
//w celu poprawnego działania 'playerMove'
  function getComputerMove() {
  return ['paper', 'rock', 'scissors'][Math.floor(Math.random()*3)];
  }
function valueChoice(value) {
    if (value == 'paper') {
        return '0';
    } else if (value == 'rock') {
        return '1';
    } else {
        return '2';
    }
};

 for (var i = 0; i < choiceMove.length; i++) {
        choiceMove[i].addEventListener('click', function(event){
            var dataMove = this.getAttribute('data-move');
            playerMove(dataMove);
        });
    };
var playerChoice;
//Dodawanie poszczególnych wyników z informacją
//zależne od danego ruchu(wygranej/przegranej)
var playerMove = function(playerChoice) {
    var gameResult;
    var computerMove = getComputerMove();
    if (params.computerScore < params.roundOfGame && params.playerScore < params.roundOfGame) {
        if (valueChoice(playerChoice) - valueChoice(computerMove) === -1 || valueChoice(playerChoice) - valueChoice(computerMove) === 2) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:green;">| WIN! |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            gameResult = '<strong><span style="color:#27ae60;">YOU WON!</span></strong>';
            params.playerScore++;
            params.playedRound++;
            progress(playerChoice, computerMove, gameResult);
            playerOutcome.innerHTML = params.playerScore;
        } else if (valueChoice(playerChoice) - valueChoice(computerMove) === 0) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:yellow;">| DRAW |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            gameResult = '<span style="color:#f1c40f;">DRAW</span>';
            params.drawScore++;
            params.playedRound++;
            progress(playerChoice, computerMove, gameResult);
            drawOutcome.innerHTML = params.drawScore;
        } else {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:#c23616;">| LOSS |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            gameResult = '<span style="color:#e74c3c;">YOU LOSE</span>';
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

var finishGame = function() {
    if (params.playerScore > params.computerScore) {
        document.querySelector('.modal p').innerHTML = '<span style="color:green;">YOU WON THE ENTIRE GAME!</span>';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';
        showModal();
        tableWithResults();

    } else {
        document.querySelector('.modal p').innerHTML = '<span style="color:#c23616;">YOU LOSE THE ENTIRE GAME!</span>';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';
        showModal();
        tableWithResults();

    }
};


    var showModal = function() {
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector('#modal-one').classList.add('show');
        //document.querySelector('.modal p').innerHTML = 'Modal four';
    };


    var hideModal = function(event) {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    var closeButtons = document.querySelectorAll('.modal .close');

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }

    document.querySelector('#modal-overlay').addEventListener('click', hideModal);

    var modals = document.querySelectorAll('.modal');

    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
