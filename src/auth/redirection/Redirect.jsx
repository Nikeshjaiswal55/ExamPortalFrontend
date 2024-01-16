import React, { useEffect } from 'react';
import { getAccessToken } from '../Private';
import { Navigate, useNavigate } from 'react-router';
import { path } from '../../routes/RoutesConstant';
import { useGetOrgernizationQuery, useGetUserQuery } from '../../apis/Service';
import { useAuth0 } from '@auth0/auth0-react';
import { UserWaiting } from '../../components/UserWaiting/UserWaiting';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';

export const SaveUserOrg = () => {
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      const conditionTrue = getAccessToken(getAccessTokenSilently, user);
      if (conditionTrue) {
        navigate(path.Redirect.path);
      }
    }
  }, [isAuthenticated, user]);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <UserWaiting />
    </div>
  );
};

export const Redirect = () => {
  const { isLoading, data, isSuccess: userSucess, error } = useGetUserQuery();
  const navigate = useNavigate();
  const {
    data: getOrgdata,
    isLoading: orgLoading,
    isSuccess,
    isError: orgError,
  } = useGetOrgernizationQuery();

  useEffect(() => {
    if (userSucess && data?.role === 'Student') {
      localStorage.setItem('stdData', JSON.stringify(data ?? {}));
    }
  }, [userSucess]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('orgData', JSON.stringify(getOrgdata));
      localStorage.setItem('orgtype', getOrgdata.orgnizationType);
    }
  }, [isSuccess]);

  if (error) {
    if (error && error.data?._user) {
      navigate(path.Organisation.path);
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <SomethingWentWrong />
        </div>
      );
    }
  } else {
    return isLoading || orgLoading ? (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: '100vh', width: '100vw' }}
      >
        <UserWaiting />
      </div>
    ) : data?.role === 'Student' ? (
      <Navigate to={path.StudentDashboard.path} />
    ) : (
      <Navigate to={path.Organisation.path} />
    );
  }
};
