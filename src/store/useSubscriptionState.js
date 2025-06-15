import { create } from "zustand";
import axios from "axios";
import useAuthState from "./useAuthState"; // Import authentication store

const useSubscriptionStore = create((set, get) => {
  return {
    subscription: null,
    loading: false,
    error: null,

    fetchSubscription: async (userId) => {
      set({ loading: true, error: null });
      try {
        const { accessToken } = useAuthState.getState(); // Get token from auth store
        const response = await axios.get(`http://localhost:8000/api/v1/subscriptions/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        set({ subscription: response.data.data, loading: false });
      } catch (error) {
        console.error("Error fetching subscription:", error);
        set({ error: "Failed to fetch subscription", loading: false });
      }
    },

    upgradeSubscription: async (userId, planName) => {
      set({ loading: true, error: null });
      try {
        const { accessToken } = useAuthState.getState(); // Get token from auth store
        const response = await axios.post(
          "http://localhost:8000/api/v1/subscriptions/upgrade",
          { userId, planName },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        set({ subscription: response.data.data, loading: false });
      } catch (error) {
        console.error("Subscription upgrade error:", error);
        set({ error: "Failed to upgrade subscription", loading: false });
      }
    },

    refreshSubscription: async () => {
      const { user } = useAuthState.getState(); // Get user from auth store
      if (user && user._id) {
        await get().fetchSubscription(user._id);
      }
    },
  };
});

export default useSubscriptionStore;
