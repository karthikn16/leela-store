const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
app.use(express.json());

// Get Products
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => res.json(rows));
});

// Phase 3: Add Product
app.post('/api/products', (req, res) => {
    const { name, price, unit, category, emoji } = req.body;
    db.run("INSERT INTO products (name, price, unit, category, emoji) VALUES (?, ?, ?, ?, ?)", 
    [name, price, unit, category, emoji], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

// Phase 4: Customer Checkout
app.post('/api/checkout', (req, res) => {
    const { customerName, phone, paymentMethod, total, items } = req.body;
    
    db.run("INSERT INTO orders (customer_name, phone, payment_method, total_amount, status) VALUES (?, ?, ?, ?, 'Pending')", 
    [customerName, phone, paymentMethod, total], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const orderId = this.lastID;
        const stmt = db.prepare("INSERT INTO order_items (order_id, product_name, qty, price) VALUES (?, ?, ?, ?)");
        
        items.forEach(item => {
            stmt.run(orderId, item.name, item.qty, item.price);
        });
        stmt.finalize();
        
        res.json({ success: true, orderId });
    });
});

// Admin: Get all orders
app.get('/api/orders', (req, res) => {
    db.all("SELECT * FROM orders ORDER BY id DESC", [], (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        
        db.all("SELECT * FROM order_items", [], (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Attach items to orders
            const ordersWithItems = orders.map(o => ({
                ...o,
                items: items.filter(i => i.order_id === o.id)
            }));
            res.json(ordersWithItems);
        });
    });
});

// Admin: Update Order Status
app.put('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(5000, () => console.log('Complete System Backend running on port 5000'));
