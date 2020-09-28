/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/**
 * Form script start
 * =====================================================
 */
var bestWinningNum = 0;

document.querySelector('.submit').addEventListener('click', function(e){
  e.preventDefault();

  var player1Name, player2Name, winningNum, message;

  message = document.querySelector('.message');
  player1Name = document.querySelector('.player-1-name').value;
  player2Name = document.querySelector('.player-2-name').value;
  winningNum = document.querySelector('.winning-num').value;

  if( player1Name == '' || player1Name == null || player2Name == '' || player2Name == null  || winningNum == '' || winningNum == null ) {
    message.innerHTML = `<p>All the input field is required</p>`;
  } else {
    message.innerHTML = '';
    document.getElementById('name-0').textContent = player1Name;
    document.getElementById('name-1').textContent = player2Name;
    document.querySelector('.start-form').style.display = 'none';
    document.querySelector('.game-display').style.display = 'block';
    bestWinningNum = winningNum;
  }
  
});





/* 
 *Game script start
 *================================================
 */

var scores, dice, activePlayer, gamePlaying, roundScore;



  init();

  function init(){
    scores = [0, 0];
    dice = document.querySelector('.dice');
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    dice.style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
  };




  document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
      var diceNum = Math.floor( Math.random() * 6 ) + 1;
      
      dice.style.display = 'block';
      dice.src = 'dice-' + diceNum + '.png';

      if( diceNum !== 1 ){
        roundScore += diceNum;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
      } else {
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        activePlayer === 0? activePlayer = 1: activePlayer = 0;
        dice.style.display = 'none';
      }
    }
  });



  document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
      scores[activePlayer] += roundScore;
      document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];
      roundScore = 0;
      document.getElementById('current-'+ activePlayer).textContent = '0';

      if( scores[activePlayer] >= bestWinningNum ){
        document.getElementById('score-'+ activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        activePlayer === 0? activePlayer = 1: activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      }

      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
      dice.style.display = 'none';

      activePlayer === 0? activePlayer = 1: activePlayer = 0;
    }
  });


  document.querySelector('.btn-new').addEventListener('click', function(){
    return init();
  });







