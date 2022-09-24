import "./App.css";
import { useEffect, useState } from "react";
import PendingScreen from "./assets/PendingScreen";
import Question from "./assets/Question";

function App() {
  const [data, setData] = useState();
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [displayResultsButton, setDisplayResultsButton] = useState(false);
  const [activeGame, setActiveGame] = useState("Pending");
  // Game States "Pending", "Active", "Result"

  useEffect(() => {
    setData(fetchData());
  }, []);

  useEffect(() => {
    if (currentAnswers.length === 5) {
      setDisplayResultsButton(true);
    }
  }, [currentAnswers]);

  async function fetchData(catagory) {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&${catagory}&difficulty=easy&type=multiple`
    );
    const data = await response.json();
    return data;
  }

  function startNewGame(catagory) {
    setData(async () => {
      const dataFromCatagory = await fetchData(catagory);
      setData(dataFromCatagory);
      await setActiveGame("Active");
    });
  }

  function resetGame() {
    setCurrentAnswers([]);
    setDisplayResultsButton(false);
    setActiveGame("Pending");
  }

  function submitAnswer(answer, questionIndex) {
    setCurrentAnswers((prevAnswers) => {
      let filteredAnswers = prevAnswers.filter(
        (question) => question.questionIndex !== questionIndex
      );
      return [
        ...filteredAnswers,
        { questionIndex: questionIndex, correct: answer },
      ];
    });
  }

  function mapOverEachQuestion() {
    let i = 0;
    return data.results.map((result) => {
      i++;
      return (
        <div key={i} className="question-container">
          <Question
            data={result}
            key={i}
            id={i - 1}
            submitAnswer={submitAnswer}
            activeGame={activeGame}
          />
          <hr />
        </div>
      );
    });
  }

  return (
    <div className="app__container">
      {activeGame === "Pending" ? (
        <PendingScreen data={data} setActiveGame={startNewGame} />
      ) : activeGame === "Active" ? (
        <div className="app__question__container">
          {mapOverEachQuestion()}
          {displayResultsButton ? (
            <p className="app__question__container__p">Ready to Submit!</p>
          ) : (
            <p className="app__question__container__p">
              still waiting for {5 - currentAnswers.length} answer
              {currentAnswers.length < 4 ? "s" : ""}
            </p>
          )}
          {displayResultsButton && (
            <button
              className="app__question__container__new-game-btn"
              onClick={() => setActiveGame("Result")}
            >
              Submit Answers
            </button>
          )}
        </div>
      ) : activeGame === "Result" ? (
        <div className="app__question__container">
          {mapOverEachQuestion()}
          <p className="app__question__container__p">
            You got {currentAnswers.filter((answer) => answer.correct).length}/5
            question correct!
          </p>
          <button
            className="app__question__container__new-game-btn"
            onClick={resetGame}
          >
            Play Again?
          </button>
        </div>
      ) : (
        <p>Active state game error</p>
      )}
    </div>
  );
}

export default App;
