/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/**************************************************************************** 
 *  3 coding challenges
 * 
 *  change the game to follow these rules
 * 
 * 1) A player looses his ENTIRE score when he rolls two 6 in a row. After that,
 *     its the next player's turn (Hint: always save the previous dice roll in a separate variable)
 * 
 * 2) Add an input field to the HTML where players can set the winning score, so that they can change
 *    the predefined score of 100. (Hint: you can read that value with the .value property
 *      in JS)
 * 
 * 3) Add another dice to the game, so that there are two dices now. The player looses his current score when
 *     one of the is a 1.
*/


var scores, roundScore, activePlayer, gamePlaying, secondDice;

init();

//document.querySelector('#current-' + activePlayer ).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //  1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        //  2. Display the result
        //var diceDOM = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        //diceDOM.style.display = 'block';
        //diceDOM.src = 'dice-' + dice + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        if (dice1 !== 1 && dice2 !== 1) {
            //  Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // challenge 1: two 6 -> second var 
            //secondDice = dice;
        }
        else {
                //  Next player
                nextPlayer();
        }
        /*
        // challenge 1
        if (dice === 6 && secondDice === dice) { 
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        //  3. Update the round score IF the rolled number was NOT a 1
        else if (dice !== 1) {
                //  Add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                // challenge 1: two 6 -> second var 
                secondDice = dice;
        }
        else {
                //  Next player
                nextPlayer();
        }
        */

    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //2) input score field value - challenge 2
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
        // nextPlayer
        nextPlayer();
        }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    secondDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
    roundScore = 0; // reset the round score

    document.getElementById('current-0').textContent = 0; //set the current score to 0
    document.getElementById('current-1').textContent = 0;

    //removing and adding classes 
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');   // toggle active class
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none'; //hide the dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
 
    //document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent  = '0';
    document.getElementById('score-1').textContent  = '0';
    document.getElementById('current-0').textContent  = '0';
    document.getElementById('current-1').textContent  = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

























