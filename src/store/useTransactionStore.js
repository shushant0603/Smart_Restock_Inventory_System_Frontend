import { create } from "zustand";
import { getTransactions } from "../services/transactionService";

export const useTransaction = create((set) => ({
	transactions: [],
	loading: false,
	error: null,

	fetchTransactions: async () => {
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