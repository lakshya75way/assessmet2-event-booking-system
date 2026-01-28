import { apiClient } from "../api/apiClient";
import { Ticket } from "../../types";

export const ticketService = {
  getTicket: async (id: string): Promise<Ticket> => {
    const response = await apiClient.get(`/tickets/${id}`);
    return response.data;
  },
  searchTicket: async (query: string) => {
    const response = await apiClient.get(
      `/tickets/search?q=${encodeURIComponent(query)}`,
    );
    return response.data;
  },
  validateTicket: async (params: {
    ticketId: string;
    checkInAll?: boolean;
    checkInQuantity?: number;
  }) => {
    const response = await apiClient.post("/tickets/validate", params);
    return response.data;
  },
};
