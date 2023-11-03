import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getAccessToken } from '../../auth/Private';

const Home = () => {
  const { user, loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken(getAccessTokenSilently);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      <div>Home Dashboard</div>
      {isAuthenticated ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default Home;
