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
      email,
      password,
      companyName,
      companyLocation,
      leadsPerMonth,
      subscriptionPlan,
      subscriptionAmountPerMonth,
      subscriptionFrequency,
      subscriptionStartDate,
      subscriptionEndDate,
      companyLogo
    ) => {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("companyName", companyName);
        formData.append("companyLocation", companyLocation);
        formData.append("leadsPerMonth", leadsPerMonth);
        formData.append("subscriptionPlan", subscriptionPlan);
        formData.append(
          "subscriptionAmountPerMonth",
          subscriptionAmountPerMonth
        );
        formData.append("subscriptionFrequency", subscriptionFrequency);
        formData.append("subscriptionStartDate", subscriptionStartDate);
        formData.append("subscriptionEndDate", subscriptionEndDate);
        formData.append("companyLogo", companyLogo);

        const response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const newUser = response.data.data;
        set({ user: newUser, isLoggedIn: false });

        alert("User registered successfully. Check your email for OTP.");
      } catch (error) {
        console.error("Registration error:", error);
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          throw new Error("User with this email already exists");
        }
        throw new Error("Registration failed");
      }
    },

    verifyOtp: async (otp) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/verify-otp",
          { otp }
        );

        set((state) => {
          if (!state.user) {
            throw new Error("User not found in store.");
          }
          const updatedUser = { ...state.user, isVerified: true };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return { user: updatedUser, isLoggedIn: true };
        });

        alert("Email verified successfully.");
      } catch (error) {
        console.error("OTP verification error:", error);
        throw new Error("Invalid or expired OTP");
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
          "https://l2sbackend.onrender.com/api/v1/users/refresh-token",
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

    getAllUsers: async () => {
      try {
        const accessToken = useUserStore.getState().accessToken;
        const response = await axios.get("http://localhost:8000/api/v1/users/all-user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },

    updateAccountDetails: async (companyName, companyLocation) => {
      try {
        const accessToken = useUserStore.getState().accessToken;
        const response = await axios.patch(
          "http://localhost:8000/api/v1/users/update-account",
          { companyName, companyLocation },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const updatedUser = response.data.data;
        set({ user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      } catch (error) {
        console.error("Error updating account details:", error);
        throw new Error("Failed to update account details");
      }
    },

    updateCompanyLogo: async (companyLogo) => {
      try {
        const accessToken = useUserStore.getState().accessToken;
        const formData = new FormData();
        formData.append("companyLogo", companyLogo);

        const response = await axios.patch(
          "http://localhost:8000/api/v1/users/update-logo",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedUser = response.data.data;
        set({ user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      } catch (error) {
        console.error("Error updating company logo:", error);
        throw new Error("Failed to update company logo");
      }
    },

    changeCurrentPassword: async (oldPassword, newPassword) => {
      try {
        const accessToken = useUserStore.getState().accessToken;
        await axios.post(
          "http://localhost:8000/api/v1/users/change-password",
          { oldPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return { message: "Password changed successfully" };
      } catch (error) {
        console.error("Error changing password:", error);
        throw new Error("Failed to change password");
      }
    },

    requestPasswordReset: async (email) => {
      try {
        await axios.post(
          "http://localhost:8000/api/v1/users/request-reset-password",
          { email }
        );
        return { message: "OTP sent to email" };
      } catch (error) {
        console.error("Error requesting password reset:", error);
        throw new Error("Failed to request password reset");
      }
    },

    resetPassword: async (email, otp, newPassword) => {
      try {
        await axios.post("http://localhost:8000/api/v1/users/reset-password", {
          email,
          otp,
          newPassword,
        });
        return { message: "Password reset successfully" };
      } catch (error) {
        console.error("Error resetting password:", error);
        throw new Error("Failed to reset password");
      }
    },

    setUser: (user) => set({ user }),
  };
});

export default useUserStore;
