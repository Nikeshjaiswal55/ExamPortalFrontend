import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import { path } from '../../../routes/RoutesConstant';
import Ima from '../../../assets/rules_prev_ui.png';
import { CustomButton } from '../../../theme/Button/Buttons';
import {
  useGetAssignmentQuery,
  useGetInstructionQuery,
} from '../../../apis/Service';
import { Loader } from '../../../components/Loader/Loader';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';

export default function TermandConditionPage() {
  const navigate = useNavigate();
  const { paperId } = useParams();
  const [checked, setChecked] = React.useState(false);
  const {
    data: getInstruction,
    isLoading,
    isError,
  } = useGetInstructionQuery(paperId);
  console.log(getInstruction, 'getInstruction');

  if (isLoading) {
    return (
      <div className=" position-absolute top-50 start-50  translate-middle ">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="row w-100 h-100">
        {isError ? (
          <SomethingWentWrong />
        ) : (
          <>
            <div className="col-lg-6 d-flex align-items-center col-md-12 mb-4 mb-lg-0">
              <img src={Ima} className="img-fluid" alt="Rules" />
            </div>
            <div className="col-lg-6    col-md-12 " id="innerHtml">
              {/* <div className="text-center">
                <h3>Online Exam Rules</h3>
              </div>
              <section className="instructions">
                <h3>General Instructions:</h3>
                <ul>
                  <li>
                    Students must log in using their provided credentials before
                    accessing the exam.
                  </li>
                  <li>
                    Ensure a stable internet connection to avoid disruptions
                    during the exam.
                  </li>
                  <li>
                    Do not refresh the exam page during the test to prevent data
                    loss.
                  </li>
                  <li>Follow the instructions for each question carefully.</li>
                </ul>
              </section>
              <section className="conduct">
                <h3>Exam Conduct:</h3>
                <ul>
                  <li>
                    Once the exam begins, focus on answering the questions
                    independently.
                  </li>
                  <li>
                    Avoid using any external resources or communication tools
                    during the exam.
                  </li>
                  <li>Submit your answers before the allotted time expires.</li>
                  <li>Refrain from any form of plagiarism or cheating.</li>
                </ul>
              </section>
              <section className="penalties">
                <h3>Penalties for Violation:</h3>
                <p>
                  Any violation of the exam rules may result in disqualification
                  and further actions as per institution policy.
                </p>
                <p>
                  By proceeding to the exam, you agree to abide by these rules
                  and regulations.
                </p>
                <p>
                  <em>
                    Note: Rules and regulations are subject to change as per
                    exam authority's discretion.
                  </em>
                </p>
              </section> */}
              <div dangerouslySetInnerHTML={{ __html: getInstruction?.data }} />

              <div className="form-check">
                <input
                  className={`form-check-input border-2 border-black`}
                  type="checkbox"
                  id="flexCheckDefault"
                  value={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label className="form-check-label fw-bold">
                  Accept All Terms and Conditions
                </label>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <CustomButton
                  className={'rounded-4 w-25'}
                  buttonText={'Let Started'}
                  onButtonClick={() => {
                    if (checked)
                      navigate(`${path.StudentExamStarted.path}/${paperId}`);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
