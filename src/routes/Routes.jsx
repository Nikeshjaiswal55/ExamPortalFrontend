import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoute } from 'react-router-dom';
import Home from '../pages/home/Home';
import {
  AdminPrivate,
  CollegePrivate,
  Private,
  StudentPrivate,
} from '../auth/Private';
import { path } from './RoutesConstant';
import { OrgDashBoard } from '../pages/admin/OrgDashboard/OrgDashBoard';
import { AddAssignment } from '../pages/admin/AddAssignment/AddAssignment';
import { AddCourse } from '../pages/admin/AddCourse/AddCourse';
import { CreateCourse } from '../pages/admin/AddCourse/CreateCourse';
import { OrganisationPage } from '../pages/admin/OrganisationPage/OrganisationPage';
import { AssignmentStudentPage } from '../pages/admin/AssignmentStudentPage/AssignmentStudentPage';
import { Layout } from '../components/layout';
import { ShowCourse } from '../pages/admin/ShowCourse/ShowCourse';
import { Redirect, SaveUserOrg } from '../auth/redirection/Redirect';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { SidePooup } from '../pages/admin/showAssessment/AssessmentSidePooup/SidePooup';
import { ExamPortal } from '../pages/exam-portal/ExamPortal';
import { ExamVerification } from '../pages/exam-portal/components/ExamVerification';
import { ReportCard } from '../pages/exam-portal/components/ReportCard';
import { ExamStarted } from '../pages/exam-portal/components/ExamStarted';
import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';
import { StudentPaper } from '../pages/student/StudentPaper/StudentPaper';
import { AllAssissmentToStudent } from '../pages/student/ShowAllAssissmentTostudent/AllAssissmentToStudent';
import { CreateAssesment } from '../pages/admin/AddAssignment/CreateAssesment';
import { ShowAssessment } from '../pages/admin/showAssessment/Showassessment';


export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path={path.home.path} element={<LandingPage />} />
        <Route path={path.GetStarted.path} element={<SaveUserOrg />} />
        <Route path={path.Redirect.path} element={<Redirect />} />

        <Route path={path.Organisation.path} element={<OrganisationPage />} />
        <Route path="/" element={<Private />}>
          <Route path="/admin/" element={<CollegePrivate />}>
            <Route
              path={path.AddCourse.path}
              element={
                <Layout>
                  <AddCourse />
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
          </Route>
          <Route path="/admin/" element={<AdminPrivate />}>
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
              path={path.AddAssessment.path}
              element={
                <Layout>
                  <AddAssignment />
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
              path={path.ShowCourse.path}
              element={
                <Layout>
                  <ShowCourse />
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
          </Route>

          {/* --------------------------student-------------------------- */}
          <Route path="/student/" element={<StudentPrivate />}>
            <Route path={path.StudentPaper.path} element={<StudentPaper />} />
            <Route
              path="/student/dashboard"
              element={
                <Layout>
                  <h1>student sashboard</h1>
                </Layout>
              }
            />
            {/* <Route
              path={path.TermAndCondition.path}
              element={
                <Layout>
                  <TermandConditionPage />
                </Layout>
              }
            /> */}
            <Route
              path={path.ShowAllAssessmentToStudent.path}
              element={
                <Layout>
                  <AllAssissmentToStudent />
                </Layout>
              }
            />
          </Route>
          {/* seprate exam portal */}
          <Route path={path.exam.path} element={<ExamPortal />} />
          <Route
            path={`${path.StudentExamStarted.path}/:paperId`}
            element={<ExamStarted />}
          />
          <Route
            path={`${path.examVerify.path}/:paperId`}
            element={<ExamVerification />}
          />
          <Route
            path={path.examReport.path}
            element={
              <Layout>
                <ReportCard />
              </Layout>
            }
          />
          <Route
            path={path.StudentPaperSubmitted.path}
            element={<ExamSubmited />}
          />
        </Route>

        <Route path={path.error.path} element={<h1>page not found</h1>} />
      </ReactRoute>
    </BrowserRouter>
  );
};
