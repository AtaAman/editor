import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useAuthState";

const Profile = () => {
  const navigate = useNavigate();
  const { user, getCurrentUser, isLoggedIn } = useUserStore();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!user) {
      getCurrentUser();
    }
  }, [isLoggedIn, user, getCurrentUser, navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-4 border border-gray-300 rounded-md shadow-md space-y-4">
        {user.companyLogo?.url && (
          <img
            src={user.companyLogo.url}
            alt="Company Logo"
            className="w-24 h-24 rounded-md"
          />
        )}
        <p className="text-gray-600 font-semibold">Email: {user.email}</p>
        <p className="text-gray-600">Company Name: {user.companyName}</p>
        <p className="text-gray-600">Company ID: {user.companyIdentifier}</p>
        <p className="text-gray-600">Location: {user.companyLocation}</p>
        <p className="text-gray-600">Leads Per Month: {user.leadsPerMonth}</p>
        <p className="text-gray-600">Subscription Plan: {user.subscriptionPlan}</p>
        <p className="text-gray-600">
          Subscription Amount: ${user.subscriptionAmountPerMonth} / {user.subscriptionFrequency}
        </p>
        <p className="text-gray-600">
          Subscription Start Date: {new Date(user.subscriptionStartDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Subscription End Date: {new Date(user.subscriptionEndDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Account Created: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
