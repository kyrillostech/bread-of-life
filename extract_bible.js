const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../katameros-api/Core/KatamerosDatabase.db');
const outputPath = path.resolve(__dirname, 'bible.json');

console.log('Opening DB at:', dbPath);
const db = new Database(dbPath, { readonly: true });

const ARABIC_BIBLE_ID = 11;
const ARABIC_LANG_ID = 3;

try {
    // Inspect BooksTranslations columns once
    try {
        const sampleTrans = db.prepare("SELECT * FROM BooksTranslations LIMIT 1").get();
        console.log('BooksTranslations Sample:', sampleTrans);
    } catch (e) {
        console.log("Error checking BooksTranslations:", e.message);
    }

    console.log('Fetching books...');
    const books = db.prepare("SELECT Id FROM Books ORDER BY Id").all();

    const bibleData = [];

    for (const book of books) {
        // Get Arabic Name
        // BooksTranslations has Text column
        let translation = null;
        try {
            translation = db.prepare("SELECT Text FROM BooksTranslations WHERE BookId = ? AND LanguageId = ?")
                .get(book.Id, ARABIC_LANG_ID);
        } catch (e) {
            console.log("Error getting translation:", e.message);
        }

        let bookName = translation ? translation.Text : null;

        if (!bookName) {
            const defaultBook = db.prepare("SELECT Name FROM Books WHERE Id = ?").get(book.Id);
            bookName = defaultBook.Name;
        }

        console.log(`Processing Book ${book.Id}: ${bookName}`);

        // Get Verses
        const verses = db.prepare("SELECT Chapter, Number, Text FROM Verses WHERE BibleId = ? AND BookId = ? ORDER BY Chapter, Number")
            .all(ARABIC_BIBLE_ID, book.Id);

        if (verses.length === 0) {
            console.warn(`No verses found for book ${bookName} (ID: ${book.Id}) in Bible ${ARABIC_BIBLE_ID}`);
            continue;
        }

        // Group by chapter
        // chapters will be an array of arrays of strings (verse texts)
        // logic: chapter 1 -> index 0
        const chapters = [];
        let maxChapter = 0;
        verses.forEach(v => {
            if (v.Chapter > maxChapter) maxChapter = v.Chapter;
        });

        // Initialize array
        for (let i = 0; i < maxChapter; i++) {
            chapters.push([]);
        }

        verses.forEach(v => {
            // v.Chapter is 1-based usually
            if (v.Chapter > 0) {
                chapters[v.Chapter - 1].push(v.Text);
            }
        });

        bibleData.push({
            name: bookName,
            chapters: chapters
        });
    }

    console.log(`Extracted ${bibleData.length} books.`);
    fs.writeFileSync(outputPath, JSON.stringify(bibleData, null, 2), 'utf8');
    console.log('Saved to:', outputPath);

} catch (err) {
    console.error('Error:', err);
}
