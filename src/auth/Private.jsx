import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Outlet } from 'react-router';

export const getAccessToken = async (getAccessTokenSilently, user) => {
  try {
    localStorage.setItem('users', JSON.stringify(user??{}));
    const accessToken = await getAccessTokenSilently();
    console.log(user);
    localStorage.setItem('accessToken', accessToken);
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
    console.log('access');
    //we can uncomment in the future

    // const [header, payload, signature] = accessToken.split('.');
    // const decodedPayload = JSON.parse(atob(payload));
    // const { exp } = decodedPayload;
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log('inside if', exp < currentTimestamp);

    if (user) {
      console.log('inside if');
      return <Outlet />;
    } else {
      loginWithRedirect();
    }
  } else {
    console.log('inside else');
    loginWithRedirect();
  }
};
