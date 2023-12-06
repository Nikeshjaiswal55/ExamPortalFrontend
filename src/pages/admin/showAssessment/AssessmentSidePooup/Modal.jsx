import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SidePooup from './SidePooup';

function Example({ show, setShowCard,paperId,  ...props }) {
  const handleClose = () => setShowCard(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton />
        <SidePooup {...props} paperId={paperId} />
      </Modal>
    </>
  );
}

export default Example;
