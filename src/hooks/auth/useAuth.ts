import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { storageService } from "../../services/storage/storage.service";
import { User, LoginCredentials, RegisterData } from "../../types";
import { authService } from "../../services/auth/auth.service";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(storageService.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      storageService.setToken(response.token);
      storageService.setUser(response.user);
      setUser(response.user);
      return response.user;
    } catch (err: unknown) {
      let message = "Login failed";
      if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as { message?: string };
        message = data.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      storageService.setToken(response.token);
      storageService.setUser(response.user);
      setUser(response.user);
      return response.user;
    } catch (err: unknown) {
      let message = "Registration failed";
      if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as { message?: string };
        message = data.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    storageService.clearAuth();
    setUser(null);
  }, []);

  return {
    user,
    login,
    register,
    logout,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
};
