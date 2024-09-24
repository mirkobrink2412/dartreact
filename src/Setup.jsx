import React, { useState } from "react";

function Setup({ onGameStart }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameMode, setGameMode] = useState(501);
  const [sets, setSets] = useState(1);
  const [legs, setLegs] = useState(1);

  const handleStartGame = () => {
    if (player1 && player2) {
      onGameStart(player1, player2, gameMode, sets, legs);
    } else {
      alert("Bitte beide Spielernamen eingeben.");
    }
  };

  return (
    <div>
      <h2>Dart Spiel Setup</h2>
      <div>
        <label>Spieler 1: </label>
        <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
      </div>
      <div>
        <label>Spieler 2: </label>
        <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
      </div>
      <div>
        <label>Spielmodus: </label>
        <select value={gameMode} onChange={(e) => setGameMode(Number(e.target.value))}>
          <option value={301}>301</option>
          <option value={501}>501</option>
          <option value={701}>701</option>
          <option value={1001}>1001</option>
        </select>
      </div>
      <div>
        <label>Anzahl der Sets: </label>
        <input type="number" min="1" value={sets} onChange={(e) => setSets(Number(e.target.value))} />
      </div>
      <div>
        <label>Anzahl der Legs pro Set: </label>
        <input type="number" min="1" value={legs} onChange={(e) => setLegs(Number(e.target.value))} />
      </div>
      <button onClick={handleStartGame}>Spiel starten</button>
    </div>
  );
}

export default Setup;
