/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useAuthState";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate(); 
  const { isLoggedIn, accessToken } = useUserStore(); 

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!isLoggedIn && !token) {
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);

  return <>{(isLoggedIn || accessToken) ? children : null}</>;
};

export default PrivateRoute;
