import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useAuthState";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiUpload, FiLock } from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();
  const { user, getCurrentUser, isLoggedIn, updateAccountDetails, updateCompanyLogo, changeCurrentPassword } = useUserStore();

  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Toggle form visibility
  const [showEditForm, setShowEditForm] = useState(false);
  const [showLogoForm, setShowLogoForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!user) {
      getCurrentUser();
    }
  }, [isLoggedIn, user, getCurrentUser, navigate]);

  useEffect(() => {
    if (user) {
      setCompanyName(user.companyName || "");
      setCompanyLocation(user.companyLocation || "");
    }
  }, [user]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      await updateAccountDetails(companyName, companyLocation);
      toast.success("Account details updated successfully!");
      setShowEditForm(false);
    } catch (error) {
      toast.error("Failed to update account details");
    }
  };

  const handleLogoUpload = async (e) => {
    e.preventDefault();
    if (!companyLogo) {
      toast.error("Please select a logo file");
      return;
    }
    try {
      await updateCompanyLogo(companyLogo);
      toast.success("Company logo updated successfully!");
      setShowLogoForm(false);
    } catch (error) {
      toast.error("Failed to update company logo");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await changeCurrentPassword(oldPassword, newPassword);
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ToastContainer /> {/* ToastContainer added here */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {user.companyLogo?.url && (
          <img src={user.companyLogo.url} alt="Company Logo" className="w-24 h-24 rounded-md mx-auto" />
        )}
        <h2 className="text-xl font-bold text-center">{user.companyName || "N/A"}</h2>
        <p className="text-center text-gray-500">{user.email || "N/A"}</p>

        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center gap-2 text-blue-500 hover:text-blue-700" onClick={() => setShowEditForm(!showEditForm)}>
            <FiEdit className="text-lg" /> Edit Profile
          </button>
          <button className="flex items-center gap-2 text-green-500 hover:text-green-700" onClick={() => setShowLogoForm(!showLogoForm)}>
            <FiUpload className="text-lg" /> Change Logo
          </button>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700" onClick={() => setShowPasswordForm(!showPasswordForm)}>
            <FiLock className="text-lg" /> Change Password
          </button>
        </div>

        {/* Edit Profile Form */}
        {showEditForm && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Update Account Details</h2>
            <form onSubmit={handleUpdateDetails} className="space-y-2">
              <input type="text" className="border p-2 w-full" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <input type="text" className="border p-2 w-full" placeholder="Company Location" value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)} />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Update</button>
            </form>
          </div>
        )}

        {/* Upload Logo Form */}
        {showLogoForm && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Update Company Logo</h2>
            <form onSubmit={handleLogoUpload} className="space-y-2">
              <input type="file" className="border p-2 w-full" onChange={(e) => setCompanyLogo(e.target.files ? e.target.files[0] : null)} />
              <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full">Upload Logo</button>
            </form>
          </div>
        )}

        {/* Change Password Form */}
        {showPasswordForm && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-2">
              <input type="password" className="border p-2 w-full" placeholder="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <input type="password" className="border p-2 w-full" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button type="submit" className="bg-red-500 text-white p-2 rounded-md w-full">Change Password</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
