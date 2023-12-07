import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';
import {TermandConditionPage} from '../../student/TermsConditionPage/TermandConditionPage';

export const ExamPortalLandingPage = () => {
  const navigate = useNavigate();
  return (
    // <div className="d-flex flex-column gap-5">
    //   <div>
    //     <h1 className="text-center">WelCome to ProExaminator</h1>
    //     <h3 className="text-center">
    //       secure examination platform 'No More Cheating'
    //     </h3>
    //   </div>
    //   <div className="border border-danger">
    //     <h3 className="text-center py-2">⚡ READ INSTRUCTION CAREFULLY ⚡</h3>
    //     <ListGroup as="ol" numbered>
    //       <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
    //       <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
    //       <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
    //     </ListGroup>
    //   </div>
    //   <div className="text-center">
    //     <button
    //       type="button"
    //       class="btn btn-primary"
    //       onClick={() => navigate(path.examStart.path)}
    //     >
    //       lets Go
    //     </button>
    //   </div>
    // </div>
    <TermandConditionPage />
  );
};
