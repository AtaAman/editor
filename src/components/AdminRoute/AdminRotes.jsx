/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useAuthState";

const allowedAdmins = ["satyam@gmail.com"];

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useUserStore();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!isLoggedIn || !token) {
      navigate("/login");
    } else if (user?.email && allowedAdmins.includes(user.email)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isLoggedIn, user, navigate]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (isAdmin === false) {
    return (
      <div className="h-screen flex justify-center items-center">
        You are not an admin
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
