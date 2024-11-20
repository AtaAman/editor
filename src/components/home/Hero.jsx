/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/home");
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveRoute(path);
      navigate(path);
    }, 500);
  };

  const getLinkClass = (path) => {
    return activeRoute === path ? "text-primary font-bold" : "text-gray-700 hover:text-primary transition";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-5"
    >
      <section className="flex flex-col md:flex-row items-center justify-center md:justify-around px-4 md:px-16 lg:px-24 py-8">
        <div className="text-center md:text-left mb-14 md:mb-0">
          <div className="max-w-md flex flex-col">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-5xl font-extrabold mb-4"
            >
              Switch to Solar and Save Big on Your{" "}
              <span className="text-primary">Energy Bills!</span>
            </motion.h1>
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="py-4"
            >
              Get exclusive deals from top nearby local installers! Join the
              renewable energy revolution with <span className="text-secondary">Lead2Solar</span>.
            </motion.p>
            <Link to="/login" className={getLinkClass("/login")} onClick={() => handleLinkClick("/login")}>
              <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-white px-8 text-sm py-2 bg-blue-500 shadow-lg shadow-primary/40  rounded-full"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center rounded-full shadow-2xl shadow-primary/40 lg:w-[360px] lg:h-[360px] md:w-[300px] md:h-[300px] w-[200px] h-[200px] overflow-hidden"
        >
          <img
            src="/homepage.jpg"
            alt="Solar Energy"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </section>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white opacity-80 z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary border-opacity-60"></div>
        </div>
      )}
    </motion.div>
  );
}

export default Hero;
