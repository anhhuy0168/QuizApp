import { useContext } from "react";
import { quizContext } from "../contexts/QuizContext.js";
import { useHistory } from "react-router-dom";
import '../style/ResultStyle.scss'
import Happy from "../img/happy.jpg"
import Sad from "../img/sadbee.jpg"
const ResultQuestion = () => {
  const {
    quizState: { score, questionIndex, correctQuestions },
    timer,
    handlePause,
  } = useContext(quizContext);

  handlePause();

  const history = useHistory();

  const reload = () => {
    history.go(0);
  };

  return (
    <div >
      {score < questionIndex / 2 ? (
        <div className="result" style={{ textAlign: "center" }} >
          <h1>Completed!!</h1>
          <img src={Sad} className="img" />
          <h3>Better luck next time!</h3>
          <div>
            <b>{score}/{questionIndex}</b> correct answers in <b>{timer} seconds</b>
            <div>danh sách câu trả lời đúng</div>
            {correctQuestions.map((question, index) => (
              question?.answer === question.question.correct_answer ? (
                <li key={index}>{question.question.question}</li>
              ) : (
                <div>You dont have any question correct !!</div>
              )
            ))}
          </div>
          <div className="buttons">
            <button className="btn-hover color-6" onClick={reload}>Play again!</button>
          </div>
        </div>
      ) : (
        <div className="result" style={{ textAlign: "center" }}>
          <h1 >Congratulations!!</h1>
          <img src={Happy} className="img" />
          <h3 >You are amazing!!</h3>
          <div>
            <div>
              <div>danh sách câu trả lời đúng</div>
              {correctQuestions.map((question, index) => (
                question?.answer === question.question.correct_answer ? (
                  <li key={index}>{question.question.question}</li>
                ) : null
              ))}

            </div>
          </div>
          <div className="buttons">
            <button className="btn-hover color-6" onClick={reload}>Play again!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultQuestion;
