/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../../store/useAuthState";

function Login() {
  const navigate = useNavigate();
  const { login, requestPasswordReset, resetPassword } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email, password);
      toast.success("User logged in successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email.");
      return;
    }

    setError("");
    try {
      await requestPasswordReset(resetEmail);
      toast.success("Reset OTP sent successfully.");
      setIsResetting(true);
    } catch (err) {
      setError("Failed to send reset OTP. Please try again.");
      toast.error("Failed to send reset OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.error("Please enter OTP and new password.");
      return;
    }

    setError("");
    try {
      await resetPassword(resetEmail, otp, newPassword);
      toast.success("Password successfully changed.");
      setIsResetting(false);
      setForgotPassword(false);
    } catch (err) {
      setError(
        "Failed to reset password. Please check your OTP and try again."
      );
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-20 h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col justify-center items-center">
        <Link to="/home">
          <img
            src="./logo2.png"
            height={64}
            width={64}
            alt="Logo"
            className="mb-4"
          />
        </Link>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {forgotPassword ? (
          <div className="space-y-5">
            <h3 className="text-center text-lg font-semibold text-primary">
              Forgot Password
            </h3>
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {!isResetting ? (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm"
                />
                <button
                  onClick={handleRequestReset}
                  className="w-full bg-primary text-white py-1.5 px-3 rounded-md"
                >
                  Send Reset OTP
                </button>
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm"
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-primary text-white py-1.5 px-3 rounded-md"
                >
                  Reset Password
                </button>
              </>
            )}

            <button
              onClick={() => setForgotPassword(false)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm"
            />

            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-1.5 px-3 rounded-md"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex justify-between text-sm">
              <button
                onClick={() => setForgotPassword(true)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </button>
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
