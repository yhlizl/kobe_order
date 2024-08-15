// pages/sitemap.xml.js
import { GetServerSideProps } from 'next';

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const currentDate = new Date().toISOString();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
            <loc>https://kobe-order.vercel.app/</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>1.00</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/Products</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>0.80</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/About</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>0.80</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/Contact</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>0.80</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/Account</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>0.80</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/Cart</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>0.80</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/Login</loc>
            <lastmod>${currentDate}</lastmod>
            <priority>0.64</priority>
        </url>
    </urlset>
    `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;