import { http, HttpResponse, delay } from "msw";
import { v4 as uuidv4 } from "uuid";

export const authHandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    await delay(800);
    if (
      (email === "admin@example.com" || email === "user@example.com") &&
      password === "password123"
    ) {
      const isAdmin = email.includes("admin");
      return HttpResponse.json({
        user: {
          id: isAdmin ? "admin-123" : "user-123",
          email,
          name: email.split("@")[0],
          role: isAdmin ? "admin" : "user",
        },
        token: "token-" + uuidv4(),
        refreshToken: "refresh-" + uuidv4(),
      });
    }
    return new HttpResponse(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401 },
    );
  }),
  http.post("/api/auth/register", async ({ request }) => {
    const { name, email } = (await request.json()) as {
      name: string;
      email: string;
    };
    await delay(1000);
    return HttpResponse.json(
      {
        user: { id: uuidv4(), email, name, role: "user" },
        token: "token-" + uuidv4(),
        refreshToken: "refresh-" + uuidv4(),
      },
      { status: 201 },
    );
  }),
];
