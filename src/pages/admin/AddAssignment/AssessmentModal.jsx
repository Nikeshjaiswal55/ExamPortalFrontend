import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from '../../../assets/assessmenterror.png';

export const AssessmentModal = ({ show, setModalShow, errorContent }) => {
  const handleClose = () => {
    setModalShow(false);
  };
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center">
        <div className="d-flex justify-content-center">
          <img src={Image} height="100px" width="100px" />
        </div>
        <p>
          You may have miss some required field from :
          <span className="text-danger">{errorContent}</span>
        </p>
        <p>without them you will not able to create assissment</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
