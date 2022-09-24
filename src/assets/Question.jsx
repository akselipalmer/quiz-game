import React, { useState } from "react";

export default function Question(props) {
  const { question, correct_answer, incorrect_answers } = props.data;
  const [answerData, setAnswerData] = useState({
    currentAnswer: "",
    correctAnswer: correct_answer,
  });
  const [randomIndex] = useState(Math.floor(Math.random() * 4));
  const defaultBorder = "0.7px solid #F5F7FB";

  function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function getTheAnswers() {
    let i = 0;
    let answers = incorrect_answers.map((answer) => {
      i++;
      return (
        <div
          key={i}
          style={style(answer)}
          onClick={() => checkAnswer(answer)}
          className="question__answer"
        >
          {decodeHtml(answer)}
        </div>
      );
    });
    answers.splice(
      randomIndex,
      0,
      <div
        key={12}
        style={style(correct_answer)}
        onClick={() => checkAnswer(correct_answer)}
        className="question__answer"
      >
        {decodeHtml(correct_answer)}
      </div>
    );
    return answers;
  }

  function style(answer) {
    if (props.activeGame === "Active") {
      if (answer === answerData.currentAnswer) {
        return { backgroundColor: "#D6DBF5", border: defaultBorder };
      }
    }
    if (props.activeGame === "Result") {
      if (answer === answerData.correctAnswer) {
        return { backgroundColor: "#94D7A2", border: defaultBorder };
      }
      if (
        answer === answerData.currentAnswer &&
        answer !== answerData.correctAnswer
      ) {
        return { backgroundColor: "#F8BCBC", border: defaultBorder };
      }
    }
    return { backgroundColor: "transparent" };
  }

  function checkAnswer(answer) {
    if (props.activeGame === "Active") {
      setAnswerData((prevData) => ({ ...prevData, currentAnswer: answer }));
      if (answer === correct_answer) {
        props.submitAnswer(true, props.id);
      } else {
        props.submitAnswer(false, props.id);
      }
    } else {
      console.log("unable to change answer after submitting");
    }
  }

  return (
    <div className="question__container__container">
      <h2 className="question__container__heading">{decodeHtml(question)}</h2>
      <div className="question__container__answer-container">
        {getTheAnswers()}
      </div>
    </div>
  );
}
