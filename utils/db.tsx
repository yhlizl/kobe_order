// db.tsx
import mysql, { PoolOptions } from 'mysql2/promise';
import { Pool as PgPool } from 'pg';


let pool : any;

if (process.env.NODE_ENV === 'production') {
    pool = new PgPool({
        host: process.env.POSTGRES_HOST,
        port: parseInt('5432'),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        ssl: {
          rejectUnauthorized: false
      }
    });
} else {
    pool = new PgPool({
        host: process.env.POSTGRES_HOST,
        port: parseInt('5432'),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
    });
}

export async function initDb() {
    let res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM pg_database WHERE datname = 'verceldb'
      )
    `);
    if (!res.rows[0].exists) {
      await pool.query('CREATE DATABASE verceldb');
    }

    await pool.query('CREATE SCHEMA IF NOT EXISTS verceldb');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS verceldb.users (
        userId SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        phone VARCHAR(255),
        address VARCHAR(255),
        password VARCHAR(255)
      )
    `);
}

export default pool;