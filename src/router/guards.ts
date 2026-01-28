import { redirect } from "react-router-dom";
import { storageService } from "../services/storage/storage.service";

export const requireAuth = () => {
  const user = storageService.getUser();
  if (!user) {
    return redirect("/login");
  }
  return null;
};

export const requireGuest = () => {
  const token = storageService.getToken();
  if (token) {
    return redirect("/");
  }
  return null;
};

export const requireAdmin = () => {
  const user = storageService.getUser();
  if (!user) {
    return redirect("/login");
  }
  if (user.role !== "admin") {
    return redirect("/unauthorized");
  }
  return null;
};
