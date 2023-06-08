import { createContext, useReducer, useState, useRef } from "react";
import { quizReducer } from "../reducers/QuizReducer";
import axios from "axios";

export const quizContext  = createContext();

const QuizContextProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  const [quizState, dispatch] = useReducer(quizReducer, {
    score: 0,
    questionIndex: 0,
    questions: [],
  });

  // Lấy câu hỏi từ API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=5`);
      dispatch({ type: "QUIZ_LOADED_SUCCESS", payload: response.data.results });
    } catch (error) {
      dispatch({ type: "QUIZ_LOADED_FAIL" });
    }
  };

  // Kiểm tra câu trả lời đúng
  const checkAnswer = () => {
    const score = quizState.score + 1;
    dispatch({ type: "CORRECT_ANSWER", payload: score });
  };

  // Chuyển sang câu hỏi tiếp theo
  const nextQuestion = () => {
    const questionIndex = quizState.questionIndex + 1;
    dispatch({ type: "NEXT_QUESTION", payload: questionIndex });
  };

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
  };

  const [isLoading, setIsLoading] = useState(false);

  const quizContextData = {
    quizState,
    fetchQuestions,
    checkAnswer,
    nextQuestion,
    timer,
    handleStart,
    handlePause,
    isLoading,
    setIsLoading,
  };

  return (
    <quizContext.Provider value={quizContextData}>
      {children}
    </quizContext.Provider >
  );
};

export default QuizContextProvider;
