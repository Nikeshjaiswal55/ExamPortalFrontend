import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Outlet } from 'react-router';

export const getAccessToken = async (getAccessTokenSilently) => {
  try {
    const accessToken = await getAccessTokenSilently();
    localStorage.setItem('accessToken', accessToken);
    console.log(`Access token: ${accessToken}`);
  } catch (e) {
    console.error(e);
  }
};

export const Private = () => {
  const { loginWithRedirect, user } = useAuth0();
  const accessToken = localStorage.getItem('accessToken');
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
    console.log('inside else');
    loginWithRedirect();
  }
};
