import { Booking } from "../../types";

export const MOCK_BOOKINGS: Booking[] = [];

if (import.meta.env.DEV) {
  const seedBookingId = "BOOKING-TEST-123";
  MOCK_BOOKINGS.push({
    id: seedBookingId,
    eventId: "1",
    userId: "admin-123",
    ticketQuantity: 3,
    totalAmount: 2997,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    title: "Anubhav Singh Bassi - Bas Kar Bassi",
    date: "2026-03-15T19:00:00Z",
  });

  MOCK_BOOKINGS.push({
    id: "BOOKING-TEST-456",
    eventId: "2",
    userId: "admin-123",
    ticketQuantity: 2,
    totalAmount: 700,
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    title: "Border 2",
    date: "2026-01-23T18:00:00Z",
  });

  MOCK_BOOKINGS.push({
    id: "BOOKING-TEST-789",
    eventId: "10",
    userId: "admin-123",
    ticketQuantity: 4,
    totalAmount: 14000,
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    title: "Arijit Singh - Soulful Tour",
    date: "2026-06-12T20:00:00Z",
  });

  MOCK_BOOKINGS.push({
    id: "BOOKING-TEST-101",
    eventId: "3",
    userId: "admin-123",
    ticketQuantity: 1,
    totalAmount: 2500,
    status: "cancelled",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    title: "IPL 2026: CSK vs MI",
    date: "2026-04-10T19:30:00Z",
  });
}
