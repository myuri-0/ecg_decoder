import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        connectionString: "postgres://postgres:161190@localhost:5432/ecg_card",
    }),
});