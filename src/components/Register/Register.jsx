/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../../store/useAuthState";

const Register = () => {
  const navigate = useNavigate();
  const { register, verifyOtp } = useUserStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    companyLocation: "",
    leadsPerMonth: "",
    subscriptionPlan: "",
    subscriptionAmountPerMonth: "",
    subscriptionFrequency: "",
    subscriptionStartDate: "",
    subscriptionEndDate: "",
    companyLogo: null,
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("register");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(
        formData.email,
        formData.password,
        formData.companyName,
        formData.companyLocation,
        formData.leadsPerMonth,
        formData.subscriptionPlan,
        formData.subscriptionAmountPerMonth,
        formData.subscriptionFrequency,
        formData.subscriptionStartDate,
        formData.subscriptionEndDate,
        formData.companyLogo
      );
      toast.success("Registration successful! Please verify your OTP.");
      setStep("otp");
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await verifyOtp(otp);
      toast.success("OTP verified successfully! Redirecting...");
      setTimeout(() => navigate("/leads"), 2000);
    } catch (err) {
      toast.error(err.message || "Invalid or expired OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      {step === "register" ? (
        <>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Register
            </h1>
            <form
              onSubmit={handleRegister}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleInputChange}
                placeholder="Company Location"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                name="leadsPerMonth"
                value={formData.leadsPerMonth}
                onChange={handleInputChange}
                placeholder="Leads Per Month"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleInputChange}
                placeholder="Subscription Plan"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                name="subscriptionAmountPerMonth"
                value={formData.subscriptionAmountPerMonth}
                onChange={handleInputChange}
                placeholder="Subscription Amount Per Month"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="subscriptionFrequency"
                value={formData.subscriptionFrequency}
                onChange={handleInputChange}
                placeholder="Subscription Frequency"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="date"
                name="subscriptionStartDate"
                value={formData.subscriptionStartDate}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="date"
                name="subscriptionEndDate"
                value={formData.subscriptionEndDate}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {/* File Input */}
              <div className="w-full col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  name="companyLogo"
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full col-span-1 md:col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Login here
              </Link>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">OTP Verification</h1>
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
