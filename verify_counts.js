const fs = require('fs');

try {
    let content = fs.readFileSync('bible-content.js', 'utf8');
    // Remove "const BIBLE_FULL_CONTENT = " and trailing ";"
    content = content.replace('const BIBLE_FULL_CONTENT = ', '').trim();
    if (content.endsWith(';')) content = content.slice(0, -1);

    const data = JSON.parse(content);

    console.log("Total Books:", data.length);

    // Check last few books
    // Assuming standard 66 + 7 = 73 books?
    // Arrays are 0-indexed.
    // 0-38 = OT Standard (39)
    // 39-65 = NT Standard (27) -> Index 65 is Revelation
    // 66+ = Deuterocanonical

    for (let i = 60; i < data.length; i++) {
        const book = data[i];
        console.log(`Index ${i}: ${book.name} - Chapters: ${book.chapters.length}`);
    }

} catch (e) {
    console.error(e);
}
