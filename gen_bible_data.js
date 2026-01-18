const fs = require('fs');
const path = require('path');

const biblePath = path.resolve(__dirname, 'bible.json');
const bible = JSON.parse(fs.readFileSync(biblePath, 'utf8'));

// Find split point (Matthew)
const matthewIndex = bible.findIndex(b => b.name.includes('متى') || b.name.includes('Matthew'));
console.log('Matthew found at index:', matthewIndex);

const books = bible.map((b, index) => ({
    id: index + 1,
    name: b.name,
    chapters: b.chapters.length,
    isOt: index < matthewIndex
}));

const fileContent = `
const BIBLE_BOOKS = ${JSON.stringify(books, null, 4)};

// Helper to flatten chapters
function flattenChapters(books) {
    const chapters = [];
    books.forEach(b => {
        for (let c = 1; c <= b.chapters; c++) {
            chapters.push({
                bookId: b.id,
                bookName: b.name,
                chapter: c
            });
        }
    });
    return chapters;
}

const OT_BOOKS = BIBLE_BOOKS.filter(b => b.isOt);
const NT_BOOKS = BIBLE_BOOKS.filter(b => !b.isOt);

const OT_CHAPTERS = flattenChapters(OT_BOOKS);
const NT_CHAPTERS = flattenChapters(NT_BOOKS);
const ALL_CHAPTERS = flattenChapters(BIBLE_BOOKS);

// Stats
console.log('OT Chapters:', OT_CHAPTERS.length);
console.log('NT Chapters:', NT_CHAPTERS.length);
console.log('Total:', ALL_CHAPTERS.length);
`;

const outputPath = path.resolve(__dirname, 'bible-data.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('Generated bible-data.js with', books.length, 'books.');
