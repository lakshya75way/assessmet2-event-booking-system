import { apiClient } from "../api/apiClient";

export const adminService = {
  getAnalytics: async () => {
    const response = await apiClient.get("/admin/analytics");
    return response.data;
  },
};
