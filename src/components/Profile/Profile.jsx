/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useAuthState";

const Profile = () => {
  const navigate = useNavigate();
  const { user, getCurrentUser, updateAccountDetails, isLoggedIn, setUser } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyGst: "",
    companyPoc: "",
    companyWebsite: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        if (!user) {
          await getCurrentUser();
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, user, getCurrentUser, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        companyName: user.company?.name || "",
        companyAddress: user.company?.address || "",
        companyPhone: user.company?.phone || "",
        companyEmail: user.company?.email || "",
        companyGst: user.company?.gst || "",
        companyPoc: user.company?.poc || "",
        companyWebsite: user.company?.website || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateAccountDetails(
        formData.fullName,
        formData.email,
        formData.companyName,
        formData.companyAddress,
        formData.companyPhone,
        formData.companyEmail,
        formData.companyGst,
        formData.companyPoc,
        formData.companyWebsite
      );

      setUser(updatedUser); 
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-4 border border-gray-300 rounded-md shadow-md space-y-4">
          <h2 className="text-xl font-semibold">{user?.fullName}</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600">Company: {user?.company?.name}</p>
          <p className="text-gray-600">Address: {user?.company?.address}</p>
          <p className="text-gray-600">Phone: {user?.company?.phone}</p>
          <p className="text-gray-600">Email: {user?.company?.email}</p>
          <p className="text-gray-600">GST: {user?.company?.gst}</p>
          <p className="text-gray-600">POC: {user?.company?.poc}</p>
          <p className="text-gray-600">Website: {user?.company?.website}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
