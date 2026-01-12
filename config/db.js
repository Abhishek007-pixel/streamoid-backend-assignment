const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to a file named 'database.sqlite' in your project folder
const db = new sqlite3.Database(path.resolve(__dirname, '../database.sqlite'), (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// We wrap the standard SQLite function in a Promise so it works like the Postgres one
// This allows us to keep using "await query(...)" in our controller!
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        // Determine if it's a SELECT (all) or INSERT/UPDATE (run)
        if (sql.trim().toUpperCase().startsWith("SELECT")) {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve({ rows: rows }); // Match Postgres format
            });
        } else {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ rows: [] }); // No rows for INSERT
            });
        }
    });
}

module.exports = { query };