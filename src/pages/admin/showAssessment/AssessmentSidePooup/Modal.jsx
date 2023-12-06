import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SidePooup from './SidePooup';

function Example({ show, setShowCard, ...props }) {
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
        style={{ width: '100vw' }}
      >
        <Modal.Header closeButton />
        <SidePooup {...props}/>
      </Modal>
    </>
  );
}

export default Example;
