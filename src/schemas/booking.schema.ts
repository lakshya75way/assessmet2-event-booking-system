import { z } from "zod";

export const bookingSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  userId: z.string().min(1, "User ID is required"),
  ticketQuantity: z
    .number()
    .min(1, "At least 1 ticket required")
    .max(10, "Maximum 10 tickets allowed"),
  totalAmount: z.number().positive("Total amount must be positive"),
  paymentMethod: z.enum(["stripe", "paypal", "upi"]).optional(),
  seats: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
