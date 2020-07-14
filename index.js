require('dotenv').config();
const fs = require('fs-extra'); // for easy dir cp
const config = require('./config');
const addHomepage = require('./addHomepage');
// const addHomepage = require('./addHomepage');

// make public directory
if (!fs.existsSync(config.dev.outDir)) fs.mkdirSync(config.dev.outDir);

// copy static assets to /public
fs.copy(`${config.dev.static}`, `${config.dev.outDir}`);

const dir = './data/creatures';

const init = () => {
  const fileNames = fs.readdirSync(dir);

  const creatures = fileNames.map((fileName) => {
    return JSON.parse(fs.readFileSync(`${dir}/${fileName}`, 'utf8'));
  });

  addHomepage(creatures);
};

init();
