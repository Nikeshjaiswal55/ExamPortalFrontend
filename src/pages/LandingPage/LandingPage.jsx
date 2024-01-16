import './LandingPage.css';
import Feature from './components/Feature/Feature';
import HeroSection from './components/HeroSection/HeroSection';
import LandingPageNavbar from './components/LandingPageNavbar/LandingPageNavbar';
import Parallex from './components/Parallex/Parallex';
import Contact from './components/contact/Contact';
import Services from './components/services/Service';

const LandingPage = () => {
  const linkIds = {
    home: 'home',
    service: 'service',
    features: 'features',
    contact: 'contact',
  };
  return (
    <div className="m-0 p-0">
      <div className="section w-100" id={linkIds.home}>
        <LandingPageNavbar />
        <HeroSection />
      </div>
      {/* <div className="section" id={linkIds.service}>
        <Parallex type={'services'} />
      </div>
      <div className="section"></div> */}
      {/* <div className="section" id={linkIds.features}>
        <Parallex type={'feature'} />
      </div> */}
      <Feature />
      <div className="section" id={linkIds.contact}>
        <Contact />
      </div>
    </div>
  );
};

export default LandingPage;
