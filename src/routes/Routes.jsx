import React from 'react';
import { BrowserRouter, Routes as ReactRoute, Route } from 'react-router-dom';
import {
  AdminPrivate,
  CollegePrivate,
  Private,
  StudentPrivate,
} from '../auth/Private';
import { path } from './RoutesConstant';

import { Redirect, SaveUserOrg } from '../auth/redirection/Redirect';
import Layout from '../components/layout';
import LandingPage from '../pages/LandingPage/LandingPage';
import CreateAssesment from '../pages/admin/AddAssignment/CreateAssesment';
import AddCourse from '../pages/admin/AddCourse/AddCourse';
import { CreateCourse } from '../pages/admin/AddCourse/CreateCourse';
import AssignmentStudentPage from '../pages/admin/AssignmentStudentPage/AssignmentStudentPage';
import OrganisationPage from '../pages/admin/OrganisationPage/OrganisationPage';
import ShowCourse from '../pages/admin/ShowCourse/ShowCourse';
import SidePooup from '../pages/admin/showAssessment/AssessmentSidePooup/SidePooup';
import ShowAssessment from '../pages/admin/showAssessment/Showassessment';
import { ExamPortal } from '../pages/exam-portal/ExamPortal';
import { ExamVerification } from '../pages/exam-portal/components/ExamVerification';
import TermandConditionPage from '../pages/student/TermsConditionPage/TermandConditionPage';
// import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';
import { TotalStudentOfOrg } from '../pages/admin/totalStudentsOrg/TotalStudents';
import { ExamStarted } from '../pages/exam-portal/components/ExamStarted';
import { ExamSubmited } from '../pages/exam-portal/components/ExamSubmited';
import { ReportCard } from '../pages/exam-portal/components/ReportCard';
import { AdminDashboard } from '../pages/home/AdminDashBoard/AdminDashboards';
import { StudentDashBoard } from '../pages/home/StudentDashBoard/StudentDashBoard';
import AllAssissmentToStudent from '../pages/student/ShowAllAssissmentTostudent/AllAssissmentToStudent';
import StudentPaper from '../pages/student/StudentPaper/StudentPaper';
import { StudentResult } from '../pages/student/StudentResult/StudentResult';
// import { AddAssignment } from '../pages/admin/AddAssignment/AddAssignment';
import { AddAssignmentUpdate } from '../pages/admin/AddAssignment/AddAssignmentUpdate';
// import { StudentResult } from '../pages/student/StudentResult/StudentResult';
import { AddAssignment } from '../pages/admin/AddAssignment/AddAssignment';
import LeadGenerationPage from '../pages/sns-svs';
import { AllLeadStudent } from '../pages/sns-svs/AllLeadStudent';
import OtpVerification from '../pages/sns-svs/OtpVerification';
import StudentAvidancePageOnAdmin from '../pages/student/StudentAvidence/StudentAvidencePageOnAdmin';
import { SnsSvsDashboard } from '../pages/sns-svs/SnsSvsDashboard';

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path={path.home.path} element={<LeadGenerationPage />} />
        <Route path={`${path.home.path}/admin/login`} element={<LandingPage />} />

        <Route path={path.GetStarted.path} element={<SaveUserOrg />} />
        <Route path={path.Redirect.path} element={<Redirect />} />

        <Route path={path.Organisation.path} element={<OrganisationPage />} />
        <Route path="/" element={<Private />}>
          <Route path="/admin/" element={<CollegePrivate />}>
            <Route
              path={`${path.examReportOnAdmin.path}/:paperId/:stdId`}
              element={
                <Layout>
                  <StudentAvidancePageOnAdmin />
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
                  <AdminDashboard />
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
              path={path.UpdateAssessment.path}
              element={
                <Layout>
                  <AddAssignmentUpdate />
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
              path={path.showStudentOfOrg.path}
              element={
                <Layout>
                  <TotalStudentOfOrg />
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
                  <SidePooup examName={'Java Mastery Challenge'} />
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
            <Route
              path={`${path.AdminViewResult.path}/:paperId/:userId`}
              element={
                <Layout>
                  <StudentResult />
                </Layout>
              }
            />
          </Route>

          {/* --------------------------student-------------------------- */}
          <Route path="/student/" element={<StudentPrivate />}>
            <Route path={path.StudentPaper.path} element={<StudentPaper />} />
            <Route
              path={path.StudentDashboard.path}
              element={
                <Layout>
                  <StudentDashBoard />
                </Layout>
              }
            />
            <Route
              path={`${path.TermAndCondition.path}/:paperId`}
              element={
                <Layout>
                  <TermandConditionPage />
                </Layout>
              }
            />
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
            path={`${path.examReport.path}/:paperId/:stdId`}
            element={
              <Layout>
                <ReportCard />
              </Layout>
            }
          />
          <Route
            path={`${path.examReport.path}/:paperId/:stdId`}
            element={
              <Layout>
                <ReportCard />
              </Layout>
            }
          />
          <Route
            path={`${path.StudentPaperSubmitted.path}/:paperId`}
            element={<ExamSubmited />}
          />
          <Route
            path={`${path.StudentViewResult.path}/:paperId`}
            element={
              <Layout>
                <StudentResult />
              </Layout>
            }
          />
        </Route>
        <Route path={path.error.path} element={<h1>page not found</h1>} />
        <Route path={'sns-svs'} element={<LeadGenerationPage />} />
        <Route path={'otp'} element={<OtpVerification />} />
        <Route
              // path={path.AllSnsStudent.path}
              path="/sns-svs-lead-student"
              element={
                // <Layout>
                  <AllLeadStudent />
                // </Layout>
              }
            />
            <Route
              // path={path.AllSnsStudent.path}
              path="/sns-svs-dashboard"
              element={
                // <Layout>
                  <SnsSvsDashboard />
                // </Layout>
              }
            />
      </ReactRoute>
    </BrowserRouter>
  );
};
