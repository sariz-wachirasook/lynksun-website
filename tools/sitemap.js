const fs = require('fs');
const minifyXML = require('minify-xml').minify;

const init = (hostname) => {
  const urls = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/login', changefreq: 'monthly', priority: 0.8 },
    { url: '/register', changefreq: 'monthly', priority: 0.8 },
    { url: '/forgot-password', changefreq: 'monthly', priority: 0.8 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${hostname}${url.url}</loc>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>
    `,
      )
      .join('')}
  </urlset>`;

  fs.writeFileSync('public/sitemap.xml', minifyXML(xml), 'utf8');
};

module.exports = {
  init,
};
