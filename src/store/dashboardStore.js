import { create } from "zustand";
import { getDashboard } from "../services/dashboardService";

export const useDashboardStore = create((set, get) => ({
	dashboardStats: null,
	inventoryStatusTrend: null, // this will now hold { overall, products: {} }
	activeAlerts: [],
	recentActivity: [],
	suggestions: [],
	products: [],

	loading: false,
	error: null,

	fetchDashboard: async (force = false) => {
		if (!force && get().dashboardStats) return;
		try {
			set({
				loading: true,
				error: null,
			});

			const data = await getDashboard();

			set({
				dashboardStats: data.stats,
				inventoryStatusTrend: data.trend,
				activeAlerts: data.alerts ?? [],
				recentActivity: data.recentActivity ?? [],
				suggestions: data.suggestions ?? [],
				products: data.products ?? [],
				loading: false,
			});
		} catch (error) {
			console.error("Dashboard fetch error:", error);

			set({
				dashboardStats: null,
				inventoryStatusTrend: null,
				activeAlerts: [],
				recentActivity: [],
				error: error.message || "Failed to load dashboard",
				loading: false,
			});
		}
	},

	addAlert: (newAlert) => set((state) => {
		// Prevent duplicates based on productId if it's the same type of alert
		const exists = state.activeAlerts.find(a => a.productId === newAlert.productId && a.status === 'ACTIVE');
		if (exists) {
			return {
				activeAlerts: state.activeAlerts.map(a => 
					a.id === exists.id ? { ...a, currentStock: newAlert.currentStock, message: newAlert.message } : a
				)
			};
		}
		
		return {
			activeAlerts: [newAlert, ...state.activeAlerts]
		};
	}),

	resolveAlert: (alertId) => set((state) => ({
		activeAlerts: state.activeAlerts.filter(a => a.id !== alertId)
	})),
}));