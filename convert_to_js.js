const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, 'bible.json');
const jsPath = path.resolve(__dirname, 'bible-content.js');

console.log('Reading JSON...');
const json = fs.readFileSync(jsonPath, 'utf8');
console.log('Writing JS...');
fs.writeFileSync(jsPath, `const BIBLE_FULL_CONTENT = ${json};`, 'utf8');
console.log('Conversion complete: bible-content.js');
