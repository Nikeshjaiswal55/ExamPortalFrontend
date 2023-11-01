import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoute } from 'react-router-dom';
import Home from '../pages/home/Home';
import { Private } from '../auth/Private';
import { path } from './RoutesConstant';

import OrgDashBoard from '../pages/adminpopup/OrgDashBoard';
import OrganisationPage from '../pages/adminpopup/components/OrganisationPage/OrganisationPage';

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path={path.home.path} element={<Home />} />
        <Route path="/" element={<Private />}>
          <Route
            path={path.private.path}
            element={<h1>this private route</h1>}
          />
        </Route>
        <Route path={path.AdminDasboard.path} element={<OrgDashBoard />} />
        <Route path={path.Organisation.path} element={<OrganisationPage />} />
        <Route path={path.error.path} element={<h1>page not found</h1>} />
      </ReactRoute>
    </BrowserRouter>
  );
};
