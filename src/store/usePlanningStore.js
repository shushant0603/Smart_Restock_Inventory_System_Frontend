import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const usePlanningStore = create((set, get) => ({
	requests: [],
	loading: false,
	error: null,

	fetchRequests: async (force = false) => {
		// If not forcing and we already have requests loaded, skip fetch to prevent unnecessary reloads
		if (!force && get().requests.length > 0) return;

		set({ loading: true, error: null });
		try {
			const res = await axios.get(`${API_URL}/planning`);
			set({ requests: res.data, loading: false });
		} catch (err) {
			console.error("Failed to fetch planning requests:", err);
			set({ error: err.message, loading: false });
		}
	},

	acceptRequest: async (id) => {
		try {
			// Optimistic update
			set((state) => ({
				requests: state.requests.map((req) =>
					req.id === id ? { ...req, status: "Accepted" } : req
				),
			}));
			
			await axios.patch(`${API_URL}/planning/${id}/status`, {
				status: "Accepted"
			});
			
			// Optional: refresh from backend
			// get().fetchRequests();
		} catch (error) {
			console.error("Failed to accept request:", error);
			// Revert optimistic update (simplified)
			get().fetchRequests(true);
		}
	},

	rejectRequest: async (id, reason) => {
		try {
			// Optimistic update
			set((state) => ({
				requests: state.requests.map((req) =>
					req.id === id ? { ...req, status: "Unable to Fulfill", reason } : req
				),
			}));
			
			await axios.patch(`${API_URL}/planning/${id}/status`, {
				status: "Unable to Fulfill",
				reason
			});
		} catch (error) {
			console.error("Failed to reject request:", error);
			get().fetchRequests(true);
		}
	},
}));
