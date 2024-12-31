import {memo} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ExamModal2 = memo(function ExamModal2({show,content,handleClose}) {
  return (
    <>
      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4>⚡Alert⚡</h4>
          {content}
        </Modal.Body>
        <Modal.Footer className="text-center d-flex justify-content-center">
            <Button
              variant="success"
              onClick={() => {
                handleClose();
              }}
            >
              Ok
            </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
})
