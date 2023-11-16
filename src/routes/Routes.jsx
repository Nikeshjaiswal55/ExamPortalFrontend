import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoute } from 'react-router-dom';
import Home from '../pages/home/Home';
import { Private } from '../auth/Private';
import { path } from './RoutesConstant';
import OrgDashBoard from '../pages/admin/OrgDashboard/OrgDashBoard';

import AddCourse from '../pages/admin/AddCourse/AddCourse';
import AddAssignment from '../pages/admin/AddCourse/AddAssignment';
import CreateAssesment from '../pages/admin/AddCourse/CreateAssesment';
import { CreateCourse } from '../pages/admin/AddCourse/CreateCourse';
import OrganisationPage from '../pages/admin/OrganisationPage/OrganisationPage';
import { ExamPortal } from '../pages/exam-portal/ExamPortal';
import { ExamVerification } from '../pages/exam-portal/components/ExamVerification';
// import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';
import { ReportCard } from '../pages/exam-portal/components/ReportCard';
import { ExamStarted } from '../pages/exam-portal/components/ExamStarted';
import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path="/demo" element={<ExamSubmited />} />
        <Route path={path.home.path} element={<Home />} />
        <Route path={path.Organisation.path} element={<OrganisationPage />} />

        <Route path="/" element={<Private />}>
          <Route
            path={path.private.path}
            element={<h1>this private route</h1>}
          />
          <Route path={path.AdminDasboard.path} element={<OrgDashBoard />} />
          <Route path={path.AddCourse.path} element={<AddCourse />} />
          <Route path={path.AddAssessment.path} element={<AddAssignment />} />
          <Route
            path={path.CreateAssessment.path}
            element={<CreateAssesment />}
          />
          <Route path={path.CreateCourse.path} element={<CreateCourse />} />
        </Route>
        {/* seprate exam portal */}
        <Route path={path.exam.path} element={<ExamPortal />} />
        <Route path="/exam-started" element={<ExamStarted />} />
        <Route path={path.examStart.path} element={<ExamVerification />} />
        <Route path={path.examReport.path} element={<ReportCard />} />
        <Route path={path.error.path} element={<h1>page not found</h1>} />
      </ReactRoute>
    </BrowserRouter>
  );
};
