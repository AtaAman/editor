/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faFileAlt,
  faTasks,
  faUserCheck,
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import useUserStore from "../../store/useAuthState";

const Navbar = () => {
  const { isLoggedIn, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/home");
  const [loading, setLoading] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const navbarStyle = {
    position: "relative",
    top: isVisible ? "0px" : "-100px",
    opacity: isVisible ? 1 : 0,
    transition: "all 0.5s ease-in-out",
  };

  const getLinkClass = (path) => {
    return activeRoute === path
      ? "text-primary font-bold"
      : "text-gray-700 hover:text-primary transition";
  };

  return (
    <div
      style={navbarStyle}
      className="flex justify-between items-center px-4 md:px-10 py-4 lg:px-5 bg-white shadow-2xl shadow-primary/50"
    >
      <div className="flex items-center justify-between w-full">
        <div className="cursor-pointer">
          <Link to="/home">
            <img src="/logo2.png" alt="Logo" className="h-12 w-20" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-row lg:gap-8 lg:justify-around lg:w-full">
          <ul className="flex flex-row text-[15px] lg:space-x-10">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary transition"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home#about"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary transition"
                }
              >
                About
              </NavLink>
            </li>
            <li
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              className="relative"
            >
              <div className="flex items-center cursor-pointer">
                <span className="text-gray-700 hover:text-primary transition">
                  Services
                </span>
                <FontAwesomeIcon icon={faClipboard} className="ml-1" />
              </div>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.ul
                    className="absolute left-0 mt-1 w-80 bg-white shadow-md rounded-md p-10 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li>
                      <Link
                        to="/lead"
                        className="flex items-center py-1 hover:bg-gray-100 rounded"
                      >
                        <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
                        Graph Generate
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/project"
                        className="flex items-center py-1 hover:bg-gray-100 rounded"
                      >
                        <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                        Project Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/proposal"
                        className="flex items-center py-1 hover:bg-gray-100 rounded"
                      >
                        <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                        Proposal Management
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <NavLink
                to="/home#estimate"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary transition"
                }
              >
                Estimate
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home#faq"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold"
                    : "text-gray-700 hover:text-primary transition"
                }
              >
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="lg:hidden">
          <button
            className="text-primary p-2"
            onClick={() => setIsMenuOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>
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
            className="px-8 hidden lg:block py-2 text-sm text-white bg-[#562356] rounded-full transition duration-200 hover:bg-primary-dark"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 right-0 w-full h-full bg-white z-50 shadow-lg p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl text-primary font-bold">
                  <Link to="/home">
                    <img src="/logo2.png" alt="Logo" className="h-16 w-16" />
                  </Link>
                </h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size="lg"
                    className="text-primary"
                  />
                </button>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link to="/home" className="block py-2 text-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/home#about" className="block py-2 text-lg">
                    About
                  </Link>
                </li>
                <li>
                  <div
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="relative"
                  >
                    <div className="flex items-center cursor-pointer text-lg">
                      <span className="text-gray-700">Services</span>
                      <FontAwesomeIcon icon={faClipboard} className="ml-2" />
                    </div>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.ul
                          className="absolute left-0 pl-4 mt-2 space-y-2 bg-white shadow-md rounded-md p-2 z-10"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <li>
                            <Link to="/lead" className="block py-2">
                              <FontAwesomeIcon
                                icon={faUserCheck}
                                className="mr-2"
                              />
                              Graph Generate
                            </Link>
                          </li>
                          <li>
                            <Link to="/project" className="block py-2">
                              <FontAwesomeIcon
                                icon={faClipboard}
                                className="mr-2"
                              />
                              Project Management
                            </Link>
                          </li>
                          <li>
                            <Link to="/proposal" className="block py-2">
                              <FontAwesomeIcon
                                icon={faFileAlt}
                                className="mr-2"
                              />
                              Proposal Management
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
                <li>
                  <Link to="/home#estimate" className="block py-2 text-lg">
                    Estimate
                  </Link>
                </li>
                <li>
                  <Link to="/home#faq" className="block py-2 text-lg">
                    FAQ
                  </Link>
                </li>
                <li>
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
                      className="block py-2 text-lg text-white bg-[#562356] rounded-full"
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
