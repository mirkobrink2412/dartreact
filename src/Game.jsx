import React, { useState } from "react";
import Setup from "./Setup";
import ScoreBoard from "./ScoreBoard";
import DartInput from "./DartInput";

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameMode, setGameMode] = useState(501);
  const [sets, setSets] = useState(1);
  const [legs, setLegs] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentLeg, setCurrentLeg] = useState(1);
  const [score1, setScore1] = useState(gameMode);
  const [score2, setScore2] = useState(gameMode);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  // eslint-disable-next-line
  const [doublesCount, setDoublesCount] = useState(null); 
  const [avg1, setAvg1] = useState(0);
  const [avg2, setAvg2] = useState(0);
  const [totalThrows1, setTotalThrows1] = useState(0);
  const [totalPoints1, setTotalPoints1] = useState(0);
  const [totalThrows2, setTotalThrows2] = useState(0);
  const [totalPoints2, setTotalPoints2] = useState(0);
  const [player1SetsWon, setPlayer1SetsWon] = useState(0);
  const [player2SetsWon, setPlayer2SetsWon] = useState(0);
  const [player1LegsWon, setPlayer1LegsWon] = useState(0);
  const [player2LegsWon, setPlayer2LegsWon] = useState(0);

  const GameStart = (player1Name, player2Name, mode, setsCount, legsCount) => {
    setPlayer1(player1Name);
    setPlayer2(player2Name);
    setGameMode(mode);
    setSets(setsCount);
    setLegs(legsCount);
    setScore1(mode);
    setScore2(mode);
    setCurrentPlayer(1);
    setGameStarted(true);
  };

  const scoreEingabe = (darts) => {
    const totalPoints = darts[0];

    if (currentPlayer === 1) {
      const newScore = score1 - totalPoints;
      setTotalThrows1(totalThrows1 + 3);
      setTotalPoints1(totalPoints1 + totalPoints);

      if (newScore === 0 && score1 <= 170) {
        LegWin(player1);
      } else if (newScore < 0 || newScore === 1 || (score1 > 170 && newScore === 0)) {
        alert("Bust! Zu viele Punkte oder du bist auf 1 gelandet.");
        setCurrentPlayer(2);
      } else {
        setScore1(newScore);
        setCurrentPlayer(2);
      }
      updateAvg(1, totalPoints);
    } else {
      const newScore = score2 - totalPoints;
      setTotalThrows2(totalThrows2 + 3);
      setTotalPoints2(totalPoints2 + totalPoints);

      if (newScore === 0 && score2 <= 170) {
        LegWin(player2);
      } else if (newScore < 0 || newScore === 1 || (score2 > 170 && newScore === 0)) {
        alert("Bust! Zu viele Punkte oder du bist auf 1 gelandet.");
        setCurrentPlayer(1);
      } else {
        setScore2(newScore);
        setCurrentPlayer(1);
      }
      updateAvg(2, totalPoints);
    }
  };

  const updateAvg = (player, totalPoints) => {
    if (player === 1) {
      const newTotalThrows = totalThrows1 + 3;
      const newTotalPoints = totalPoints1 + totalPoints;

      setAvg1(((newTotalPoints / newTotalThrows) * 3).toFixed(2));
      setTotalPoints1(newTotalPoints);
      setTotalThrows1(newTotalThrows);
    } else {
      const newTotalThrows = totalThrows2 + 3;
      const newTotalPoints = totalPoints2 + totalPoints;

      setAvg2(((newTotalPoints / newTotalThrows) * 3).toFixed(2));
      setTotalPoints2(newTotalPoints);
      setTotalThrows2(newTotalThrows);
    }
  };

  const LegWin = (winner) => {
    if (winner === player1) {
      setPlayer1LegsWon(player1LegsWon + 1);
    } else {
      setPlayer2LegsWon(player2LegsWon + 1);
    }

    const countDoubles = prompt("Wie viele Darts auf Doppel hast du geworfen? (1, 2 oder 3)");
    if (["1", "2", "3"].includes(countDoubles)) {
      setDoublesCount(countDoubles);
    } else {
      alert("Bitte eine gültige Anzahl an Darts eingeben (1, 2 oder 3).");
      return;
    }

    if ((winner === player1 && player1LegsWon + 1 === legs) || 
        (winner === player2 && player2LegsWon + 1 === legs)) {
      SetWin(winner);
    } else {
      resetLeg();
    }
  };

  const SetWin = (winner) => {
    if (winner === player1) {
      setPlayer1SetsWon(player1SetsWon + 1);
    } else {
      setPlayer2SetsWon(player2SetsWon + 1);
    }

    setPlayer1LegsWon(0);
    setPlayer2LegsWon(0);
    setScore1(gameMode);
    setScore2(gameMode);

    setCurrentPlayer(currentSet % 2 === 0 ? 1 : 2);

    setCurrentSet(currentSet + 1);
    setCurrentLeg(1);
  };

  const resetLeg = () => {
    setCurrentLeg(currentLeg + 1);
    setScore1(gameMode);
    setScore2(gameMode);
    setCurrentPlayer(currentLeg % 2 === 1 ? 2 : 1);
  };

  return (
    <div>
      {!gameStarted && <Setup onGameStart={GameStart} />}
      {gameStarted && (
        <div>
          <ScoreBoard
            player1={player1}
            player2={player2}
            score1={score1}
            score2={score2}
            avg1={avg1}
            avg2={avg2}
            currentSet={currentSet}
            currentLeg={currentLeg}
            sets={sets}
            legs={legs}
            player1SetsWon={player1SetsWon}
            player2SetsWon={player2SetsWon}
            player1LegsWon={player1LegsWon}
            player2LegsWon={player2LegsWon}
          />
          <DartInput currentPlayer={currentPlayer === 1 ? player1 : player2} onSubmitDarts={scoreEingabe} />
        </div>
      )}
    </div>
  );
}

export default Game;
