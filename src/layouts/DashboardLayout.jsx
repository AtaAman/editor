import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Sidebar } from "../components/Sidebar/Sidebar";
import useUserStore from "../store/useAuthState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { user, logout } = useUserStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home"); // Redirect to the home page after logout
  };

  // Dynamic heading based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/team":
        return "Team Management";
      case "/dashboard/leads":
        return "Leads Management";
      case "/dashboard/tracking":
        return "Tracking Management";
      case "/dashboard/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <main className="flex h-screen overflow-hidden">
      {/* Sidebar (Fixed on larger screens, toggleable on mobile) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <section className="flex flex-col w-full h-screen">
        {/* Page Header */}
        <header className="flex items-center p-4 bg-white shadow-md h-16">
          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <h1 className="text-xl text-secondary flex-1 text-center">
            {getPageTitle()}
          </h1>

          <div className="flex items-center m-2 justify-center rounded-full">
            {user.companyLogo?.url && (
              <img
                src={user.companyLogo.url}
                className="h-10 w-10 rounded-md"
                alt="User Logo"
              />
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-auto p-6 bg-gray-100">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
