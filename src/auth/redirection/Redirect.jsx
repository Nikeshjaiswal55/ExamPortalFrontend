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
  const { isLoading, data, error } = useGetUserQuery();
  console.log('data',data);
  const navigate = useNavigate();
  const {
    data: getOrgdata,
    isLoading: orgLoading,
    isSuccess,
    isError: orgError,
  } = useGetOrgernizationQuery();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('orgData', JSON.stringify(getOrgdata));
    }
  }, [isSuccess]);
  
  if (orgError || error) {
    if (error.data?._user) {
      navigate(path.Organisation.path);
    }
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <SomethingWentWrong />
      </div>
    );
  } else {
    return isLoading ? (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <UserWaiting />
      </div>
    ) : data?.role === 'Student' ? (
      <Navigate to="/student" />
    ) : (
      <Navigate to={path.Organisation.path} />
    );
  }
};
