import React, { useRef } from 'react';
import './Parallex.css';
import { useScroll, motion, useTransform } from 'framer-motion';

const Parallex = ({ type }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '500%']);

  return (
    <div
      className="parallax"
      ref={ref}
      style={{
        background:
          type === 'services'
            ? 'linear-gradient(180deg, #111132, #0c0c1d)'
            : 'linear-gradient(180deg, #111132, #505064)',
      }}
    >
      <motion.h1 style={{ y: yText }} className="text-h1">
        {type === 'services' ? 'What We Do...' : 'What We Did!!'}
      </motion.h1>
      <motion.div className="mountains"></motion.div>
      <motion.div
        className="planets"
        style={{
          y: yBg,
          backgroundImage: `url(${
            type === 'services' ? '/public/planets.png' : '/public/sun.png'
          })`,
        }}
      ></motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
    </div>
  );
};

export default Parallex;
