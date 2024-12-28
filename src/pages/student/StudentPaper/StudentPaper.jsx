/* eslint-disable react/prop-types */
import {memo,useCallback,useEffect,useRef,useState} from 'react';
// import Countdown from 'react-countdown-now';
import {CustomButton} from '../../../theme/Button/Buttons';
import {Button,Modal,Spinner} from 'react-bootstrap';
import {usePostSaveResultMutation} from '../../../apis/Service';
import {Loader} from '../../../components/Loader/Loader';
import {useNavigate} from 'react-router';
import {useSelector} from 'react-redux';
import {CountDownTimerLibrary} from '../../../utils/CountDownTimerLibrary';
import { getDecryptedResponse } from '../../../utils/getDecryptedResponse';

const StudentPaper = memo(function StudentPaper({
  paperId,
  decodedData,
  isLoading,
  handleSubmit,
  cameraStop,
  tabSitchSubmit,
  tabBlurCount,
  examDuration,
  setExamDuration
}) {
  const navigate = useNavigate();
  const [showSubmit,setShowSubmit] = useState(false);
  const handleSubmitClose = useCallback(() => setShowSubmit(false),[]);
  const handleSubmitShow = useCallback(() => setShowSubmit(true),[]);
  const [isPaperSubmitted,setIsPaperSubmitted] = useState(false);
  // const { data, isSuccess, isLoading } =
  //   useGetAllQuestionsFromPaperIdQuery(paperId);
  const [saveResult,{isLoading: submitPaperLoading}] =
    usePostSaveResultMutation();
  const [showOnTimeOver,setShowOnTimeOver] = useState(false);
  const progressBar = useRef(null);
  const [count,setCount] = useState(0);
  const [selectedOption,] = useState(
    new Array(decodedData?.questions?.length)
  );
  // const [examDuration,setExamDuration] = useState();
  // useEffect(() => {
  //   setExamDuration(decodedData?.examDetails?.examDuration);
  // },[decodedData?.examDetails?.examDuration]);
  useEffect(() => {
    if(tabSitchSubmit > 1 || tabBlurCount > 4) {
      if(!isPaperSubmitted) {
        setShowOnTimeOver(true);
        setIsPaperSubmitted(true);
        submitPaperDetails();
      }
    }
  },[tabSitchSubmit,tabBlurCount]);

  const imagesArray = useSelector((state) => state.admin.image);
  const audioArray = useSelector((state) => state.admin.audio);

  function getUserAnswereWithQuestion() {
    const questionsJson = JSON.stringify(decodedData?.questions);
    let questions = JSON.parse(questionsJson);
    decodedData?.questions.forEach((value,index) => {
      if(typeof selectedOption[index] === 'string') {
        questions[index].correctAns = questions[index].correctAns.toLowerCase().replaceAll("+","");
        questions[index].userAns = selectedOption[index].toLowerCase().replaceAll("+","");
      } else {
        questions[index].userAns = selectedOption[index]
      }
    });
    return questions;
  }


  const stdData = JSON.parse(localStorage.getItem('stdData'));
    const otp_data= getDecryptedResponse('otp_data')
    const s_data= getDecryptedResponse('s-data')
  const submitPaperDetails = () => {
    // const randomImg = JSON.parse(localStorage.getItem('capturedImage'));
    // const ss = localStorage.getItem('ss');
    // imagesArray.push(ss);
    const questions = getUserAnswereWithQuestion();

    const result = {
      studentId: stdData?.userId??otp_data?.std_id,
      paperId: paperId,
      questions: questions,
      cheating: {
        studentId: stdData?.userId??otp_data?.std_id,
        paperId: paperId,
        images: imagesArray,
        audios: audioArray,
      },
    };
    cameraStop();
    saveResult(result).then(() => {
      handleSubmit();
      handleSubmitClose();
      navigate(`/student/exam-submited/${paperId}`)
    });

  }

  function isChecked(id) {
    return selectedOption[id] ? true : false;
  }
  function updateProgressBar() {
    const progress = ((count + 1) / decodedData?.questions?.length) * 100;
    progressBar.current.style.width = progress + '%';
  }
  function handleChecked(e,id) {
    if(!isChecked(id)) {
      setCount(count + 1);
      updateProgressBar();
    }
    const update = selectedOption;
    update[id] = e.target.value;
  }

  const handleTimerEnd = useCallback(() => {
    setShowOnTimeOver(true);
    cameraStop();
    submitPaperDetails();
  },[]);

  return (
    <>
      {isLoading || tabSitchSubmit > 1 || tabBlurCount > 4 ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="row w-100 gap-4  p-3 ">
          <>
              <div className="col-lg-8 offset-lg-2 ">
                <div className=" w-100 d-flex flex-wrap justify-content-between">
                  <div className=' w-100'>
                    <h1 className="w-100 text-capitalize">
                      {decodedData?.examDetails.assessmentName.replaceAll(
                        '+',
                        ' '
                      )}
                  </h1>
                    <div className=" w-100 d-flex flex-column flex-sm-row align-items-lg-center px-0 px-sm-3 mt-5 mt-sm-0 fs-6">
                      {examDuration && <CountDownTimerLibrary
                      initialTime={parseInt(
                        examDuration
                      )
                        } setInitialTime={setExamDuration}
                      // initialTime={40}
                      onTimerEnd={handleTimerEnd}
                      />}
                    <div
                      className=" mx-1 bg-dark-subtle rounded-5"
                        style={{width: '12.25rem',height: '10px'}}
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
                      {count}/{decodedData?.questions?.length} Question
                    </span>
                  </div>
                </div>
                <div className="d-none d-md-flex justify-content-center align-items-center flex-column">
                  <h3>
                    Hey {stdData?.email.split('@')[0] ?? s_data?.name}
                    {/* <PiHandWaving size={35} /> */}
                  </h3>
                  <div className=" d-flex justify-content-center gap-5 fs-5 text-capitalize">
                    {' '}
                      <p>min score:{decodedData?.examDetails.minimum_marks} marks </p>
                    <p>max score:{decodedData?.examDetails.totalMarks} </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-8  offset-lg-2 p-lg-4  overflow-auto  "
                style={{maxHeight: '60vh'}}
            >
              {decodedData?.questions &&
                  decodedData?.questions.map((value,index) => {
                  return (
                    <div key={index} className="p-1 py-3 p-lg-4 my-3  shadow border rounded-3 bg-white">
                      <div className="question d-flex fs-6">
                        <span>{index + 1}.</span>
                        <p>{value.questions.replaceAll('+',' ')}?</p>
                      </div>
                      <ul className="options text-wrap  fs-6 list-unstyled">
                        {value.options &&
                          value?.options?.map((valueopt,indexopt) => {
                            return (
                              <li key={indexopt} className=" d-flex gap-2">
                                <input
                                  type="radio"
                                  name={`question${index}`}
                                  value={valueopt}
                                  onClick={(e) => {
                                    handleChecked(e,index);
                                  }}
                                  id={`ques${index}-opt${indexopt + 1}`}
                                />
                                <label htmlFor={`ques${index}-opt${indexopt + 1}`}>
                                  {valueopt.replaceAll('+',' ')}
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
                    className={'rounded-4 px-3 px-md-5 m-0 m-md-3 mb-0 w-auto '}
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
              Are You Sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Confirm you want Submit </p>
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
                onClick={() => submitPaperDetails()}
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
});

export default StudentPaper;