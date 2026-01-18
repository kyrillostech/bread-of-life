const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../katameros-api/Core/KatamerosDatabase.db');
const db = new Database(dbPath, { readonly: true });

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
fs.writeFileSync('tables.txt', tables.map(t => t.name).join('\n'));
console.log('Tables saved to tables.txt');
