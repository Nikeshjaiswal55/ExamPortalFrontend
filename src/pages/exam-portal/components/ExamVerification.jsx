import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { MediaPermission } from '../utils/MediaPermission';
import { GetEntireScreen } from '../utils/GetEntireScreen';
import { ExamModal } from './ExamModal';
import GiphyEmbed from './GiphyEmbed';
import { handleVisibilityChange } from '../utils/TabSwitch';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckForExtension } from '../utils/CheckForExtension';
import { path } from '../../../routes/RoutesConstant';
import { useDispatch } from 'react-redux';

export const ExamVerification = () => {
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { paperId } = useParams();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  const callback = () => {
    MediaPermission(setProgress, callback2, handleShow, setContent);
  };

  const callback2 = () => {
    GetEntireScreen(setProgress, handleShow, setContent, dispatch);
  };

  useEffect(() => {
    CheckForExtension(handleShow, setContent, setProgress, callback);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (progress == 100) {
      navigate(`${path.StudentExamStarted.path}/${paperId}`);
    }
  }, [progress]);

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
          {/* <div>
            {capturedImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Captured ${index}`}
              />
            ))}
          </div> */}
        </div>
      </div>
      <ExamModal show={show} content={content} handleClose={handleClose} />
    </>
  );
};
