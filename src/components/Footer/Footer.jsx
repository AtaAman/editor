/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faClipboard,
  faFileAlt,
  faTasks,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Using React Router Link

function Footer() {
  return (
    <footer className="footer bg-primary text-white p-16 flex flex-col lg:flex-row justify-between items-center space-y-0 lg:space-y-4 lg:space-x-6">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 lg:flex-1 mb-6 lg:mb-0 text-center lg:text-left">
        <div className="mr-0 lg:mr-4 mb-4 lg:mb-0">
          <img src="/logo.png" height="64" width="64" alt="Dark Mode Logo" /> {/* Replaced Image with <img> */}
        </div>
        <nav className="flex flex-col lg:flex-row lg:flex-1 gap-5 lg:gap-16">
          <div className="flex gap-3 flex-col">
            <h6 className="footer-title">Services</h6>
            <div className="flex items-start justify-start">
              <FontAwesomeIcon icon={faUserCheck} className="mr-2 text-lg" />
              <Link to="/lead" className="link link-hover text-sm"> {/* Replaced Link with React Router Link */}
                Lead Management
              </Link>
            </div>
            <div className="flex items-start justify-start">
              <FontAwesomeIcon icon={faClipboard} className="mr-2 text-lg" />
              <Link to="/project" className="link link-hover text-sm">
                Project Management
              </Link>
            </div>
            <div className="flex items-start justify-start">
              <FontAwesomeIcon icon={faTasks} className="mr-2 text-lg" />
              <Link to="/task" className="link link-hover text-sm">
                Task Management
              </Link>
            </div>
            <div className="flex items-start justify-start">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-lg" />
              <Link to="/proposal" className="link link-hover text-sm">
                Proposal Management
              </Link>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <h6 className="footer-title">Company</h6>
            <div className="flex gap-3 flex-col">
              <Link to="/home#process" className="link link-hover text-sm">
                Process
              </Link>
              <Link to="/home#estimate" className="link link-hover text-sm">
                Estimate
              </Link>
              <Link to="#" className="link link-hover text-sm">
                Jobs
              </Link>
              <Link to="/home#faq" className="link link-hover text-sm">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <h6 className="footer-title">Legal</h6>
            <div className="flex gap-3 flex-col">
              <Link to="#" className="link link-hover text-sm">
                Terms of use
              </Link>
              <Link to="#" className="link link-hover text-sm">
                Privacy policy
              </Link>
              <Link to="#" className="link link-hover text-sm">
                Cookie policy
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <nav className="flex justify-center lg:justify-end lg:flex-1 space-x-4">
        <a href="#" aria-label="Facebook" className="text-2xl lg:text-3xl">
          <FontAwesomeIcon icon={faFacebook} className="fill-current" />
        </a>
        <a href="#" aria-label="Twitter" className="text-2xl lg:text-3xl">
          <FontAwesomeIcon icon={faTwitter} className="fill-current" />
        </a>
        <a href="#" aria-label="LinkedIn" className="text-2xl lg:text-3xl">
          <FontAwesomeIcon icon={faLinkedin} className="fill-current" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
