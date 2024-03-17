import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    user: process.env.POSTGRES_DB_USER as string || 'postgres',
    host: process.env.POSTGRES_DB_HOST as string || 'db',
    database: process.env.POSTGRES_DB as string || 'newsportaldb',
    password: process.env.POSTGRES_DB_PASSWORD as string || 'root',
    port: process.env.POSTGRES_DB_PORT as unknown as number || 5432, 
});

export default pool;