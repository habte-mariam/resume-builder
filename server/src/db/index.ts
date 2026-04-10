import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
import 'dotenv/config';

// በ Backend (Node.js) ላይ DATABASE_URL ን በቀጥታ ከ process.env እናንባለን
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ ERROR: DATABASE_URL አልተገኘም! .env ፋይልህን እይ።");
    throw new Error("DATABASE_URL is not defined");
}

// ለ Neon Database (PostgreSQL) ግንኙነት ማረጋገጫ
const client = postgres(connectionString, { ssl: 'require' });
export const db = drizzle(client, { schema });