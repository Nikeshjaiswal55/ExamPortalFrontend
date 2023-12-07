import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { AUTH0KEYS } from '../constants';
// import {} from '../constants/index'
export const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain={AUTH0KEYS.DOMAIN}
      clientId={AUTH0KEYS.CLIENT_ID}
      useRefreshTokens={true}
      authorizationParams={{
        redirect_uri: AUTH0KEYS.REDIRECT_URL,
        audience: AUTH0KEYS.AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
