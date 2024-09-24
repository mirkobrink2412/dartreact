import React, { useState } from "react";

function DartInput({ currentPlayer, onSubmitDarts }) {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (value) => {
    setInputValue((prev) => prev + value.toString());
  };

  const clear = () => {
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    const totalPoints = parseInt(inputValue, 10);
    if (!isNaN(totalPoints)) {
      if (totalPoints > 180) {
        alert("Maximal 180 Punkte sind erlaubt.");
      } else {
        onSubmitDarts([totalPoints]);
        clear();
      }
    } else {
      alert("Bitte eine gültige Punktzahl eingeben.");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{currentPlayer}:</h3>
      <div>
        <input 
          type="text" 
          value={inputValue} 
          onKeyPress={handleKeyPress} 
          onChange={(e) => setInputValue(e.target.value)} 
          style={{ width: '100px', textAlign: 'center' }} 
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 30px)", gap: "5px", justifyContent: 'center', marginTop: "10px" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
          <button 
            key={value} 
            onClick={() => handleButtonClick(value)} 
            style={{ width: '30px', height: '30px', fontSize: '16px' }}
          >
            {value}
          </button>
        ))}
        <button 
          onClick={clear} 
          style={{ width: '30px', height: '30px', fontSize: '16px' }}
        >
          C
        </button>
        <button 
          key={0} 
          onClick={() => handleButtonClick(0)} 
          style={{ width: '30px', height: '30px', fontSize: '16px' }}
        >
          0
        </button>
      </div>
      <button 
        onClick={submit} 
        style={{ marginTop: "10px" }} 
      >
        Bestätigen
      </button>
    </div>
  );
}

export default DartInput;
