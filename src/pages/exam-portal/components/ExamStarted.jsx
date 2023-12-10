import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { TabSwitchScreenShot } from '../utils/TabSwitchScreenShot';
import StudentPaper from '../../student/StudentPaper/StudentPaper';
import { path } from '../../../routes/RoutesConstant';
import { useSelector } from 'react-redux';

import { ProgressBar } from 'react-bootstrap';
import { MediaPermission } from '../utils/MediaPermission';
import { GetEntireScreen } from '../utils/GetEntireScreen';
import { ExamModal } from './ExamModal';
import GiphyEmbed from './GiphyEmbed';
import { CheckForExtension } from '../utils/CheckForExtension';
import {
  useGetAllAssissmentOnstudentPageQuery,
  useGetAllQuestionsFromPaperIdQuery,
} from '../../../apis/Service';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';

export const ExamStarted = () => {
  const { paperId } = useParams();
  const [doneProcess, setProcess] = useState(true);
  const stream = useSelector((state) => state.admin.stream);
  const [capturedImage, setCapturedImage] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [videoStream, setVideoStream] = useState();

  const [show, setShow] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const constraints = {
      video: true,
    };

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
                reader.readAsDataURL(blob);
              });
            })
            .then((base64Image) => {
              console.log(base64Image);
              const currentDateTime = new Date();
              setCapturedImage((prevImages) => [...prevImages, base64Image]);
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
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    // Save the captured images to local storage whenever the state changes
    localStorage.setItem('capturedImage', JSON.stringify(capturedImage));
  }, [capturedImage]);

  const handleVisibilityChange = (stream) => {
    if (document.hidden && stream) {
      setIsButtonVisible(false);
      TabSwitchScreenShot(stream);
      setTabSwitchCount((prev) => prev + 1);
      setContent(
        'please dont switch your tab other, your exam will automatically submited.'
      );
      handleShow();
    }
  };

  function TabSwitch(stream) {
    document.addEventListener('visibilitychange', () =>
      handleVisibilityChange(stream)
    );
  }

  useEffect(() => {
    if (tabSwitchCount > 1) {
      handleSubmit();
    }
  }, [tabSwitchCount]);

  useEffect(() => {
    TabSwitch(stream);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  async function cameraStop() {
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
  }

  async function handleSubmit() {
    // await screenStream.getTracks().forEach((track) => track.stop()); // Stop the screen stream
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    navigate(`${path.StudentPaperSubmitted.path}/${paperId}`);
  }

  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState();

  const callback = () => {
    MediaPermission(setProgress, callback2, handleShow, setContent);
  };

  const callback2 = () => {
    GetEntireScreen(setProgress, handleShow, setContent, TabSwitch);
  };

  const [decodedData, setDecodedData] = useState(null);

  useEffect(() => {
    CheckForExtension(handleShow, setContent, setProgress, callback);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (progress == 100) {
      // navigate(`${path.StudentExamStarted.path}/${paperId}`);
      setProcess(false);
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

  if (isError) {
    return (
      <div className="h-100">
        <SomethingWentWrong />
      </div>
    );
  } else {
    if (doneProcess) {
      return (
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
      );
    } else {
      return (
        <div className="h-100">
          <StudentPaper
            paperId={paperId}
            isLoading={isLoading}
            decodedData={decodedData}
            handleSubmit={handleSubmit}
            cameraStop={cameraStop}
          />
          <ExamModal
            show={show}
            content={content}
            isButtonVisible={isButtonVisible}
            handleClose={handleClose}
          />
        </div>
      );
    }
  }
};
