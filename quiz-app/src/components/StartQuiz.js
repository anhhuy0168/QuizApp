import { useContext } from "react";
import { quizContext } from "../contexts/QuizContext.js";
import "../style/StartQuizStyle.scss"
const StartQuiz = () => {
  const { fetchQuestions, handleStart, setIsLoading } = useContext(quizContext);

  const startQuiz = () => {
    fetchQuestions();
    handleStart();
    setIsLoading(true);
  };

  return (
    <div className="display"style={{textAlign:"center"}}>
      <h1>Start Quiz</h1>
      <div className="buttons">
      <button className="btn-hover button" onClick={startQuiz}>Start</button>
      </div>
    </div>
  );
};

export default StartQuiz;
