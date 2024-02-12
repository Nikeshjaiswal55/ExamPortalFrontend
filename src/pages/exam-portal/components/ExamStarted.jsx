import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TabSwitchScreenShot } from '../utils/TabSwitchScreenShot';
import StudentPaper from '../../student/StudentPaper/StudentPaper';
import { path } from '../../../routes/RoutesConstant';
import { useDispatch, useSelector } from 'react-redux';

import { ProgressBar } from 'react-bootstrap';
import { MediaPermission } from '../utils/MediaPermission';
import { GetEntireScreen } from '../utils/GetEntireScreen';
import { ExamModal } from './ExamModal';
import GiphyEmbed from './GiphyEmbed';
import { CheckForExtension } from '../utils/CheckForExtension';
import {
  useGetAllAssissmentOnstudentPageQuery,
  useGetAllQuestionsFromPaperIdQuery,
  useGetCheckAttemptedStudentQuery,
  useGetStudentAvidenceQuery,
  useUploadImageBase64Mutation,
} from '../../../apis/Service';
import imageCompression from 'browser-image-compression';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { Loader } from '../../../components/Loader/Loader';
import { sendAudio, sendImage } from '../../../store/adminSlice';
// import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
// import * as speechCommands from '@tensorflow-models/speech-commands';
import { ReactMic } from 'react-mic';

