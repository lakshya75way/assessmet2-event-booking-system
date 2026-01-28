import { apiClient } from "../api/apiClient";
import { BookingInput } from "../../schemas/booking.schema";

export const bookingService = {
  createBooking: async (data: BookingInput) => {
    const response = await apiClient.post("/bookings", data);
    return response.data;
  },
  getUserBookings: async (userId: string) => {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data;
  },
};
