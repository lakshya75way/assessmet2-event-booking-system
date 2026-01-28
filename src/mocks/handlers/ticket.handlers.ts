import { http, HttpResponse, delay } from "msw";
import { TICKETS, BOOKINGS, getRichTicket, MOCK_EVENTS } from "../db";
import { Ticket } from "../../types";

export const ticketHandlers = [
  http.get("/api/tickets/search", async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return new HttpResponse(null, { status: 400 });
    }

    await delay(600);

    const allTickets = Array.from(TICKETS.values());
    const matchedTicket = allTickets.find(
      (t: Ticket) => t.id === query || t.qrCode === query,
    );

    if (!matchedTicket) {
      return new HttpResponse(JSON.stringify({ message: "Ticket not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get group info
    const bookingTickets = allTickets.filter(
      (t: Ticket) => t.bookingId === matchedTicket.bookingId,
    );
    const totalTickets = bookingTickets.length;
    const validTickets = bookingTickets.filter(
      (t: Ticket) => t.status === "valid",
    );
    const remainingCount = validTickets.length;
    const usedCount = totalTickets - remainingCount;

    return HttpResponse.json({
      ticket: getRichTicket(matchedTicket),
      group: {
        total: totalTickets,
        used: usedCount,
        remaining: remainingCount,
      },
    });
  }),
  http.get("/api/admin/analytics", async () => {
    await delay(1200);
    return HttpResponse.json({
      totalRevenue: 2540000,
      totalBookings: 1450,
      activeEvents: 16,
      venueCapacity: 85,
      revenueByMonth: [
        { month: "Jan", value: 400000 },
        { month: "Feb", value: 300000 },
        { month: "Mar", value: 200000 },
        { month: "Apr", value: 278000 },
        { month: "May", value: 189000 },
        { month: "Jun", value: 239000 },
      ],
    });
  }),
  http.get("/api/tickets/:id", async ({ params }) => {
    await delay(600);
    const id = params.id as string;

    let ticket = TICKETS.get(id);

    if (!ticket) {
      const booking = BOOKINGS.get(id);
      if (booking) {
        const tickets = Array.from(TICKETS.values()).filter(
          (t: Ticket) => t.bookingId === id,
        );
        if (tickets.length > 0) {
          const firstTicket = tickets[0];
          const allSeats = tickets.map((t: Ticket) => t.seat).join(", ");

          ticket = {
            ...firstTicket,
            seat: allSeats,
          };
        }
      }
    }

    if (ticket) {
      return HttpResponse.json(getRichTicket(ticket));
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.post("/api/tickets/validate", async ({ request }) => {
    const { ticketId, checkInAll, checkInQuantity } =
      (await request.json()) as {
        ticketId: string;
        checkInAll?: boolean;
        checkInQuantity?: number;
      };
    await delay(800);

    // Find ticket by ID or QR Code
    const allTickets = Array.from(TICKETS.values());
    const matchedTicket = allTickets.find(
      (t: Ticket) => t.id === ticketId || t.qrCode === ticketId,
    );

    if (!matchedTicket) {
      return new HttpResponse(
        JSON.stringify({ message: "Invalid Ticket ID or QR Code" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get all tickets for this booking to handle group check-ins
    const bookingTickets = allTickets.filter(
      (t: Ticket) => t.bookingId === matchedTicket.bookingId,
    );

    const validTickets = bookingTickets.filter(
      (t: Ticket) => t.status === "valid",
    );
    const totalTickets = bookingTickets.length;
    const previouslyUsed = totalTickets - validTickets.length;

    if (validTickets.length > 0) {
      let message = "";
      let ticketsToUse: Ticket[] = [];

      if (checkInAll) {
        ticketsToUse = validTickets;
      } else {
        const quantity = checkInQuantity || 1;
        ticketsToUse = validTickets.slice(0, quantity);
      }

      // Mark tickets as used
      ticketsToUse.forEach((t) => {
        t.status = "used";
        TICKETS.set(t.id, t);
      });

      const newlyUsedCount = ticketsToUse.length;
      const currentUsedTotal = previouslyUsed + newlyUsedCount;

      if (newlyUsedCount > 1) {
        message = `Group Entry Approved (+${newlyUsedCount}) (${currentUsedTotal}/${totalTickets} Total)`;
      } else {
        message = `Entry Approved (${currentUsedTotal}/${totalTickets} Checked In)`;
      }

      const event = MOCK_EVENTS.find((e) => e.id === matchedTicket.eventId);
      const firstTicket = bookingTickets[0]; // Use first ticket for display info

      return HttpResponse.json({
        valid: true,
        message,
        remainingValid: validTickets.length - newlyUsedCount,
        scannedTicket: {
          ...firstTicket,
          event,
          holder: "Guest", // Placeholder
          seat:
            newlyUsedCount > 1
              ? `Group (${newlyUsedCount} Seats)`
              : ticketsToUse[0]?.seat || "General",
        },
      });
    } else {
      return new HttpResponse(
        JSON.stringify({
          message: `Already Used (${totalTickets}/${totalTickets} Checked In)`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
  }),
];
