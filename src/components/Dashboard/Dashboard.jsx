import { useEffect, useState } from "react";
import useUserStore from "../../store/useAuthState";
import useSubscriptionStore from "../../store/useSubscriptionState";

const Dashboard = () => {
  const { user, getCurrentUser } = useUserStore();
  const { subscription, fetchSubscription, upgradeSubscription } =
    useSubscriptionStore();

  const [isLoading, setIsLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      await getCurrentUser();
      setIsLoading(false);
    };
    fetchUserData();
  }, [getCurrentUser]);

  useEffect(() => {
    if (user) {
      fetchSubscription(user._id);
    }
  }, [user, fetchSubscription]);

  const handleUpgrade = async () => {
    if (!user) return;
    setUpgrading(true);
    await upgradeSubscription(user._id, "Premium");
    setUpgrading(false);
  };

  return (
    <div className="w-full bg-slate-100 rounded-xl min-h-screen flex flex-col lg:flex-row items-start justify-start gap-6 p-4 md:p-6">
      {/* Header Card */}
      <div className="w-full lg:w-1/2">
        <div className="bg-gradient-to-r from-[#219ebc] to-base text-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          {/* Left Side - Company Details */}
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              {user.companyLogo?.url && (
                <img
                  src={user.companyLogo.url}
                  className="h-10 w-10 rounded-md"
                  alt="User Logo"
                />
              )}
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold">Welcome Back</h1>
              <p className="text-base md:text-lg font-bold">
                {user?.companyName || "David"}
              </p>
            </div>
          </div>

          <img
            src="/dash.png"
            alt="Dashboard"
            className="w-28 md:w-32 h-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full py-4">
          <div className="w-full bg-primary/80 text-white rounded-2xl flex flex-col items-center justify-center h-32 md:h-40 p-5">
            <p className="text-sm text-white/70">Credit Points</p>
            <p className="text-2xl md:text-3xl font-bold">
              {subscription?.credits ?? "N/A"}
            </p>
          </div>
          <div className="w-full bg-secondary/80 text-white rounded-2xl flex flex-col items-center justify-center h-32 md:h-40 p-5">
            <p className="text-sm text-white/70">Total leads</p>
            <p className="text-2xl md:text-3xl font-bold">12</p>
          </div>
        </div>
      </div>

      {/* Subscription Details Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full lg:w-1/2 flex flex-col justify-center min-h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Subscription
        </h2>

        {subscription ? (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-medium text-gray-700">
              {subscription?.planName || "Basic"} Plan
            </p>
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-500 text-sm">Ends on</span>
              <span className="text-gray-900 font-semibold">
                {subscription?.endDate
                  ? new Date(subscription.endDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            {/* Upgrade Button */}
            {subscription?.planName === "Basic" && (
              <button
                className="mt-5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
                onClick={handleUpgrade}
                disabled={upgrading}
              >
                {upgrading ? "Upgrading..." : "Upgrade to Premium"}
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Loading subscription details...
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
