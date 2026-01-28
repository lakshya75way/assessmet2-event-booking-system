import { Ticket, Booking } from "../types";
import { MOCK_EVENTS as IMPORTED_EVENTS } from "./data/events.data";
import { MOCK_BOOKINGS as IMPORTED_BOOKINGS } from "./data/bookings.data";
import { MOCK_TICKETS as IMPORTED_TICKETS } from "./data/tickets.data";

export const MOCK_EVENTS = IMPORTED_EVENTS;

export const BOOKINGS = new Map<string, Booking>();
export const TICKETS = new Map<string, Ticket>();

if (import.meta.env.DEV) {
  IMPORTED_BOOKINGS.forEach((booking) => {
    BOOKINGS.set(booking.id, booking);
  });

  IMPORTED_TICKETS.forEach((ticket) => {
    TICKETS.set(ticket.id, ticket);
  });
}

export const getRichTicket = (ticket: Ticket) => {
  const event = MOCK_EVENTS.find((e) => e.id === ticket.eventId);
  const booking = BOOKINGS.get(ticket.bookingId);
  return {
    ...ticket,
    event,
    price: event?.price || 0,
    type: "Standard",
    paymentMethod: booking?.provider || "CREDIT CARD",
  };
};
