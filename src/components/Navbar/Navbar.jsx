/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useAuthState";
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { isLoggedIn, logout } = useUserStore();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`transition-all duration-500 ease-in-out ${
        isSticky
          ? "hidden lg:block left-0 top-0 fixed backdrop-blur-sm px-5 rounded-b-2xl w-[100%]  shadow-lg shadow-primary/10 z-50"
          : "w-[100%] p-5 transform"
      }`}
    >
      <div className="flex justify-between lg:justify-around lg:px-4 gap-0 lg:gap-30 items-center">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link to="/home">
            <img src="/logo2.png" alt="Logo" className="h-20 w-20" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex w-[50%] flex-1 justify-center items-center">
          <ul className="relative flex space-x-12 text-[18px]">
            {["about", "pricing", "contact"].map((route, idx) => (
              <li key={idx} className="relative group">
                <a
                  href={`/home#${route}`}
                  className="hover:text-primary text-[#696868] transition relative"
                >
                  {route.charAt(0).toUpperCase() +
                    route.slice(1).replace(/-/g, " ")}
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              </li>
            ))}
            <li>
              <Link to="/dashboard">
                <a className="hover:text-primary text-[#696868] transition relative">
                  dashboard
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Leads Button (Desktop) */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
              }}
              className="hidden lg:block text-primary text-xl"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            </button>
          ) : (
            <Link
              to="/login"
              className="px-8 hidden lg:block py-2 text-sm text-white bg-primary rounded-full transition duration-200 hover:bg-primary-dark"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div>
          <div className="lg:hidden">
            <button
              className="text-accent"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed top-0 right-0 w-full h-full bg-white z-50 shadow-lg p-8"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="cursor-pointer">
                    <Link to="/home">
                      <img src="/logo2.png" alt="Logo" className="h-12 w-20" />
                    </Link>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      size="lg"
                      className="text-primary"
                    />
                  </button>
                </div>
                <ul className="flex flex-col gap-5 text-[18px]">
                  {["about", "pricing", "contact"].map((route, idx) => (
                    <li key={idx}>
                      <a
                        href={`/home#${route}`}
                        onClick={handleNavLinkClick}
                        className="hover:text-primary transition"
                      >
                        {route.charAt(0).toUpperCase() +
                          route.slice(1).replace(/-/g, " ")}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link to="/dashboard">
                      <a className="hover:text-primary text-[#696868] transition relative">
                        dashboard
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      </a>
                    </Link>
                  </li>
                </ul>
                {/* Get Leads Button (Mobile) */}
                <div>
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className="block py-2 text-lg w-full text-left"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block py-2 text-lg text-white bg-primary rounded-full"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
