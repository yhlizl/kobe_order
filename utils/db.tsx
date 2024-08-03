// db.tsx
import mysql, { PoolOptions } from 'mysql2/promise';
import { init } from 'next/dist/compiled/webpack/webpack';
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
    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS verceldb.products (
        productId SERIAL PRIMARY KEY,
        name VARCHAR(255),
        price DECIMAL(10, 2),
        description TEXT,
        imageUrl VARCHAR(1000000),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        quantity INT,
        estimatedProductionTime VARCHAR(255),
        isDeleted BOOLEAN DEFAULT FALSE
      )
    `);
      // Create orders table
        await pool.query(`
        CREATE TABLE IF NOT EXISTS verceldb.orders (
          orderId SERIAL PRIMARY KEY,
          userId INT,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          total DECIMAL(10, 2),
          status VARCHAR(255),
          productId INT,
          quantity INT,
          FOREIGN KEY (userId) REFERENCES verceldb.users(userId),
          FOREIGN KEY (productId) REFERENCES verceldb.products(productId)
        )
      `);

}



export async function resetDB() {
  // Drop tables if they exist
  await pool.query('DROP TABLE IF EXISTS verceldb.orders');
  await pool.query('DROP TABLE IF EXISTS verceldb.products');
  await pool.query('DROP TABLE IF EXISTS verceldb.users');
  initDb();
}

export default pool;