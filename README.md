## ✨ Key Features

- **Browse Events** - Search and filter 30+ events by category, location, and date
- **User Authentication** - Secure login/register with JWT tokens
- **Seat Selection** - Interactive seat map with Premium, Gold, and Silver tiers
- **Book Tickets** - Select show timings and complete payment
- **QR Code Tickets** - Each ticket gets a unique QR code
- **Ticket Validation** - Scan QR codes via camera or manual entry
- **Group Bookings** - Book up to 10 tickets at once
- **Email/SMS Notifications** - Get booking confirmations instantly
- **Admin Dashboard** - Manage and validate all bookings

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**User Login:**

- Email: `user@example.com`
- Password: `password123`

**Admin Login:**

- Email: `admin@example.com`
- Password: `password123`

## 📁 Project Structure

```
assessment2/
├── public/
│   └── mockServiceWorker.js
├── src/
│   ├── app/                    # App setup & providers
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── providers.tsx
│   │   └── queryClient.ts
│   ├── components/             # React components
│   │   ├── common/            # Shared components
│   │   ├── domain/            # Feature-specific components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Base UI components
│   ├── config/                # App configuration
│   │   ├── constants.ts
│   │   └── env.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── events/
│   │   └── tickets/
│   ├── mocks/                 # MSW mock server
│   │   ├── handlers/
│   │   ├── db.ts
│   │   └── browser.ts
│   ├── pages/                 # Route pages
│   │   ├── auth/
│   │   ├── events/
│   │   ├── tickets/
│   │   └── admin/
│   ├── router/                # React Router setup
│   ├── schemas/               # Zod validation schemas
│   ├── services/              # API & business logic
│   │   ├── api/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── event/
│   │   ├── notification/
│   │   ├── storage/
│   │   └── ticket/
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript types
├── .env.example
├── package.json
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Mock Service Worker (for development)
VITE_ENABLE_MSW=true

# App Configuration
VITE_APP_NAME=EventBook
VITE_APP_VERSION=1.0.0
```

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **React Router v7** - Routing
- **TanStack Query v5** - Data fetching
- **Ant Design** - UI components
- **MSW** - API mocking
- **Zod** - Schema validation
- **Axios** - HTTP client

---

for video go to this link : "https://drive.google.com/file/d/1B2AdyR08zWHMWwIr_VMIJTeLpN-_xnE3/view?usp=drive_link"
