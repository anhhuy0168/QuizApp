import { useContext } from "react";
import { quizContext } from "../contexts/QuizContext.js";
import Questions from "./Question";

const QuizModal = () => {
  const { quizState } = useContext(quizContext);

  return (
    <div>
      {quizState.questions.length > 0 && <Questions />}
    </div>
  );
};

export default QuizModal;
