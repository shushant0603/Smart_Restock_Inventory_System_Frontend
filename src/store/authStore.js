import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginApi, signup as signupApi, getCurrentUser } from "../services/authService";
import { useDashboardStore } from "./dashboardStore";
import { useInventoryStore } from "./useInventoryStore";
import { useSupplierStore } from "./useSupplierStore";
import { useTransaction } from "./useTransactionStore";
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await loginApi(email, password);
          set({
            user: { _id: data._id, name: data.name, email: data.email, role: data.role },
            token: data.token,
            loading: false,
          });
        } catch (error) {
          set({ error: error.message || "Login failed", loading: false });
          throw error;
        }
      },

      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await signupApi(name, email, password);
          set({
            user: { _id: data._id, name: data.name, email: data.email, role: data.role },
            token: data.token,
            loading: false,
          });
        } catch (error) {
          set({ error: error.message || "Signup failed", loading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
        useDashboardStore.setState({ dashboardStats: null, inventoryStatusTrend: null, activeAlerts: [], recentActivity: [], suggestions: [], products: [] });
        useInventoryStore.setState({ products: [] });
        useSupplierStore.setState({ suppliers: [] });
        useTransaction.setState({ transactions: [] });
      },

      fetchCurrentUser: async () => {
        const token = get().token;
        if (!token) return;

        set({ loading: true, error: null });
        try {
          const user = await getCurrentUser();
          set({ user, loading: false });
        } catch (error) {
          // If token is invalid or expired, log out
          set({ user: null, token: null, error: "Session expired", loading: false });
        }
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({ user: state.user, token: state.token }), // only save user and token
    }
  )
);

export default useAuthStore;