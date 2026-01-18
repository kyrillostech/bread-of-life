const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../katameros-api/Core/KatamerosDatabase.db');
console.log('Opening DB at:', dbPath);

try {
    const db = new Database(dbPath, { readonly: true });

    const transSample = db.prepare("SELECT * FROM BooksTranslations WHERE Text LIKE '%التكوين%' OR Text LIKE '%تكوين%' LIMIT 5").all();
    console.log('Arabic Matches:', transSample);










} catch (err) {
    console.error('Error:', err);
}
