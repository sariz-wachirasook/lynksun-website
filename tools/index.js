const postcss = require('./postcss');
const sitemap = require('./sitemap');
const robot = require('./robot');
require('dotenv').config();

const hostname = process.env.HOSTNAME || 'http://localhost:3000';

postcss.init();
sitemap.init(hostname);
robot.init(hostname);
