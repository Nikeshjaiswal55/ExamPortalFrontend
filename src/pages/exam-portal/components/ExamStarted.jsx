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
import { sendImage } from '../../../store/adminSlice';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';

export const ExamStarted = () => {
  const { paperId } = useParams();
  const [doneProcess, setProcess] = useState(true);
  const stream = useSelector((state) => state.admin.stream);
  const [capturedImage, setCapturedImage] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [videoStream, setVideoStream] = useState();
  const [screenStream, setScreenStream] = useState();
  const [facedetect, setfaceDetect] = useState(0);
  const [tabSitchSubmit, setTabSitchSubmit] = useState(false);

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

  console.log(attempted, 'attempted');

  const [imageUpload, { isError: uploadError }] =
    useUploadImageBase64Mutation();

  const webcamRef = useRef(null);

  const runFacemesh = async () => {
    console.log('runfacemesh');
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
      // if (face.length > 1) {
      //   const lengths = face.length;
      //   setfaceDetect(lengths);
      //   console.log(lengths, 'face', face);
      // }
      //  const ctx=canvasRef.current.getContext("2d");
      //  drawMesh(face,ctx)
    }
  };

  const captureImage = () => {
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
    if (document.hidden && stream) {
      setIsButtonVisible(false);
      TabSwitchScreenShot(stream);
      setTabSwitchCount((prev) => prev + 1);
      console.log('Value Changed of setTabSwitch');
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
    console.log('blur event added -===================');
    window.addEventListener('blur', () => {
      handleBlurChange(stream);
    });
  }
  useEffect(() => {
    if (tabBlurCount > 2 && tabBlurCount < 5) {
      setContent(
        "please don't Open tab other on  a tab, your exam will automatically submitted."
      );
      handleShow();
    }
    console.log('blur count := ', tabBlurCount);
  }, [tabBlurCount]);

  useEffect(() => {
    if (tabSwitchCount > 0 && tabSwitchCount < 2) {
      setContent(
        "please don't switch your tab other, your exam will automatically submitted."
      );
      handleShow();
    }
    console.log('tab switch  count := ', tabSwitchCount);
  }, [tabSwitchCount]);

  useEffect(() => {
    TabSwitch(stream);

    // return () => {
    // document.addEventListener('visibilitychange',handleVisibilityChange);
    // window.addEventListener("blur",handleBlurChange);
    // };
  }, []);

  async function cameraStop() {
    console.log('inside camera stop function');
    await screenStream.getTracks().forEach((track) => track.stop()); // Stop the screen stream
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
  }

  async function handleSubmit() {
    console.log('inside handle submit stop function');
    await screenStream.getTracks().forEach((track) => track.stop()); // Stop the screen stream
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    navigate(`${path.StudentPaperSubmitted.path}/${paperId}`);
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
    // return () => {
    //   document.removeEventListener('visibilitychange',handleVisibilityChange);
    // };
  }, [attemptedSucess]);

  useEffect(() => {
    if (progress == 100) {
      // navigate(`${path.StudentExamStarted.path}/${paperId}`);
      captureImage();
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
  if (attempted?.data == 'true') {
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
          <div className="h-100" style={{ backgroundColor: 'var(--main-div)' }}>
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
            <StudentPaper
              paperId={paperId}
              isLoading={isLoading}
              decodedData={decodedData}
              handleSubmit={handleSubmit}
              cameraStop={cameraStop}
              tabSitchSubmit={tabSwitchCount}
              tabBlurCount={tabBlurCount}
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
