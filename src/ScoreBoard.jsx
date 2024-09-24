import React from "react";

function ScoreBoard({ 
  player1, 
  player2, 
  score1, 
  score2, 
  avg1, 
  avg2, 
  currentSet, 
  currentLeg, 
  sets, 
  legs, 
  player1SetsWon, 
  player2SetsWon, 
  player1LegsWon, 
  player2LegsWon 
}) {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2>Scoreboard</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <div style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px', borderRadius: '5px', width: '150px' }}>
          <h3>{player1}</h3>
          <p>Punkte: {score1}</p>
          <p style={{ fontSize: '0.8em' }}>AVG: {avg1}</p>
          <p> Sets: {player1SetsWon}</p>
          <p> Legs: {player1LegsWon}</p>
        </div>
        <div style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px', borderRadius: '5px', width: '150px' }}>
          <h3>{player2}</h3>
          <p>Punkte: {score2}</p>
          <p style={{ fontSize: '0.8em' }}>AVG: {avg2}</p>
          <p> Sets: {player2SetsWon}</p>
          <p> Legs: {player2LegsWon}</p>
        </div>
      </div>
      <div>
        <p>Aktuelles Set: {currentSet}</p>
        <p>Aktuelles Leg: {currentLeg}</p>
      </div>
    </div>
  );
}

export default ScoreBoard;
