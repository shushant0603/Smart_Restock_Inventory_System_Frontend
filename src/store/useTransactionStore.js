import { create } from "zustand";
import { getTransactions } from "../services/transactionService";

export const useTransaction = create((set, get) => ({
	transactions: [],
	loading: false,
	error: null,

	fetchTransactions: async (force = false) => {
		if (!force && get().transactions.length > 0) return;
		try {
			set({
				loading: true,
				error: null,
			});

			const data = await getTransactions();

			set({
				transactions: data,
				loading: false,
			});
		} catch (error) {
			set({
				transactions: [],
				loading: false,
				error:
					error.message ||
					"Failed to load transactions",
			});
		}
	},
}));