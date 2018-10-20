'use strict';
var winningFinalScore = document.getElementById('winningResult');
var lostFinalScore = document.getElementById('lostResult');
var resultOfTheRoundInformation = document.getElementById('output');
var numberOfRoundsInformation = document.getElementById('round');
var playerScore;
var computerScore;
var drawScore;
var roundOfGame;
var computerOutcome = document.getElementById('computer-score');
var drawOutcome = document.getElementById('draw-score');
var playerOutcome = document.getElementById('user-score');
var finishGame;
var choiceMove = document.querySelectorAll('.player-move');
//Funkcja która zostaje wywoływana gdy dana
//rozgrywka zostanie zakończona poprzez przycisk 
//'NewGame' - następuje reset wartości
var reset = function() {
    resultOfTheRoundInformation.innerHTML = '';
    computerOutcome.innerHTML = 0;
    playerOutcome.innerHTML = 0;
    drawOutcome.innerHTML = 0;
    lostFinalScore.innerHTML = '';
    winningFinalScore.innerHTML = '';
}
//Rozpoczęcie nowej gry z wyborem ilości rund z
//dodaniem odpowiednich informacji do pozczególnych zadań
var newGame = function() {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    roundOfGame = 0;
    roundOfGame = window.prompt('How many rounds do you want to play?');
    if (roundOfGame > 0) {
        reset();
    }
    if (isNaN(roundOfGame)) {
        numberOfRoundsInformation.innerHTML = '<span style="color:red;">Please enter the number! </span><br>';
    } else if (roundOfGame <= 0) {
        numberOfRoundsInformation.innerHTML = '<span style="color:yellow;">The number must be greater than zero!</span> <br>';
    } else {
        numberOfRoundsInformation.innerHTML = 'If you win ' + roundOfGame + ' rounds you will be winner!<br>';
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
    if (computerScore < roundOfGame && playerScore < roundOfGame) {
        if (valueChoice(playerChoice) - valueChoice(computerMove) === -1 || valueChoice(playerChoice) - valueChoice(computerMove) === 2) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:green;">| WIN! |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            playerScore++;
            playerOutcome.innerHTML = playerScore;
        } else if (valueChoice(playerChoice) - valueChoice(computerMove) === 0) {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:yellow;">| DRAW |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            drawScore++;
            drawOutcome.innerHTML = drawScore;
        } else {
            resultOfTheRoundInformation.innerHTML = ('<span style="color:#c23616;">| LOSS |</span> you played: ' + playerChoice + ' computer played: ' + computerMove);
            computerScore++;
            computerOutcome.innerHTML = computerScore;
        }
        if (playerScore == roundOfGame || computerScore == roundOfGame) {
            finishGame();
        };
    };
};

finishGame = function() {
    if (playerScore > computerScore) {
        winningFinalScore.innerHTML = 'YOU WON THE ENTIRE GAME!';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';

    } else {
        lostFinalScore.innerHTML = 'YOU LOSE THE ENTIRE GAME!';
        numberOfRoundsInformation.innerHTML = 'Game over, please press the "New game" button!';

    }
};