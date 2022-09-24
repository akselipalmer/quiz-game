import React, { useState } from "react";

export default function PendingScreen(props) {
  const [quizCatagory, setQuizCatagory] = useState(20);

  function handleCatagoryChange(event) {
    setQuizCatagory(event.target.value);
  }

  return (
    <div className="pending-screen__container">
      {props.data ? (
        <>
          <h1 className="pending-screen__container__h1">Quizzical</h1>

          <select
            id="favColor"
            value={quizCatagory}
            onChange={handleCatagoryChange}
            name="favColor"
          >
            <option value="">Any Catagory</option>
            <option value="&category=15">Gaming</option>
            <option value="&category=22">Geography</option>
            <option value="&category=27">Animals</option>
            <option value="&category=23">History</option>
            <option value="&category=10">Books</option>
            <option value="&category=20">Mythology</option>
            <option value="&category=19">Mathmatics</option>
            <option value="&category=11">Film</option>
          </select>
          <button
            className="pending-screen__container__start-game-btn"
            onClick={() => props.setActiveGame(quizCatagory)}
          >
            Start Game
          </button>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
