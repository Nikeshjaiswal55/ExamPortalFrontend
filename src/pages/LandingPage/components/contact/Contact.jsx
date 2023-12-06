import { useRef, useState } from 'react';
import './Contact.css';
import { motion, useInView } from 'framer-motion';
// import emailjs from "@emailjs/browser";
import contactus from '../../../../assets/contact-us.png';

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <motion.h1
        className="contact-text-h1 text-center py-3"
        variants={variants}
      >
        Contact us
      </motion.h1>
      <motion.div
        ref={ref}
        className="contact"
        variants={variants}
        initial="initial"
        whileInView="animate"
      >
        <motion.div className="contact-textContainer" variants={variants}>
          <motion.img
            src={contactus}
            height="90%"
            width="90%"
            variants={variants}
          />
        </motion.div>
        <motion.div className="conatct-form-container">
          <motion.form
            ref={formRef}
            className="contact-form"
            onSubmit={sendEmail}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <input
              type="text"
              className="conatct-input"
              required
              placeholder="Name"
              name="name"
            />
            <input
              type="email"
              className="conatct-input"
              required
              placeholder="Email"
              name="email"
            />
            <textarea
              rows={8}
              className="conatct-textarea"
              placeholder="Message"
              name="message"
            />
            <button className="conatct-button">Submit</button>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
