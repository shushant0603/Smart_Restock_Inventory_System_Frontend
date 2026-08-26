import { request } from "./services/api";


export const getProducts = () => request("/api/products");
export const createProduct = (payload) =>
  request("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const getAlerts = () => request("/api/alerts");
export const createAlert = (payload) =>
  request("/api/alerts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const getTransactions = () => request("/api/transactions");
export const createTransaction = (payload) =>
  request("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const getAllData = async () => {
  const [products, alerts, transactions] = await Promise.all([
    getProducts(),
    getAlerts(),
    getTransactions(),
  ]);

  return { products, alerts, transactions };
};

export default {
  getProducts,
  createProduct,
  getAlerts,
  createAlert,
  getTransactions,
  createTransaction,
  getAllData,
};