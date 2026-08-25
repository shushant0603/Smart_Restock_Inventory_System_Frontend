import { request } from "./api";

export const login = (email, password) => {
  return request("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const signup = (name, email, password) => {
  return request("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
};

export const getCurrentUser = () => {
  return request("/api/auth/me");
};
