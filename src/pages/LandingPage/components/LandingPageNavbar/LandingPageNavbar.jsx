import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import React from 'react';
import exameasy_light_logo from '../../../../assets/exameasy_light_logo.svg'
const LandingPageNavbar = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="navbar container">
      <motion.span
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, scale: 0.5 }}
      >
        <h3 className="text-capitalize fw-bold "><img src={exameasy_light_logo} alt="logo" width={"50%"} /></h3>
      </motion.span>
      <motion.div className="wrapper">
        <button className="login-button" onClick={() => loginWithRedirect()}>
          login
        </button>
      </motion.div>
    </div>
  );
};

export default LandingPageNavbar;
