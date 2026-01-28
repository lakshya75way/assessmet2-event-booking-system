import { authHandlers } from "./auth.handlers";
import { eventHandlers } from "./event.handlers";
import { bookingHandlers } from "./booking.handlers";
import { ticketHandlers } from "./ticket.handlers";

export const handlers = [
  ...authHandlers,
  ...eventHandlers,
  ...bookingHandlers,
  ...ticketHandlers,
];
