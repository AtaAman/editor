/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

function Waves() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="left-0 w-full overflow-hidden -mt-20 shadow-2xl shadow-primary/40 leading-none"
    >
      <svg
        className="block w-screen h-[170px] md:h-[250px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#1fbfb3"
          d="M0,160 C240,60,480,260,720,160 C960,60,1200,260,1440,160 C1680,60,1920,260,2160,160 C2400,60,2640,260,2880,160 V320 H0 V0 Z"
        ></path>
      </svg>
    </motion.div>
  );
}

export default Waves;
