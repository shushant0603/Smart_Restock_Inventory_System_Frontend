import { request } from "./api";

export const getTransactions = async () => {
	return request("/api/transactions");
};