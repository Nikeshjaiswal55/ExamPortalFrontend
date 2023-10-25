import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { AUTH0KEYS } from '../constants';

export const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain={AUTH0KEYS.DOMAIN}
      clientId={AUTH0KEYS.CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0KEYS.AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
