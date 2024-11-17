/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useAuthState";
const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useUserStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyGst: "",
    companyPoc: "",
    companyWebsite: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const {
      fullName,
      email,
      password,
      confirmPassword,
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      companyGst,
      companyPoc,
      companyWebsite,
    } = formData;

    // Validate user and company details
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All user fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!companyName || !companyAddress || !companyPhone || !companyEmail) {
      setError("All company fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(
        fullName,
        email,
        password,
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        companyGst,
        companyPoc,
        companyWebsite
      );
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h2 className="text-lg font-semibold mt-4">Company Details</h2>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
          placeholder="Company Address"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="companyPhone"
          value={formData.companyPhone}
          onChange={handleInputChange}
          placeholder="Company Phone"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="email"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleInputChange}
          placeholder="Company Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="companyGst"
          value={formData.companyGst}
          onChange={handleInputChange}
          placeholder="Company GST"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="companyPoc"
          value={formData.companyPoc}
          onChange={handleInputChange}
          placeholder="Point of Contact"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleInputChange}
          placeholder="Company Website"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
