import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { requireAuth, requireGuest } from "./guards";
import {
  eventsListLoader,
  eventDetailsLoader,
  bookingLoader,
  ticketLoader,
  bookingHistoryLoader,
  adminAnalyticsLoader,
} from "./loaders";
import { loginAction, registerAction, bookEventAction } from "./actions";
import { RouteError } from "./errorElements";
import { AppLayout } from "../components/layout/AppLayout";
import { LoadingSkeleton } from "../components/common/LoadingSkeleton";

const LoginPage = lazy(() =>
  import("../pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("../pages/auth/RegisterPage").then((m) => ({
    default: m.RegisterPage,
  })),
);
const EventsListPage = lazy(() =>
  import("../pages/events/EventsListPage").then((m) => ({
    default: m.EventsListPage,
  })),
);
const EventDetailsPage = lazy(() =>
  import("../pages/events/EventDetailsPage").then((m) => ({
    default: m.EventDetailsPage,
  })),
);
const EventBookingPage = lazy(() =>
  import("../pages/events/EventBookingPage").then((m) => ({
    default: m.EventBookingPage,
  })),
);
const TicketPage = lazy(() =>
  import("../pages/tickets/TicketPage").then((m) => ({
    default: m.TicketPage,
  })),
);
const TicketScannerPage = lazy(() =>
  import("../pages/admin/TicketScannerPage").then((m) => ({
    default: m.TicketScannerPage,
  })),
);
const BookingHistoryPage = lazy(() =>
  import("../pages/bookings/BookingHistoryPage").then((m) => ({
    default: m.BookingHistoryPage,
  })),
);
const AdminDashboardPage = lazy(() =>
  import("../pages/admin/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const UnauthorizedPage = lazy(() =>
  import("../pages/UnauthorizedPage").then((m) => ({
    default: m.UnauthorizedPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

const Suspensed = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSkeleton />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: Suspensed(LoginPage),
    loader: requireGuest,
    action: loginAction,
  },
  {
    path: "/register",
    element: Suspensed(RegisterPage),
    loader: requireGuest,
    action: registerAction,
  },

  {
    path: "/",
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: Suspensed(EventsListPage),
        loader: eventsListLoader,
      },

      {
        path: "events",
        children: [
          {
            index: true,
            element: Suspensed(EventsListPage),
            loader: eventsListLoader,
          },
          {
            path: "book/:eventId",
            element: Suspensed(EventBookingPage),
            loader: (args) => requireAuth() || bookingLoader(args),
            action: bookEventAction,
          },
          {
            path: ":eventId",
            element: Suspensed(EventDetailsPage),
            loader: eventDetailsLoader,
          },
        ],
      },
      {
        path: "tickets/:ticketId",
        element: Suspensed(TicketPage),
        loader: (args) => requireAuth() || ticketLoader(args),
      },
      {
        path: "my-bookings",
        element: Suspensed(BookingHistoryPage),
        loader: bookingHistoryLoader,
      },
      {
        path: "admin/dashboard",
        element: Suspensed(AdminDashboardPage),
        loader: adminAnalyticsLoader,
      },
      {
        path: "admin/scanner",
        element: Suspensed(TicketScannerPage),
        loader: adminAnalyticsLoader,
      },
      {
        path: "unauthorized",
        element: Suspensed(UnauthorizedPage),
      },
      {
        path: "*",
        element: Suspensed(NotFoundPage),
      },
    ],
  },
];
