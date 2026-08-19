const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./leelastore.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, unit TEXT, category TEXT, emoji TEXT
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT, phone TEXT, payment_method TEXT,
        total_amount REAL, status TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER, product_name TEXT, qty REAL, price REAL
    )`);

    // Insert defaults if empty
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO products (name, price, unit, category, emoji) VALUES (?, ?, ?, ?, ?)");
            stmt.run("Tomato", 40, "kg", "veg", "🍅");
            stmt.run("Onion", 35, "kg", "veg", "🧅");
            stmt.run("Dairy Milk", 20, "piece", "choc", "🍫");
            stmt.run("Sambar Masala", 25, "pkt", "spice", "🍲");
            stmt.finalize();
        }
    });
});
module.exports = db;
