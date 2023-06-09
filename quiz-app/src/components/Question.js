import { useContext, useEffect, useState } from "react";
import { quizContext } from "../contexts/QuizContext.js";
import '../style/Question.scss'
import logo from "../img/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Question = () => {
  const {        
    quizState: { questionIndex, questions },
    checkAnswer,
    nextQuestion,
    saveAnswer
  } = useContext(quizContext);

  const [answer, setAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[questionIndex]);

  let answers = [ ...currentQuestion.incorrect_answers ];
  answers.push(currentQuestion.correct_answer);
  const handleSubmit = () => {
    if(!selectedAnswer){
      toast.error('Please check your answers !!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    if (selectedAnswer && answer === currentQuestion.correct_answer) {
      const isCorrect  = currentQuestion.correct_answer;
      checkAnswer();
      saveAnswer(currentQuestion, isCorrect);
    }
    if (selectedAnswer) {
      toast.success('Good job !!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      nextQuestion();
    }
  };
  const handleAnswerChange = (result) => {
    setAnswer(result);
    setSelectedAnswer(true);
  };

  useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
    setSelectedAnswer(false);
  }, [questionIndex]);  
  useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [answer]);
  return (
    <>
    <div className="containers">
    <img src={logo} className="img"/>
      <p className="question"> Question {questionIndex + 1}. {currentQuestion.question}</p>
      <p className="category">Category: {currentQuestion.category}</p>
      <div className="answers">
        {answers.map((result, index) => (
          <p key={index}>
            <label>
              <input 
              style={{marginRight:"10px"}}
                type="radio"
                value={result}
                checked={answer === result}
                onChange={() => handleAnswerChange(result)}
              />
              {result}
            </label>
          </p>
        ))}
      </div>
      {questionIndex < questions.length - 1 ? 
      <div className="buttons">
          <button className="btn-hover color-6" onClick={handleSubmit} >Next</button> 
      </div>
        : 
        <div className="buttons">
        <button className="btn-hover color-6" onClick={handleSubmit}>Done</button>
        </div>
      }
    </div>
    <ToastContainer />
    </>
  );
};

export default Question;
