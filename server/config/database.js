import pg from "pg";

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,

  // Encrypt the connection and verify the server certificate.
  ssl: {
    rejectUnauthorized: true,
  },

  // Avoid waiting indefinitely for a database connection.
  connectionTimeoutMillis: 10000,
};

export const pool = new pg.Pool(config);
