import { http, HttpResponse, delay } from "msw";
import { v4 as uuidv4 } from "uuid";
import { BOOKINGS, TICKETS, MOCK_EVENTS } from "../db";
import { Booking, Ticket } from "../../types";

export const bookingHandlers = [
  http.get("/api/bookings/user/:userId", async ({ params }) => {
    await delay(1000);
    const { userId } = params;
    const userBookings = Array.from(BOOKINGS.values())
      .filter((b) => b.userId === userId)
      .sort(
        (a: Booking, b: Booking) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
    return HttpResponse.json(userBookings);
  }),

  http.post("/api/bookings", async ({ request }) => {
    const data = (await request.json()) as Omit<
      Booking,
      "id" | "createdAt" | "status"
    > & {
      seats?: string;
      paymentMethod?: string;
    };
    await delay(1500);

    const event = MOCK_EVENTS.find((e) => e.id === data.eventId);
    if (event && event.availableTickets < data.ticketQuantity) {
      return new HttpResponse(
        JSON.stringify({ message: "Requested quantity exceeds availability." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const bookingId = uuidv4();
    const tickets: Ticket[] = Array.from({ length: data.ticketQuantity }).map(
      (_, index) => ({
        id: uuidv4(),
        bookingId,
        eventId: data.eventId,
        userId: "user-id-placeholder",
        qrCode: "TICKET-" + uuidv4().substring(0, 8),
        status: "valid" as const,
        seat: data.seats ? JSON.parse(data.seats)[index] : `Gen-${index + 1}`,
        price: event?.price || 0,
        type: "Standard",
      }),
    );

    const newBooking = {
      id: bookingId,
      ...data,
      title: event?.title || "Unknown Event",
      status: "confirmed" as const,
      paymentStatus: "paid",
      provider: data.paymentMethod || "stripe",
      date: event?.date,
      quantity: data.ticketQuantity,
      amount: data.totalAmount,
      createdAt: new Date().toISOString(),
    };

    BOOKINGS.set(bookingId, newBooking);
    tickets.forEach((t) => TICKETS.set(t.id, t));

    return HttpResponse.json({
      booking: newBooking,
      tickets: tickets,
      ticket: tickets[0],
    });
  }),
];
