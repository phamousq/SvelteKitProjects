import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString: string = process.env.VITE_DATABASE_URL as string;

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

export default db;
