import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoute } from 'react-router-dom';
import Home from '../pages/home/Home';
import { Private } from '../auth/Private';
import { path } from './RoutesConstant';
import OrgDashBoard from '../pages/admin/OrgDashboard/OrgDashBoard';

import AddCourse from '../pages/admin/AddCourse/AddCourse';
import { CreateCourse } from '../pages/admin/AddCourse/CreateCourse';
import OrganisationPage from '../pages/admin/OrganisationPage/OrganisationPage';
import Layout from '../components/layout';
import ShowCourse from '../pages/admin/ShowCourse/ShowCourse';
import AssignmentStudentPage from '../pages/admin/AssignmentStudentPage/AssignmentStudentPage';
import ShowAssessment from '../pages/admin/showAssessment/Showassessment';
import TermandConditionPage from '../pages/student/TermsConditionPage/TermandConditionPage';
import CreateAssesment from '../pages/admin/AddAssignment/CreateAssesment';
import AddAssignment from '../pages/admin/AddAssignment/AddAssignment';

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path={path.home.path} element={<Home />} />
        <Route path={path.Organisation.path} element={<OrganisationPage />} />

        <Route path="/" element={<Private />}>
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
        </Route>
        <Route path={path.error.path} element={<h1>page not found</h1>} />
      </ReactRoute>
    </BrowserRouter>
  );
};
