import React from 'react';
import { motion } from 'framer-motion';
import './heroSection.css';
import landingPage from '../../../../assets/landingPageImage.png';

const HeroSection = () => {
  const textVariants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };
  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: '-220%',
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 20,
      },
    },
  };

  return (
    <div className="hero row justify-content-center ps-lg-4">
      <div className="hero-wrapper col-lg-4 col-12 ps-lg-5 d-flex align-items-center">
        <motion.div
          className="text-container"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variant={textVariants} className="text-h2 h4 mb-5">
            Welcome To ExamEasy!!
          </motion.h2>
          <motion.h1 variant={textVariants} className="display-2 px-1 w-auto text-bold px-lg-0">
            With Moto Your Action Our Reaction...
          </motion.h1>
          <motion.a href="#contact" variant={textVariants} className="buttons"> Contact Us </motion.a>
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer col-12"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        NO MORE CHEATING
      </motion.div>
      <div className="col-lg-5 col-12">
      <div className="imageContainer">
        <img src={landingPage} alt="" />
      </div>
      </div>
    </div>
  );
};

export default HeroSection;
