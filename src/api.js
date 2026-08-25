const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = contentType.includes("application/json") ? await res.json() : await res.text();
    throw new Error((text && text.message) || JSON.stringify(text));
  }
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

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