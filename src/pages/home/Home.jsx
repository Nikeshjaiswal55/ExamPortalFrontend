import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <div>Home Dashboard</div>

      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default Home;
