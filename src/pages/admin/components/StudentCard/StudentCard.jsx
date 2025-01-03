import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {GrFormView} from "react-icons/gr";
import { path } from '../../../../routes/RoutesConstant';
import logo1 from '../../../../assets/logos/Rectangle-1.png';
import logo2 from '../../../../assets/logos/Rectangle-2.png';
import logo3 from '../../../../assets/logos/Rectangle-3.png';
import logo5 from '../../../../assets/logos/Rectangle-5.png';
import logo4 from '../../../../assets/logos/Rectangle-4.png';
import logo6 from '../../../../assets/logos/Rectangle-6.png';
import logo7 from '../../../../assets/logos/Rectangle-7.png';
import logo8 from '../../../../assets/logos/Rectangle-8.png';
import logo9 from '../../../../assets/logos/Rectangle-9.png';
import logo10 from '../../../../assets/logos/Rectangle-10.png';
import logo11 from '../../../../assets/logos/Rectangle-11.png';
import logo12 from '../../../../assets/logos/Rectangle-12.png';

export function StudentCard({ paperId, divBoxStyle, studentdetails, index }) {
  const color = ['#966CFF', '#FF8533', '#E6CB0E', '#0ea4e6', '#0ee670'];
  const logo = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
  ];

  const navigate = useNavigate();
  return (
    <>
      <div
        className={`mx-1 my-2 text-center ${divBoxStyle}`}
        style={{ width: '18rem' }}
      >
        <div
          className={`card text-center rounded-4 shadow`}
          style={{ height: '19rem', border: '0px' }}
        >
          <div className="card-body ">
            <div
              className={` img-thumbnail d-flex justify-content-center align-items-center rounded-circle  bg w-50 h-50 m-auto p-0  mt-4  border-dark border-4`}
              // style={{
              //   backgroundColor:
              //     color[Math.floor(Math.random() * color.length)],
              // }}
            >
              <img
                src={logo[Math.floor(Math.random() * color.length)]}
                width="100%"
                className="rounded-circle"
                height="100%"
                alt=""
              />
              {/* <h1 className="fw-bold text-capitalize text-light">
                {studentdetails.email.charAt(0).toUpperCase()}
              </h1> */}
            </div>
            <p className="card-text mt-3 text-truncate ">
              {studentdetails?.name??studentdetails.email}
            </p>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <span
                className={` ${
                  studentdetails._attempted ? 'bg-success' : 'bg-danger'
                } rounded-circle my-0 p-0 mx-2`}
                style={{ height: '12px', width: '12px' }}
              />
              <h6 className="m-0 p-0">
                {studentdetails._attempted ? <>{'Attempted'} <span onClick={() => {navigate(path.AdminViewResult.path + "/" + paperId + "/" + studentdetails?.studentid)}}><GrFormView size={25} style={{color: "blue"}} className=' text-primary cursor-pointer' title='view result' /></span></> : 'Not Attempted'}
              </h6>  
            </div>
          </div>
          <div
            className={`card-footer rounded-5 bg-light mb-2 fw-bold border cursor-pointer  px-3 mx-3`}
            onClick={() => {
              studentdetails._attempted
                ? navigate(
                    `${path.examReportOnAdmin.path}/${paperId}/${studentdetails.studentid}`
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
