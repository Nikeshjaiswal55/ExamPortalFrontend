import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from '../../../../routes/RoutesConstant';
export function StudentCard({ paperId, divBoxStyle, studentdetails }) {
  const color = [
    'bg-danger',
    'bg-secondary',
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-dark',
  ];
  const randomColor = color[Math.floor(Math.random() * color.length)];
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`p-3 text-center ${divBoxStyle}`}
        style={{ width: '18rem' }}
      >
        <div
          className={`card text-center rounded-4 shadow`}
          style={{ height: '19rem', border: '0px' }}
        >
          <div className="card-body ">
            <div
              className={`${randomColor} img-thumbnail d-flex justify-content-center align-items-center rounded-circle  bg w-50 h-50 m-auto p-0  mt-4  border-dark border-4`}
            >
              <h1 className="fw-bold text-capitalize text-light">
                {' '}
                {studentdetails.email.charAt(0).toUpperCase()}
              </h1>
            </div>
            {/* <h6 className="Card title mt-4">Kapil Jaiswal</h6> */}
            <p className="card-text mt-3 ">{studentdetails.email}</p>
          </div>
          <div
            className={`card-footer rounded-bottom-3 fw-bold  text-light  p-3`}
            style={{ background: 'var(--grey)' }}
            onClick={() => {
              studentdetails._attempted
                ? navigate(
                    `${path.examReport.path}/${paperId}/${studentdetails.studentid}`
                  )
                : toast.info('student not attempted paper yet!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                  });
            }}
          >
            Evidence
          </div>
        </div>
      </div>
    </>
  );
}
