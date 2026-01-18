const fs = require('fs');
const path = require('path');

const biblePath = path.resolve(__dirname, 'bible.json');
const bible = JSON.parse(fs.readFileSync(biblePath, 'utf8'));

const structure = bible.map((b, index) => ({
    id: index + 1,
    name: b.name,
    chapters: b.chapters.length
}));

console.log('CONST BIBLE_STRUCTURE = ' + JSON.stringify(structure, null, 4));
