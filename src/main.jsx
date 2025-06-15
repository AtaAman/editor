import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

import Team from "./components/Dashboard/Team.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Leads from "./components/Dashboard/Leads.jsx";
import TrackLeads from "./components/Dashboard/TrackLeads.jsx";
import Profile from "./components/Dashboard/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Home route */}
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />

      {/* Auth routes (Public) */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Private Routes */}
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      Dashboard Routes
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="team" element={<Team />} />
        <Route path="leads" element={<Leads />} />
        <Route path="tracking" element={<TrackLeads />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Catch-All (404) */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
