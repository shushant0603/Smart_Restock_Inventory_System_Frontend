import { request } from "./api";

export const getDashboardStats = () => {
  return request("/api/dashboard/stats");
};
export const getDashboard = () => request("/api/dashboard");