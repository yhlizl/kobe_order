// db.tsx
import mysql, { PoolOptions } from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
} as PoolOptions);


export async function initDb() {
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
  
export default pool;