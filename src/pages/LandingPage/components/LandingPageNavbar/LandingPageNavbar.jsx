import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import React from 'react';

const LandingPageNavbar = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="navbar container px-4 px-md-0">
      <motion.span
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, scale: 0.5 }}
      >
        <h3 className="text-capitalize fw-bold">ExamEasy</h3>
      </motion.span>
      <motion.div className="wrapper">
        <button className="login-button px-4 px-md-5 py-1" onClick={() => loginWithRedirect()}>
          login
        </button>
      </motion.div>
    </div>
  );
};

export default LandingPageNavbar;
