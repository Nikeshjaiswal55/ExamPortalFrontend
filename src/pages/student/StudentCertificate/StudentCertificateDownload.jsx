import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

export const StudentCertificate = ({ nameprops }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const stdData=JSON.parse(localStorage.getItem('stdData'))

  const downloadCertificate = () => {
    const pdfUrl = '/Sample.pdf';

    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error('Error fetching the PDF file:', error);
      });
  };

  const divRef = useRef(null);

  const downloadAsPdf = () => {
    if (!divRef.current) return;

    html2canvas(divRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // Width of A4 paper
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('downloaded_pdf.pdf');
    });
  };
  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        Show Certificate
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton />
        <Modal.Body style={{ width: '100%' }}>
          <div
            ref={divRef}
            className="certificate-img  w-100 position-relative"
            style={{ height: '34rem' }}
          >
            <div className="row justify-content-center">
              <div
                className="card position-absolute text-center border-0 "
                style={{ bottom: '270px', width: '400px', height: '80px' }}
              >
                <h2 className="text-center bg-transparent fs-4 p-5">
                  {stdData.email.split('@')[0].toUpperCase()}
                </h2>
              </div>
              <div
                className="card position-absolute    border-0  p-4"
                style={{ bottom: '70px', width: '400px', height: '150px' }}
              >
                <h2 className=" Signature-img w-100 h-100 bg-transparent   p-5"></h2>
              </div>
              <div
                className="card position-absolute text-center border-0 p-0"
                style={{ bottom: '45px', width: '300px', height: '100px' }}
              >
                <h2 className="text-center bg-transparent fs-6 p-0">
                  Team Exam Easy
                </h2>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={downloadAsPdf}>
            Download PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
