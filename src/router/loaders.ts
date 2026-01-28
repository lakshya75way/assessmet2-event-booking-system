import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { eventService } from "../services/event/event.service";
import { ticketService } from "../services/ticket/ticket.service";
import { bookingService } from "../services/booking/booking.service";
import { adminService } from "../services/admin/admin.service";
import { storageService } from "../services/storage/storage.service";
import {
  PaginatedResponse,
  Event as IEvent,
  Ticket as ITicket,
} from "../types";
import { z } from "zod";

const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  category: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  venue: z.string().optional(),
  likes: z.number().optional(),
  availableTickets: z.number().optional(),
  totalTickets: z.number().optional(),
});

const ticketSchema = z.object({
  id: z.string(),
  qrCode: z.string(),
  status: z.string(),
  event: z
    .object({
      title: z.string(),
      date: z.string(),
      location: z.string(),
      imageUrl: z.string(),
    })
    .optional(),
  seat: z.string().optional(),
  type: z.string().optional(),
  price: z.number().optional(),
});

export const eventsListLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);

  const fetchData = async (
    isRetry = false,
  ): Promise<PaginatedResponse<IEvent>> => {
    try {
      const result = await eventService.getEvents(params);

      if (
        typeof result === "string" &&
        (result as unknown as string).includes("<!doctype html>")
      ) {
        if (!isRetry) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return fetchData(true);
        }
        throw new Error("API returned HTML instead of JSON (MSW issue)");
      }

      const rawItems = Array.isArray(result)
        ? result
        : result?.items || result?.data || [];

      if (!Array.isArray(rawItems)) {
        throw new Error("Invalid events data structure");
      }

      const validatedItems = z.array(eventSchema).parse(rawItems) as IEvent[];

      return {
        items: validatedItems,
        total: result?.total ?? validatedItems.length,
        page: Number(result?.page || params.page || 1),
        limit: Number(result?.limit || 10),
      };
    } catch (error) {
      if (!isRetry) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return fetchData(true);
      }
      throw error;
    }
  };

  return fetchData();
};

export const eventDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.eventId) throw new Error("Event ID is required");
  const fetchData = async (isRetry = false): Promise<IEvent> => {
    try {
      const event = await eventService.getEvent(params.eventId!);
      if (
        typeof event === "string" &&
        (event as unknown as string).includes("<!doctype html>")
      )
        throw new Error("HTML");
      return eventSchema.parse(event) as IEvent;
    } catch (e) {
      if (!isRetry) {
        await new Promise((r) => setTimeout(r, 500));
        return fetchData(true);
      }
      throw e;
    }
  };
  return fetchData();
};

export const bookingLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.eventId) throw new Error("Event ID is required");
  const fetchData = async (isRetry = false): Promise<IEvent> => {
    try {
      const event = await eventService.getEvent(params.eventId!);
      if (
        typeof event === "string" &&
        (event as unknown as string).includes("<!doctype html>")
      )
        throw new Error("HTML");
      return eventSchema.parse(event) as IEvent;
    } catch (e) {
      if (!isRetry) {
        await new Promise((r) => setTimeout(r, 500));
        return fetchData(true);
      }
      throw e;
    }
  };
  return fetchData();
};

export const ticketLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.ticketId) throw new Error("Ticket ID is required");
  const fetchData = async (isRetry = false): Promise<ITicket> => {
    try {
      const ticket = await ticketService.getTicket(params.ticketId!);
      if (
        typeof ticket === "string" &&
        (ticket as unknown as string).includes("<!doctype html>")
      )
        throw new Error("HTML");
      // Cast because zod schema might miss some optional fields from ITicket extension
      return ticketSchema.parse(ticket) as unknown as ITicket;
    } catch (e) {
      if (!isRetry) {
        await new Promise((r) => setTimeout(r, 500));
        return fetchData(true);
      }
      throw e;
    }
  };
  return fetchData();
};

export const bookingHistoryLoader = async () => {
  const user = storageService.getUser();
  if (!user) return redirect("/login");
  return bookingService.getUserBookings(user.id);
};

export const adminAnalyticsLoader = async () => {
  const user = storageService.getUser();
  if (!user || user.role !== "admin") return redirect("/unauthorized");
  return adminService.getAnalytics();
};
