import { apiClient } from "../api/apiClient";
import { Event, PaginatedResponse } from "../../types";

export const eventService = {
  getEvents: async (
    params?: Record<string, string | number>,
  ): Promise<PaginatedResponse<Event>> => {
    const response = await apiClient.get("/events", { params });
    return response.data;
  },
  getEvent: async (id: string): Promise<Event> => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  },
};
