import { useContext } from "react";
import { quizContext } from "../contexts/QuizContext.js";
import QuizModal from "../components/QuizModal";
import ResultQuestion from "../components/ResultQuestion";
import StartQuiz from "../components/StartQuiz";
import "../style/HomePage.scss"
const HomePage = () => {
  const {
    quizState: { questions, questionIndex },
    isLoading,
  } = useContext(quizContext);
  return (
    <>
      {isLoading && questions.length === 0 && (
        <>
          <div className="loading">
            <div className="progress">
              <div className="color"></div>
              <h2 className="textLoading">Loading...</h2>
            </div>
          </div>
   
        </>
      )}
      {!isLoading && questions.length === 0 && <StartQuiz />}
      {questions.length > 0 && questionIndex < questions.length && <QuizModal />}
      {questions.length > 0 && questionIndex === questions.length && <ResultQuestion />}
    </>
  );
};

export default HomePage;
