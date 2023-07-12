const fs = require('fs');

const init = async (hostname) => {
  // create robots.txt
  const robots = `User-agent: *\nsitemap: ${hostname}/sitemap.xml\nDisallow: /`;

  fs.writeFileSync('public/robots.txt', robots, 'utf8');
};

module.exports = {
  init,
};
