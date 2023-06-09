import { useContext } from "react";
import { quizContext } from "../contexts/QuizContext.js";
import { useHistory } from "react-router-dom";
import '../style/ResultStyle.scss'
import Happy from "../img/happy.jpg"
import Sad from "../img/sadbee.jpg"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const ResultQuestion = () => {

  const {
    quizState: { score, questionIndex, correctQuestions },
    timer,
    handlePause,
  } = useContext(quizContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  handlePause();

  const history = useHistory();

  const reload = () => {
    history.go(0);
  };
  // Kiểm tra xem có câu trả lời đúng nào hay không
  const hasCorrectAnswer = correctQuestions.some(question => question.answer === question.question.correct_answer);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>List of Correct Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {correctQuestions.map((question, index) => (
            question?.answer === question.question.correct_answer ? (
              <div key={index}> <b>{index +1}: </b>{question.question.question}</div>
            ) : null
          ))}
          {!hasCorrectAnswer && <div>You don't have any question correct !!</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div >
        {score < questionIndex / 2 ? (
          <div className="result" style={{ textAlign: "center" }} >
            <h1>Completed!!</h1>
            <img src={Sad} className="img" />
            <h3>Better luck next time!</h3>
            <div>
              <b>{score}/{questionIndex}</b> correct answers in <b>{timer} seconds</b>
            </div>
            <div className="containerButton">
              <div className="buttons">
                <button className="btn-hover color-6" onClick={reload}>Play again!</button>
              </div>
              <div className="buttons">
                <button className="btn-hover color-6" onClick={handleShow}>View Correct Question</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="result" style={{ textAlign: "center" }}>
            <h1 >Congratulations!!</h1>
            <img src={Happy} className="img" />
            <h3 >You are amazing!!</h3>
            <div>
              <b>{score}/{questionIndex}</b> correct answers in <b>{timer} seconds</b>
            </div>
            <div className="containerButton">
              <div className="buttons">
                <button className="btn-hover color-6" onClick={reload}>Play again!</button>
              </div>
              <div className="buttons">
                <button className="btn-hover color-6" onClick={handleShow}>View Correct Question</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ResultQuestion;
