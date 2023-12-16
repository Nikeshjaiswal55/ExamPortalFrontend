import { LocalStorageCache, useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Outlet } from 'react-router';
import { useRefreshAccessTokenMutation } from '../apis/Service';

export const getAccessToken = async (getAccessTokenSilently, user) => {
  try {
    localStorage.setItem('users', JSON.stringify(user ?? {}));
    const accessToken = await getAccessTokenSilently(
      {
        audience: 'https://exam-easy',
        scope: "openid profile email offline_access",
      }
    );
    localStorage.setItem('accessToken', accessToken);
    const refresh_token = new LocalStorageCache();
    console.log('refesh_token : ', refresh_token);
    const key = refresh_token.allKeys().find((key) => key.includes('auth0spa'));
    const refresh_token_value = refresh_token.get(key);
    const ref_token = refresh_token_value?.body?.refresh_token;
    localStorage.setItem('refreshToken', ref_token);
    console.log(`Access token: ${accessToken}`);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const Private = () => {
  const { loginWithRedirect } = useAuth0();
  const accessToken = localStorage.getItem('accessToken');
  const user = localStorage.getItem('users');
  if (accessToken) {
    //we can uncomment in the future

    // const [header, payload, signature] = accessToken.split('.');
    // const decodedPayload = JSON.parse(atob(payload));
    // const { exp } = decodedPayload;
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log('inside if', exp < currentTimestamp);

    if (user) {
      return <Outlet />;
    } else {
      loginWithRedirect();
    }
  } else {
    loginWithRedirect();
  }
};

export const CollegePrivate = () => {
  const role = localStorage.getItem('orgtype');
  if (role === 'college') {
    return <Outlet />;
  } else {
    return <h1>Something went wrong</h1>;
  }
};

export const AdminPrivate = () => {
  const role = localStorage.getItem('orgtype');
  if (role === 'college' || role === 'company') {
    return <Outlet />;
  } else {
    return <h1>Something went wrong</h1>;
  }
};

export const StudentPrivate = () => {
  const { role } = JSON.parse(localStorage.getItem('stdData'));
  console.log(role);
  if (role === 'Student') {
    return <Outlet />;
  } else {
    return <h1>Something went wrong</h1>;
  }
};

export const refreshToken = (queryCall, error) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (userError) {
    if (userError.status === 401) {
      // Token expired, try refreshing the token
      const refreshResult = useRefreshAccessTokenMutation(refreshToken);

      if (refreshResult.data) {
        // Token refreshed successfully, retry the original query
        const retryUserResult = queryCall();
        return retryUserResult;
        // Use retryUserResult.data and handle errors accordingly
      } else {
        // Token refresh failed, handle the error or redirect to login
      }
    } else {
      // Handle other types of errors
    }
  }
};
