import React, { useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../../../styles/common.css';
import { useGetStudentAvidenceQuery } from '../../../apis/Service';
import doneImg from '../../../assets/done-icon.png';

export const ViewResult = ({ paperId }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const stdName = JSON.parse(localStorage.getItem('stdData'));
  const { data } = useGetStudentAvidenceQuery({
    paperId,
    stdId: stdName.userId,
  });

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        view result
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
        style={{ width: '100%' }}
      >
        <Modal.Header closeButton>
          <h2 className=" fw-bold">
            {data?.result.resultStatus
              ? 'Congratulations!! You Pass The Exam🎉'
              : 'Sorry!! You Failed In Exam'}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className="col-12 d-flex justify-content-center mb-4">
              <img src={doneImg} height="70rem" width="70rem" alt="done img" />
            </div>
            <div className="col-6">
              <h6 className="">
                <span className=" fw-bold">Total Marks:</span>
                {data?.result.marks ?? 0}
              </h6>
            </div>
            <div className="col-6">
              <h6 className="text-center bg-transparent fs-6 p-0">
                <span className=" fw-bold"> Percentage:</span>{' '}
                {data?.result.percentage ?? 0} %
              </h6>
            </div>
            <div className="col-6">
              <h6 className="">
                <span className=" fw-bold">Submit Date:</span>
                {data?.result.date ?? null}
              </h6>
            </div>
            <div className="col-6">
              <h6 className="text-center bg-transparent fs-6 p-0">
                <span className=" fw-bold">Result Status :</span>
                {data?.result.resultStatus ?? null}
              </h6>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
