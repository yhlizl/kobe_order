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
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    } as PoolOptions);
}

export async function initDb() {
  if (process.env.NODE_ENV === 'production') {
    let res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM pg_database WHERE datname = 'kobe_order'
      )
    `);
    if (!res.rows[0].exists) {
      await pool.query('CREATE DATABASE kobe_order');
    }

    await pool.query('CREATE SCHEMA IF NOT EXISTS kobe_order');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS kobe_order.users (
        userId SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        phone VARCHAR(255),
        address VARCHAR(255),
        password VARCHAR(255)
      )
    `);
  } else {
    await pool.query('CREATE DATABASE IF NOT EXISTS kobe_order');
    await pool.query('USE kobe_order');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        phone VARCHAR(255),
        address VARCHAR(255),
        password VARCHAR(255)
      )
    `);
  }
}

export default pool;