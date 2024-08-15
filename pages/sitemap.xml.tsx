// pages/api/sitemap.xml.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap());
  res.end();
};

const createSitemap = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://kobe-order.vercel.app/</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://kobe-order.vercel.app/Products</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
    </urlset>
    `;
};