'use strict';
//var winningFinalScore = document.getElementById('winningResult');
//var lostFinalScore = document.getElementById('lostResult');
var resultOfTheRoundInformation = document.getElementById('output');
var numberOfRoundsInformation = document.getElementById('round');
var computerOutcome = document.getElementById('computer-score');
var drawOutcome = document.getElementById('draw-score');
var playerOutcome = document.getElementById('user-score');
var choiceMove = document.querySelectorAll('.player-move');
var params = {playerScore: '', computerScore: '', drawScore: '', roundOfGame: ''};
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
    params.playerScore = 0;
    params.computerScore = 0;
    params.drawScore = 0;
    params.roundOfGame = 0;
    params.roundOfGame = window.prompt('How many rounds do you want to play?');
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

//Dodawanie poszczególnych wyników z informacją
//zależne od danego ruchu(wygranej/przegranej)
var playerMove = function(playerChoice) {
    var playerChoice;
    var computerMove = getComputerMove();
    if (params.computerScore < params.roundOfGame && params.playerScore < params.roundOfGame) {
        if (valueChoice(playerChoice) - valueChoice(computerMove) === -1 || valueChoice(playerChoice) - valueChoice(computerMove) === 2) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:green;">| WIN! |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            params.playerScore++;
            playerOutcome.innerHTML = params.playerScore;
        } else if (valueChoice(playerChoice) - valueChoice(computerMove) === 0) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:yellow;">| DRAW |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            params.drawScore++;
            drawOutcome.innerHTML = params.drawScore;
        } else {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:#c23616;">| LOSS |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            params.computerScore++;
            computerOutcome.innerHTML = params.computerScore;
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

    } else {
        document.querySelector('.modal p').innerHTML = '<span style="color:#c23616;">YOU LOSE THE ENTIRE GAME!</span>';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';
        showModal();

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
