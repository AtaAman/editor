import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Lead from "./components/Services/Lead.jsx";
import Project from "./components/Services/Project.jsx";
import Proposal from "./components/Services/Proposal.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Profile from "./components/Profile/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes.jsx";
import AdminRoute from "./components/AdminRoute/AdminRotes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Private Routes */}
      <Route
        path="/lead"
        element={
          <PrivateRoute>
            <Lead />
          </PrivateRoute>
        }
      />
      <Route
        path="/project"
        element={
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        }
      />
      <Route
        path="/proposal"
        element={
          <PrivateRoute>
            <Proposal />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/Register"
        element={
          <AdminRoute>
            <Register />
          </AdminRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
