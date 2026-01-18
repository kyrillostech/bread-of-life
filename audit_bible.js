const fs = require('fs');

try {
    let content = fs.readFileSync('bible-content.js', 'utf8');
    content = content.replace('const BIBLE_FULL_CONTENT = ', '').trim();
    if (content.endsWith(';')) content = content.slice(0, -1);

    const data = JSON.parse(content);

    console.log("--- auditing last books ---");
    for (let i = 60; i < data.length; i++) {
        const book = data[i];

        console.log(`\nIndex ${i} | Name: ${book.name} | Chapters: ${book.chapters.length}`);
        if (book.chapters.length > 0 && book.chapters[0].length > 0) {
            console.log(`   Sample: ${book.chapters[0][0].substring(0, 100)}...`);
        }
    }
} catch (e) {
    console.error(e);
}
