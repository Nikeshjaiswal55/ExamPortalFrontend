import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PiHandWaving } from 'react-icons/pi';
// import Countdown from 'react-countdown-now';
import CountdownTimer from '../../../utils/CountDownTimer';
import { CustomButton } from '../../../theme/Button/Buttons';
import { Button, Modal, Spinner } from 'react-bootstrap';
import {
  useGetAllQuestionsFromPaperIdQuery,
  usePostSaveResultMutation,
} from '../../../apis/Service';
import { Loader } from '../../../components/Loader/Loader';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function StudentPaper({
  paperId,
  decodedData,
  isLoading,
  handleSubmit,
  paperSubmit,
  cameraStop,
}) {
  const [showSubmit, setShowSubmit] = useState(false);
  const handleSubmitClose = () => setShowSubmit(false);
  const handleSubmitShow = () => setShowSubmit(true);
  // const { data, isSuccess, isLoading } =
  //   useGetAllQuestionsFromPaperIdQuery(paperId);
  const [saveResult, { isSucess, isLoading: submitPaperLoading }] =
    usePostSaveResultMutation();
  const [showOnTimeOver, setShowOnTimeOver] = useState(false);
  const progressBar = useRef(null);
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    new Array(decodedData?.questions?.length)
  );

  const imagesArray = useSelector((state) => state.admin.image);

  function getUserAnswereWithQuestion() {
    const questionsJson = JSON.stringify(decodedData?.questions);
    let questions = JSON.parse(questionsJson);
    console.log('before ', questions);
    decodedData?.questions.forEach((value, index) => {
      questions[index].userAns = selectedOption[index];
    });
    console.log('after ', questions);
    return questions;
  }

  const stdData = JSON.parse(localStorage.getItem('stdData'));
  async function submitPaperDetails(params) {
    console.log(imagesArray, 'IMageArraay =====================');
    // const randomImg = JSON.parse(localStorage.getItem('capturedImage'));
    // const ss = localStorage.getItem('ss');
    // imagesArray.push(ss);
    const questions = getUserAnswereWithQuestion();

    const result = {
      studentId: stdData.userId,
      paperId: paperId,
      questions: questions,
      cheating: {
        studentId: stdData.userId,
        paperId: paperId,
        images: imagesArray,
        audios: null,
      },
    };
    cameraStop();
    console.log('result in submit :  ', result);
    saveResult(result).then(() => {
      handleSubmit();
      handleSubmitClose();
    });
  }

  function isChecked(id) {
    console.log('selected option :- ', selectedOption[id]);
    return selectedOption[id] ? true : false;
  }
  function updateProgressBar() {
    const progress = ((count + 1) / decodedData?.questions?.length) * 100;
    progressBar.current.style.width = progress + '%';
  }
  function handleChecked(e, id) {
    if (!isChecked(id)) {
      setCount(count + 1);
      updateProgressBar();
      console.log('updated progressbar');
    }
    const update = selectedOption;
    console.log(e.target.value);
    console.log(id);
    update[id] = e.target.value;
    console.log('update ========================', update);
  }

  const handleTimerEnd = useCallback(() => {
    setShowOnTimeOver(true);
    cameraStop();
    submitPaperDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="row w-100 gap-4  p-3 ">
          <>
            <div className="col-lg-8 offset-lg-2 ">
              <div className=" d-flex flex-wrap justify-content-between">
                <div>
                  <h1 className=" text-capitalize">
                    {decodedData?.examDetails.assessmentName}
                  </h1>
                  <div className=" d-flex align-items-center px-3 fs-6">
                    <CountdownTimer
                      initialTime={+decodedData?.examDetails.examDuration}
                      // initialTime={40}
                      onTimerEnd={handleTimerEnd}
                    />
                    <div
                      className=" mx-1 bg-dark-subtle rounded-5"
                      style={{ width: '200px', height: '10px' }}
                    >
                      <div
                        className=" rounded-5"
                        style={{
                          width: '0px',
                          height: '10px',
                          backgroundColor: 'blue',
                        }}
                        ref={progressBar}
                      ></div>
                    </div>{' '}
                    <span>
                      {count}/{decodedData?.questions?.length} question
                    </span>
                  </div>
                </div>
                <div className="d-none d-md-flex justify-content-center align-items-center flex-column">
                  <h1>
                    Hey {stdData?.email.split('@')[0]} 👋
                    {/* <PiHandWaving size={35} /> */}
                  </h1>
                  <div className=" d-flex justify-content-center gap-5 fs-5 text-capitalize">
                    {' '}
                    <p>min score:{decodedData?.examDetails.minimum_marks}% </p>
                    <p>max score:{decodedData?.examDetails.totalMarks} </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-8  offset-lg-2 p-lg-4  overflow-auto  "
              style={{ maxHeight: '60vh' }}
            >
              {decodedData?.questions &&
                decodedData?.questions.map((value, index) => {
                  return (
                    <div className="p-1 py-3 p-lg-4 my-3  shadow border rounded-3 bg-white">
                      <div className="question d-flex fs-6">
                        <span>{index + 1}.</span>
                        <p>{value.questions.replaceAll('+', ' ')}?</p>
                      </div>
                      <ul className="options text-wrap  fs-6 list-unstyled">
                        {value.options &&
                          value?.options?.map((valueopt, indexopt) => {
                            return (
                              <li className=" d-flex gap-2">
                                <input
                                  type="radio"
                                  name={`question${index}`}
                                  value={valueopt}
                                  onClick={(e) => {
                                    handleChecked(e, index);
                                  }}
                                  id={`ques${index}-opt${indexopt}`}
                                />
                                <label for={`ques${index}-opt${indexopt + 1}`}>
                                  {valueopt}
                                </label>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
            </div>
            <div className="col-lg-8  offset-lg-2 ">
              <div className=" d-flex w-100 justify-content-end p-0 m-0">
                <CustomButton
                  className={'rounded-4 px-1 px-md-5 m-0 m-md-3 mb-0 w-25 '}
                  buttonText={'submit'}
                  onButtonClick={handleSubmitShow}
                />
              </div>
            </div>
          </>
        </div>
      )}
      {showSubmit && (
        <Modal
          show={showSubmit}
          onHide={handleSubmitClose}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {' '}
              Are You Sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>confirm you want Submit </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex w-100 gap-3">
              <Button
                variant="dark"
                className="rounded-4 w-100"
                onClick={handleSubmitClose}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                className="rounded-4 w-100"
                onClick={submitPaperDetails}
              >
                {submitPaperLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {showOnTimeOver && (
        <Modal
          show={showOnTimeOver}
          onHide={handleSubmitClose}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Just wait a minute..
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your Exam is Over</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex w-100 gap-3">
              <Button
                variant="success"
                className="rounded-4 w-100"
                onClick={handleSubmit}
              >
                {submitPaperLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'ok'
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
