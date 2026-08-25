import { request } from "./api";

export const getProducts = () => {
  return request("/api/products");
};

export const createProduct = (payload) => {
  return request("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

// GET    /api/products
// GET    /api/products/:id
// POST   /api/products
// PUT    /api/products/:id
// DELETE /api/products/:id
// PATCH  /api/products/:id/stock

// export const getProducts = () => {
//   return request("/api/products");
// };

// export const getProductById = (id) => {
//   return request(`/api/products/${id}`);
// };

// export const createProduct = (payload) => {
//   return request("/api/products", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
// };

// export const updateProduct = (id, payload) => {
//   return request(`/api/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
// };

// export const deleteProduct = (id) => {
//   return request(`/api/products/${id}`, {
//     method: "DELETE",
//   });
// };

// export const updateProductStock = (id, payload) => {
//   return request(`/api/products/${id}/stock`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
// };