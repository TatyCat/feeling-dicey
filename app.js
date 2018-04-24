/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, rollScore, activePlayer, gamePlaying, previousRoll;

initGame();
previousRoll = 0;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. need random number

        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+ dice + '.png';

        //3. update the round IF the rolled number is NOT a one.
        //added challenge to reset score if a six is rolled twice in a row.

        if(previousRoll === 6 && dice === 6){
            rollScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            alert('DOUBLE SIXES! Aw that sucks, start over.')

            nextPlayer();
        }else if(dice !==1){
            rollScore += dice;

            document.querySelector('#current-' + activePlayer).textContent = rollScore;
            }else if (dice === 1){
                setTimeout(function() { alert("Oh no! You rolled a one. Your score is now zero and it\'s the next player\'s turn."); }, 100);
                nextPlayer();
        }

        previousRoll = dice;



        // ------------
        // if(dice !==1){
        //     rollScore += dice;
        //     previousRoll += dice;
        //
        //     document.querySelector('#current-' + activePlayer).textContent = rollScore;
        // // }else if (dice === 1){
        // //     setTimeout(function() { alert("Oh no! You rolled a one. Your score is now zero and it\'s the next player\'s turn."); }, 100);
        // //     nextPlayer();
        //
        // }else if(previousRoll === 6 && dice === 6){
        //     rollScore = 0;
        //     document.querySelector('#current-' + activePlayer).textContent = 0;
        //     scores[activePlayer] = 0;
        //     alert('Aw that sucks, start over.')
        //
        //     nextPlayer();
        // }
        // ------------

    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //add current score to global score.
        scores[activePlayer] += rollScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if the current player won the game
        if(scores[activePlayer] >= 100){
            gamePlaying = false;

            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        }else{
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click',initGame);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    rollScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function initGame(){
    scores = [0,0];
    rollScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


//additional challenges
//1 - Player loses entire score & nextPlayer is called if player rolls 2 6s in a row. - Save the previous dice roll in a separate var
    //in order to know if player rolled to 6s in a row, would need to hold the last roll value in a variable and compare it to the current roll.
    //then write an if statement if the current roll is equal to six && prev roll ==6, then reset all scores and call next player .

//2- Add an input filed to the HTML where Players can set the winning score, so they can change the winning score. .vlaue property
    //add input filed somewhere on page or use prompt asking for total score.
    // set that value to be a var. change in above code

//3-Add another dice ot the game so that there ar 2. the player still loses it's currnet score if one of them is a 1. use css to position the second dice.
    //can i change dice to be a function to call? if not, add another die using the code and position on page
























// Notes
// document.querySelector("#current-" + activePlayer).textContent = dice; //dynammiccccc active player
// document.querySelector('#current-'+activePlayer).innerHTML='<em>' + dice + '</em>'; //can set html as well.
//var x= document.querySelector('#score-0').textContent; //ex - only reads it and store it in x.
//console.log(x);