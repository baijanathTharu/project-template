import { Database } from './types'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env['DB_NAME'],
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    port: Number(process.env['DB_PORT']),
    password: process.env['DB_PASSWORD'],
    max: 10,
  }),
});

console.log('envs', {
  DB_NAME: process.env['DB_NAME'],
  DB_HOST: process.env['DB_HOST'],
  DB_USER: process.env['DB_USER'],
  DB_PORT: process.env['DB_PORT'],
  DB_PASSWORD: process.env['DB_PASSWORD'],
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