export const ExamStarted = () => {
  const { paperId } = useParams();
  const [doneProcess, setProcess] = useState(true);
  const stream = useSelector((state) => state.admin.stream);
  const [capturedImage, setCapturedImage] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [videoStream, setVideoStream] = useState();
  const [screenStream, setScreenStream] = useState();
  const [submitVoiceRec, setSubmitVoiceRec] = useState(true);
  const [tabSitchSubmit, setTabSitchSubmit] = useState(false);
  const [recordedData, setRecordedData] = useState([]);

  const [show, setShow] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  let stdId = JSON.parse(localStorage.getItem('stdData'));
  const [tabBlurCount, setTabBlurCount] = useState(0);
  const dispatch = useDispatch();
  const {
    data: attempted,
    isLoading: ateemptedIsLoading,
    isError: ateemptedIsError,
    attemptedSucess,
  } = useGetCheckAttemptedStudentQuery({
    paperId,
    stdId: stdId.userId,
  });

  const [imageUpload, { isError: uploadError }] =
    useUploadImageBase64Mutation();

  const [isRecording, setIsRecording] = useState(false);
  const webcamRef = useRef(null);

  //voice rec
  const voiceDetect = () => {
    const initVoiceModel = async () => {
      // Load the speech commands model
      const speechCommands = await import('@tensorflow-models/speech-commands')
      const recognizer = speechCommands.create('BROWSER_FFT');
      await recognizer.ensureModelLoaded();
      console.log('model loaded', recognizer);

      // Define a callback function for predictions
      recognizer.listen(
        (result) => {
          console.log('result', result.scores);
          const maxIndex = result.scores.indexOf(Math.max(...result.scores));

          // Check if the predicted class is a voice command (adjust this based on your use case)
          if (result.scores[maxIndex] > 0.8) {
            console.log('voice command detected!');
            setIsRecording(true);
            // Start recording using webcam or other recording logic
            // startRecording();
          } else {
            setIsRecording(false);
            onStop();
          }
        },
        { probabilityThreshold: 0.7 }
      );
    };

    if (submitVoiceRec) {
      initVoiceModel();
    }
  };

  //for the stop recording

  const onStop = (recordedData) => {
    console.log('Recording Stopped:', recordedData);
    // const data = [recordedData];
    // data.push(recordedData?.blob);
    if (recordedData?.blob) {
      // setRecordedData(recordedData?.blob);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          // setBase64Audio(base64String);
          resolve(base64String);
        };
        reader.readAsDataURL(recordedData.blob);
      }).then((base64String) => {
        dispatch(sendAudio(base64String));
      });
    }
  };

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net, track) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      const face = await net.estimateFaces(video);
      if (face.length <= 0) {
        setContent(`Don't cover your face with anything.!`);
        handleShow();
        setIsButtonVisible(false);
      } else if (face.length > 1) {
        setContent('Multiple face detected.!');
        handleShow();
        setIsButtonVisible(false);
      }
    }
  };

  const captureImages = () => {
    const constraints = {
      video: true,
    };

    // if (facedetect > 1) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setVideoStream(stream);
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);

        const captureImage = () => {
          imageCapture
            .takePhoto()
            .then((blob) => {
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                const options = {
                  maxSizeMB: 0.3,
                  maxWidthOrHeight: 1920,
                  useWebWorker: true,
                };
                imageCompression(blob, options).then((compressedimg) => {
                  reader.readAsDataURL(compressedimg);
                });
              });
            })
            .then((base64Image) => {
              const currentDateTime = new Date();
              // setCapturedImage((prevImages) => [...prevImages, base64Image]);
              imageUpload(base64Image)
                .then((res) => {
                  console.log('res', res?.data?.data);
                  dispatch(sendImage(res?.data?.data));
                })
                .catch((err) => {});
              // dispatch(sendImage(base64Image));
            })
            .catch((error) => {
              console.error('Error capturing photo:', error);
            });
        };

        const captureInterval = setInterval(() => {
          captureImage();
        }, 10000); // Capture every 10 seconds

        return () => {
          clearInterval(captureInterval);
        };
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      });
    // }
  };

  const navigate = useNavigate();

  const handleVisibilityChange = (stream) => {
    console.log('handle visibility changed call ');
    if (document.hidden) {
      console.log('handle visibility changed call if condition');
      setIsButtonVisible(false);
      TabSwitchScreenShot(stream);
      setTabSwitchCount((prev) => prev + 1);
    }
  };

  const handleBlurChange = (stream) => {
    console.log('handle blur call =============');
    setIsButtonVisible(false);
    TabSwitchScreenShot(stream);
    setTabBlurCount((prev) => prev + 1);
  };

  function TabSwitch(stream) {
    document.addEventListener('visibilitychange', () =>
      handleVisibilityChange(stream)
    );
    document.addEventListener('blur', () => {
      handleBlurChange(stream);
    });
  }

  useEffect(() => {
    if (tabBlurCount > 2) {
      setContent(
        "please don't Open tab other on  a tab, your exam will automatically submitted."
      );
      handleShow();
    }
    console.log('blur count := ', tabBlurCount);
  }, [tabBlurCount]);

  useEffect(() => {
    if (tabSwitchCount > 0) {
      setContent(
        "please don't switch your tab other, your exam will automatically submitted."
      );
      handleShow();
    }
    console.log('tab switch  count := ', tabSwitchCount);
  }, [tabSwitchCount]);

  useEffect(() => {
    if(doneProcess>75){
      TabSwitch(stream);
    }

    return () => {
    document.addEventListener('visibilitychange',handleVisibilityChange);
    window.addEventListener("blur",handleBlurChange);
    }
  }, [doneProcess]);

  async function cameraStop() {
    console.log('inside camera stop function');
    const tf = await import('@tensorflow/tfjs');
    setSubmitVoiceRec(false);
    await screenStream.getTracks().forEach((track) => track.stop()); // Stop the screen stream
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    tf.disposeVariables();
  }

  async function handleSubmit() {
    console.log('inside handle submit stop function');
    // await screenStream.getTracks().forEach((track) => track.stop()); // Stop the screen stream
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    navigate(`${path.StudentPaperSubmitted.path}/${paperId}`);
    document.location.reload();
  }

  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState();

  const callback = () => {
    MediaPermission(setProgress, callback2, handleShow, setContent);
  };

  const callback2 = () => {
    GetEntireScreen(
      setProgress,
      handleShow,
      setContent,
      TabSwitch,
      setScreenStream
    );
  };

  const [decodedData, setDecodedData] = useState(null);

  useEffect(() => {
    if (attemptedSucess && attempted?.data == 'true') {
      cameraStop();
      navigate(`${path.StudentPaperSubmitted.path}/${paperId}`);
    } else {
      CheckForExtension(handleShow, setContent, setProgress, callback);
    }
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('blur', handleBlurChange);
    };
  }, [attemptedSucess]);

  useEffect(() => {
    if (progress == 100) {
      // navigate(`${path.StudentExamStarted.path}/${paperId}`);
      captureImages();
      voiceDetect();
      setProcess(false);
      runFacemesh();
    }
  }, [progress]);

  const { data, isSuccess, isError, isLoading } =
    useGetAllQuestionsFromPaperIdQuery(paperId);

  useEffect(() => {
    if (isSuccess) {
      const decodedString = decodeURIComponent(data.data);
      const jsonData = JSON.parse(decodedString);
      console.log('asasssasss', jsonData);
      setDecodedData(jsonData);
    }
  }, [isSuccess]);

  // if (ateemptedIsLoading) {
  //   return (
  //     <div className="h-100 d-flex align-items-center justify-content-center">
  //       <Loader />
  //     </div>
  //   );
  // } else {
  if (attempted?.data === 'true') {
    cameraStop();
    return (
      <>
        <Navigate to={`${path.StudentPaperSubmitted.path}/${paperId}`} />
      </>
    );
  } else {
    return (
      <>
        {isError ? (
          <SomethingWentWrong />
        ) : doneProcess ? (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100  ">
              <div className="w-50 d-flex flex-column justify-content-center align-items-center gap-3">
                <GiphyEmbed />
                <div className="w-100">
                  <ProgressBar
                    variant="success"
                    now={progress}
                    label={`${progress}%`}
                  />
                </div>
                <div>
                  <h6 className="text-center p-0 m-0">
                    Please wait for upto a minute for the system to be set up.
                  </h6>
                  <h6 className="text-center">if it still does not load</h6>
                </div>
              </div>
            </div>
            <ExamModal
              show={show}
              content={content}
              isButtonVisible={true}
              handleClose={handleClose}
            />
          </>
        ) : (
              <div className="h-100 overflow-y-auto" style={{backgroundColor: 'var(--main-div)'}}>
            <Webcam
              ref={webcamRef}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 9,
                width: 100,
                heght: 100,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 9,
                width: 0,
                heght: 0,
                display: 'none',
              }}
            >
              <ReactMic
                record={isRecording}
                className="sound-wave"
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="#FF4081"
              />
            </div>

            <StudentPaper
              paperId={paperId}
              isLoading={isLoading}
              decodedData={decodedData}
              handleSubmit={handleSubmit}
              cameraStop={cameraStop}
              tabSitchSubmit={tabSwitchCount}
              tabBlurCount={tabBlurCount}
              recordedData={recordedData}
            />
            <ExamModal
              show={show}
              content={content}
              isButtonVisible={isButtonVisible}
              handleClose={handleClose}
            />
          </div>
        )}
      </>
    );
  }
  // }
};
