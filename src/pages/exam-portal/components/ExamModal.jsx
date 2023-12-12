import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ExamModal({ show, content, isButtonVisible, handleClose }) {
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
          {isButtonVisible ? (
            <Button variant="success" onClick={() => location.reload()}>
              Reload
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => {
                handleClose();
              }}
            >
              Ok
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
