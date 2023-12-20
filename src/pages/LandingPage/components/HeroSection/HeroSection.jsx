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
    <div className="hero">
      <div className="hero-wrapper">
        <motion.div
          className="text-container"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variant={textVariants} className="text-h2">
            Welcome to ExamEasy!!
          </motion.h2>
          <motion.h1 variant={textVariants} className="text-h1">
            With Moto Your Action Our Reaction...
          </motion.h1>
          <motion.a href="#contact" variant={textVariants} className="buttons">
            contact us
          </motion.a>
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        NO MORE CHEATING
      </motion.div>
      <div className="imageContainer">
        <img src={landingPage} alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
