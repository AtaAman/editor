import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiMapPin, FiUser } from "react-icons/fi";
import useUserStore from "../../store/useAuthState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Sidebar = ({ closeSidebar }) => {
  const { user, logout } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("User logged out successfully.");
    navigate("/home");
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) closeSidebar();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <aside className="w-64 bg-white h-screen flex flex-col p-5">
        <button
          className="md:hidden self-end text-gray-700 text-2xl mb-4"
          onClick={closeSidebar}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="h-16 flex items-center justify-start gap-2 border-b border-gray-200">
          <img
            src="/logo2.png"
            className="h-10 w-10 rounded-md"
            alt="lead2solar_logo"
          />
          <span className="text-xl font-bold text-primary">Lead2solar</span>
        </div>

        <div className="flex-grow mt-4 space-y-2">
          <SidebarItem
            Icon={FiHome}
            title="Dashboard"
            path="/dashboard"
            onClick={handleNavClick}
          />
          <SidebarItem
            Icon={FiUsers}
            title="Team"
            path="/dashboard/team"
            onClick={handleNavClick}
          />
          <SidebarItem
            Icon={FiFileText}
            title="Leads"
            path="/dashboard/leads"
            onClick={handleNavClick}
          />
          <SidebarItem
            Icon={FiMapPin}
            title="Tracking"
            path="/dashboard/tracking"
            onClick={handleNavClick}
          />
          <SidebarItem
            Icon={FiUser}
            title="Profile"
            path="/dashboard/profile"
            onClick={handleNavClick}
          />
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto text-white rounded-lg text-md bg-primary hover:bg-white hover:shadow-lg hover:shadow-primary/50 hover:text-primary border border-primary/10 px-4 py-2 flex items-center justify-center space-x-2"
        >
          Logout
        </button>
      </aside>
    </>
  );
};

const SidebarItem = ({ Icon, title, path, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link to={path} className="block" onClick={onClick}>
      <button
        className={`flex items-center gap-3 w-full border border-primary/10 rounded-lg px-4 py-3 text-sm font-medium transition duration-300 ${
          isActive
            ? "bg-primary text-white shadow-lg"
            : "hover:bg-primary/40 text-gray-500"
        }`}
      >
        <Icon
          className={`text-lg ${isActive ? "text-white" : "text-gray-500"}`}
        />
        <span>{title}</span>
      </button>
    </Link>
  );
};
