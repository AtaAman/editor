import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => {
  const storedUser = localStorage.getItem("user");
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedRefreshToken = localStorage.getItem("refreshToken");

  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const initialAccessToken = storedAccessToken || null;
  const initialRefreshToken = storedRefreshToken || null;

  set({
    user: initialUser,
    accessToken: initialAccessToken,
    refreshToken: initialRefreshToken,
    isLoggedIn: !!initialAccessToken,
  });

  return {
    user: initialUser,
    accessToken: initialAccessToken,
    refreshToken: initialRefreshToken,
    isLoggedIn: !!initialAccessToken,

    login: async (email, password) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/login",
          { email, password }
        );
        const { user, accessToken, refreshToken } = response.data.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        set({
          user,
          accessToken,
          refreshToken,
          isLoggedIn: true,
        });
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
      }
    },

    register: async (
      fullName,
      email,
      password,
      company
    ) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          {
            fullName,
            email,
            password,
            company,
          }
        );

        const newUser = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(newUser));
        set({ user: newUser, isLoggedIn: true });

        alert("User registered successfully.");
      } catch (error) {
        console.error("Registration error:", error);
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          throw new Error("User with email or username already exists");
        }
        throw new Error("Registration failed");
      }
    },

    logout: async () => {
      try {
        const accessToken = useUserStore.getState().accessToken;
        await axios.post(
          "http://localhost:8000/api/v1/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Logout failed");
      }
    },

    refreshAccessToken: async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        set({ accessToken, refreshToken });
      } catch (error) {
        console.error("Error refreshing access token:", error);
        throw new Error("Failed to refresh access token");
      }
    },

    getCurrentUser: async () => {
      try {
        const accessToken = useUserStore.getState().accessToken;

        const response = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const user = response.data.data;

        set({
          user,
          isLoggedIn: true,
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
        throw new Error("Failed to fetch current user");
      }
    },

    updateAccountDetails: async (
      fullName,
      email,
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      companyGst,
      companyPoc,
      companyWebsite
    ) => {
      try {
        const accessToken = useUserStore.getState().accessToken;

        const response = await axios.patch(
          "http://localhost:8000/api/v1/users/update-account",
          {
            fullName,
            email,
            companyName,
            companyAddress,
            companyPhone,
            companyEmail,
            companyGst,
            companyPoc,
            companyWebsite,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const updatedUser = response.data.data;
        set({ user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser; // Return updated user
      } catch (error) {
        console.error("Error updating account details:", error);
        throw new Error("Failed to update account details");
      }
    },

    setUser: (user) => set({ user }),
  };
});

export default useUserStore;
