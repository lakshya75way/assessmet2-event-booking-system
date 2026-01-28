import { Ticket } from "../../types";

export const MOCK_TICKETS: Ticket[] = [];

if (import.meta.env.DEV) {
  const seedBookingId = "BOOKING-TEST-123";
  const ticketIds = ["TICKET-1", "TICKET-2", "TICKET-3"];

  ticketIds.forEach((id, index) => {
    MOCK_TICKETS.push({
      id: id,
      bookingId: seedBookingId,
      eventId: "1",
      userId: "admin-123",
      qrCode: `QR-${id}`,
      status: index === 0 ? "used" : "valid",
      seat: `Row A - ${index + 1}`,
    });
  });

  const tickets456 = ["TICKET-4", "TICKET-5"];
  tickets456.forEach((id, index) => {
    MOCK_TICKETS.push({
      id: id,
      bookingId: "BOOKING-TEST-456",
      eventId: "2",
      userId: "admin-123",
      qrCode: `QR-${id}`,
      status: "valid",
      seat: `Row F - ${index + 12}`,
    });
  });

  const tickets789 = ["TICKET-6", "TICKET-7", "TICKET-8", "TICKET-9"];
  tickets789.forEach((id, index) => {
    MOCK_TICKETS.push({
      id: id,
      bookingId: "BOOKING-TEST-789",
      eventId: "10",
      userId: "admin-123",
      qrCode: `QR-${id}`,
      status: "valid",
      seat: `VIP - ${index + 1}`,
    });
  });

  MOCK_TICKETS.push({
    id: "TICKET-10",
    bookingId: "BOOKING-TEST-101",
    eventId: "3",
    userId: "admin-123",
    qrCode: `QR-TICKET-10`,
    status: "invalid",
    seat: `Stand C - 45`,
  });
}
