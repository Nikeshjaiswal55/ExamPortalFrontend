import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { BiLogIn } from "react-icons/bi";
import exameasy_light_logo from '../../../../assets/exameasy_light_logo.svg'
const LandingPageNavbar = () => {
  const { loginWithRedirect } = useAuth0();
  const imageSize = {
    width:"12rem"
  }

  return (
    <div className="navbar row m-auto mt-2 container px-3 px-md-0">
      <div className="col-8">
      <motion.span animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} initial={{ opacity: 0, scale: 0.5 }}>
        <h3 className="text-capitalize fw-bold"><img className='img-fluid' src={exameasy_light_logo} alt="logo" style={imageSize} /></h3>
      </motion.span>
      </div>
      <div className="col-4">
      <motion.div className="wrapper d-flex align-item-center">
        <button className="login-button px-4 px-md-5 py-1 d-none d-md-block" onClick={() => loginWithRedirect()}>Login </button>
        <BiLogIn className="d-md-none d-lg-none d-xl-none d-sm-block h1 m-auto"  onClick={() => loginWithRedirect()} />
      </motion.div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
1