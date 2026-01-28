import { apiClient } from "../api/apiClient";
import { LoginInput, RegisterInput } from "../../schemas/auth.schema";
import { AuthResponse } from "../../types";

export const authService = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },
  refresh: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    return response.data;
  },
};
