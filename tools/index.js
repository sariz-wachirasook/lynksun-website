const postcss = require('./postcss');
const sitemap = require('./sitemap');
const robot = require('./robot');

const hostname = 'https://www.example.com';

postcss.init();
sitemap.init(hostname);
robot.init(hostname);
