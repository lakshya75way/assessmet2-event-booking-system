import { ActionFunctionArgs, redirect } from "react-router-dom";
import { bookingService } from "../services/booking/booking.service";
import { authService } from "../services/auth/auth.service";
import { bookingSchema } from "../schemas/booking.schema";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { notificationService } from "../services/notification/notification.service";
import { storageService } from "../services/storage/storage.service";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const validatedData = loginSchema.parse(data);
    const response = await authService.login(validatedData);

    storageService.setToken(response.token);
    storageService.setRefreshToken(response.refreshToken);
    storageService.setUser(response.user);

    notificationService.success(`Welcome back, ${response.user.name}!`);

    if (response.user.role === "admin") {
      return redirect("/admin/dashboard");
    }
    return redirect("/");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    notificationService.error(message);
    return { error: message };
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const validatedData = registerSchema.parse(data);
    const response = await authService.register(validatedData);

    storageService.setToken(response.token);
    storageService.setRefreshToken(response.refreshToken);
    storageService.setUser(response.user);

    notificationService.success("Account created successfully!");
    return redirect("/");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    notificationService.error(message);
    return { error: message };
  }
};

export const bookEventAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  const user = storageService.getUser();

  if (!user) return redirect("/login");

  try {
    const payload = bookingSchema.parse({
      eventId: rawData.eventId,
      userId: user.id,
      ticketQuantity: Number(rawData.ticketQuantity),
      totalAmount: Number(rawData.totalAmount),
      paymentMethod: rawData.paymentMethod,
      seats: rawData.seats,
    });

    const response = await bookingService.createBooking(payload);
    notificationService.success(
      `Booking of ${Number(rawData.ticketQuantity)} tickets confirmed!`,
    );

    notificationService.simulateEmail(
      user.email,
      "Ticket Confirmation - " + response.booking.id,
      `Your booking for event ${rawData.eventId} is successful. Ticket ID: ${response.ticket.id}`,
    );

    return redirect("/my-bookings");
  } catch (error: unknown) {
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ||
      (error instanceof Error ? error.message : "Booking failed");
    notificationService.error(message);
    return { error: message };
  }
};
