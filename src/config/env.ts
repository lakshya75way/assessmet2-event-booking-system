import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["development", "production", "test"]),
  VITE_API_URL: z.string().optional().default("/api"),
});

const envParsed = envSchema.parse({
  MODE: import.meta.env.MODE,
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

export const env = envParsed;
