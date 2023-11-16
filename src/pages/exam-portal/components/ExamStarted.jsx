import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ExamModal } from './ExamModal';
import { TabSwitchScreenShot } from '../utils/TabSwitchScreenShot';

export const ExamStarted = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const [capturedImage, setCapturedImage] = useState([]);
  const [content, setContent] = useState();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [videoStream, setVideoStream] = useState();
  const [screenStream, setScreenStream] = useState();

  const [show, setShow] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const screenSharingStreaam = (stream) => {
    setScreenStream(stream);
  };

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
              setCapturedImage((prevImages) => [
                ...prevImages,
                { base64Image, timestamp: currentDateTime },
              ]);
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const tick = () => {
    setTimeLeft((prevTime) => prevTime - 1);
  };

  // Start the timer when the component mounts
  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, []);

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
    const stream = JSON.stringify(localStorage.getItem('stream'));
    console.log('stream', stream);
    TabSwitch(stream);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  async function handleSubmit() {
    await screenStream.getTracks().forEach((track) => track.stop()); // Stop the screen stream
    await videoStream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
    navigate('/demo');
  }

  return (
    <div>
      <h1>Exam Started</h1>
      <p>Time Left: {formatTime(timeLeft)}</p>
      <Button variant="success" onClick={handleSubmit}>
        submit
      </Button>
      <ExamModal
        show={show}
        content={content}
        isButtonVisible={isButtonVisible}
        handleClose={handleClose}
      />
    </div>
  );
};
