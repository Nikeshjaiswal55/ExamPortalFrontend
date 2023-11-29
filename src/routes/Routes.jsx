import React from 'react';
import {BrowserRouter,Route,Routes as ReactRoute} from 'react-router-dom';
import Home from '../pages/home/Home';
import {Private} from '../auth/Private';
import {path} from './RoutesConstant';
import OrgDashBoard from '../pages/admin/OrgDashboard/OrgDashBoard';

import AddCourse from '../pages/admin/AddCourse/AddCourse';
import {CreateCourse} from '../pages/admin/AddCourse/CreateCourse';
import OrganisationPage from '../pages/admin/OrganisationPage/OrganisationPage';
import Layout from '../components/layout';
import ShowCourse from '../pages/admin/ShowCourse/ShowCourse';
import AssignmentStudentPage from '../pages/admin/AssignmentStudentPage/AssignmentStudentPage';
import ShowAssessment from '../pages/admin/showAssessment/Showassessment';
import TermandConditionPage from '../pages/student/TermsConditionPage/TermandConditionPage';
import CreateAssesment from '../pages/admin/AddAssignment/CreateAssesment';
import AddAssignment from '../pages/admin/AddAssignment/AddAssignment';
import {Redirect,SaveUserOrg} from '../auth/redirection/Redirect';
import LandingPage from '../pages/LandingPage/LandingPage';
import Example from '../pages/admin/showAssessment/AssessmentSidePooup/SidePooup';
import SidePooup from '../pages/admin/showAssessment/AssessmentSidePooup/SidePooup';
import { ExamPortal } from '../pages/exam-portal/ExamPortal';
import { ExamVerification } from '../pages/exam-portal/components/ExamVerification';
// import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';
import { ReportCard } from '../pages/exam-portal/components/ReportCard';
import { ExamStarted } from '../pages/exam-portal/components/ExamStarted';
import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';
import StudentPaper from '../pages/student/StudentPaper/StudentPaper';

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path={path.home.path} element={<LandingPage />} />
        <Route path="/student" element={<h1>student sashboard</h1>} />

        <Route path={path.GetStarted.path} element={<SaveUserOrg />} />
        <Route path={path.Redirect.path} element={<Redirect />} />
        <Route path="/demo" element={<ExamSubmited />} />
        <Route path={path.home.path} element={<Home />} />
        <Route path={path.Organisation.path} element={<OrganisationPage />} />

        <Route path="/" element={<Private />}>
          <Route path={path.Organisation.path} element={<OrganisationPage />} />
          <Route
            path={path.private.path}
            element={<h1>this private route</h1>}
          />
          <Route
            path={path.AdminDasboard.path}
            element={
              <Layout>
                <OrgDashBoard />
              </Layout>
            }
          />
          <Route
            path={path.AddCourse.path}
            element={
              <Layout>
                <AddCourse />
              </Layout>
            }
          />
          <Route
            path={path.AddAssessment.path}
            element={
              <Layout>
                <AddAssignment />
              </Layout>
            }
          />
          <Route
            path={path.CreateCourse.path}
            element={
              <Layout>
                <CreateCourse />
              </Layout>
            }
          />
          <Route
            path={path.showStudent.path}
            element={
              <Layout>
                <AssignmentStudentPage />
              </Layout>
            }
          />
          <Route
            path={path.CreateAssessment.path}
            element={
              <Layout>
                <CreateAssesment />
              </Layout>
            }
          />

          <Route
            path={path.SidePooup.path}
            element={
              <Layout>
                <SidePooup examName={"Java Mastery Challenge"} />
              </Layout>
            }
          />

          <Route
            path={path.ShowCourse.path}
            element={
              <Layout>
                <ShowCourse />
              </Layout>
            }
          />
          <Route
            path={path.TermAndCondition.path}
            element={
              <Layout>
                <TermandConditionPage />
              </Layout>
            }
          />
          <Route
            path={path.ShowAssessment.path}
            element={
              <Layout>
                <ShowAssessment />
              </Layout>
            }
          />
          <Route
            path={path.StudentPaper.path}
            element={
              <Layout>
                <StudentPaper />
              </Layout>
            }
          />
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
