import { useRef } from 'react';
import './Feature.css';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import screentshot from '../../../../assets/gif/screent-shot-gif.gif';
import randomclick from '../../../../assets/gif/random-click.gif';
import rulebreakk from '../../../../assets/gif/rule-break.gif';

const items = [
  {
    id: 1,
    title: 'Taking ScreenShot On Tab Switch',
    img: screentshot,
    // img: 'https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 2,
    title: 'Random Picture Click on Time Interval',
    img: randomclick,
    // img: 'https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 3,
    title: 'Audio Record',
    img: 'https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
  {
    id: 4,
    title: 'On Violence Rules Auto Submit',
    img: rulebreakk,
    // img: 'https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.',
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section className="section">
      <div className="portfolio-container">
        <div className="portfolio-wrapper row">
          <div className="portfolio-image-container col-md-6 col-sm-12" ref={ref}>
            <img src={item.img} className="portfolio-img" alt="" />
          </div>
          <motion.div className="portfolio-text-container col-md-6 col-sm-12" style={{ y }}>
            <h2 className="portfolio-text-h2">{item.title}</h2>
            <p className="portfolio-text-p">{item.desc}</p>
            {/* <button className="portfolio-button">See Demo</button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Feature = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress mt-3" style={{ scaleX }}>
        <h1 className="portfolio-text-h1 text-center">Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Feature;
