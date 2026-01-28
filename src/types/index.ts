export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: "music" | "tech" | "sports" | "arts" | "movies";
  likes?: number;
  price: number;
  availableTickets: number;
  totalTickets: number;
  imageUrl: string;
  venue: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  ticketQuantity: number;
  totalAmount: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
  title?: string;
  date?: string;
  paymentMethod?: string;
  provider?: string;
}

export interface Ticket {
  id: string;
  bookingId: string;
  eventId: string;
  userId: string;
  qrCode: string;
  seat?: string;
  status: "valid" | "used" | "invalid";
  paymentMethod?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  data?: T[];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "premium" | "gold" | "silver";
  price: number;
  status: "available" | "booked" | "selected";
}
