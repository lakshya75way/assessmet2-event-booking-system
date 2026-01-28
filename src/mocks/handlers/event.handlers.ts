import { http, HttpResponse, delay } from "msw";
import dayjs from "dayjs";
import { MOCK_EVENTS } from "../db";

export const eventHandlers = [
  http.get("/api/events", async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.trim().toLowerCase();
    const category = url.searchParams.get("category")?.trim();
    const location = url.searchParams.get("location")?.trim();
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "8");

    if (import.meta.env.DEV) {
      console.log("MSW GET /events params:", {
        search,
        category,
        location,
        startDate,
        endDate,
      });
    }
    let filtered = [...MOCK_EVENTS];
    if (import.meta.env.DEV) {
      console.log("Initial events count:", filtered.length);
    }

    const isInvalid = (val: string | null | undefined) =>
      !val || val === "null" || val === "undefined" || val === "";

    if (!isInvalid(search)) {
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(search!.toLowerCase()) ||
          e.description.toLowerCase().includes(search!.toLowerCase()),
      );
    }
    if (!isInvalid(category) && category !== "All") {
      filtered = filtered.filter(
        (e) => e.category.toLowerCase() === category!.toLowerCase(),
      );
    }
    if (!isInvalid(location) && location !== "All") {
      filtered = filtered.filter(
        (e) => e.location.toLowerCase() === location!.toLowerCase(),
      );
    }
    if (!isInvalid(startDate) && !isInvalid(endDate)) {
      filtered = filtered.filter(
        (e) =>
          dayjs(e.date).isAfter(dayjs(startDate)) &&
          dayjs(e.date).isBefore(dayjs(endDate)),
      );
    }

    const total = filtered.length;
    const offset = (page - 1) * limit;
    const data = filtered.slice(offset, offset + limit);

    await delay(600);
    return HttpResponse.json({ items: data, total, page, limit });
  }),
  http.get("/api/events/:id", async ({ params }) => {
    const event = MOCK_EVENTS.find((e) => e.id === params.id);
    await delay(400);
    if (event) return HttpResponse.json(event);
    return new HttpResponse(null, { status: 404 });
  }),
];
