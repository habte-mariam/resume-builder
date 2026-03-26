import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// በሁለቱም በኩል እንዲሠራ አማራጭ እንስጠው
const connectionString =
    (typeof (globalThis as any).process !== 'undefined' ? (globalThis as any).process.env.DATABASE_URL : undefined) ||
    (import.meta.env ? import.meta.env.VITE_DATABASE_URL : undefined);

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in your environment variables");
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });