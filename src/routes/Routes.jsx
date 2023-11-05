import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoute } from 'react-router-dom';
import Home from '../pages/home/Home';
import { Private } from '../auth/Private';
import {path} from './RoutesConstant';
import OrgDashBoard from '../pages/admin/OrgDashboard/OrgDashBoard';

import AddCourse from '../pages/admin/AddCourse/AddCourse';
import AddAssignment from '../pages/admin/AddCourse/AddAssignment';
import CreateAssesment from '../pages/admin/AddCourse/CreateAssesment';
import {CreateCourse} from '../pages/admin/AddCourse/CreateCourse';
import OrganisationPage from '../pages/admin/OrganisationPage/OrganisationPage';

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
          <Route path={path.AdminDasboard.path} element={<OrgDashBoard />} />
        <Route path={path.AddCourse.path} element={<AddCourse />} />
        <Route path={path.AddAssessment.path} element={<AddAssignment />} />
        <Route path={path.CreateAssessment.path} element={<CreateAssesment />} />
        <Route path={path.CreateCourse.path} element={<CreateCourse />} />
        </Route>
        <Route path={path.error.path} element={<h1>page not found</h1>} />
      </ReactRoute>
    </BrowserRouter>
  );
};
