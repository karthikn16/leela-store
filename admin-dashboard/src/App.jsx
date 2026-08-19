import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetch('https://leela-store.onrender.com/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  const fetchOrders = () => {
    fetch('https://leela-store.onrender.com/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  const updateStatus = (id, status) => {
    fetch(`https://leela-store.onrender.com/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(() => fetchOrders());
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ background: 'white', padding: '15px 20px', display: 'flex', gap: 15, borderBottom: '2px solid #ddd' }}>
        <h1 style={{ margin: 0, color: '#27ae60', marginRight: 'auto' }}>Leela Admin</h1>
        <button onClick={() => setActiveTab('orders')} style={{ padding: '8px 16px', background: activeTab==='orders'?'#27ae60':'#ddd', color: activeTab==='orders'?'white':'black', border:'none', borderRadius:4 }}>Online Orders</button>
        <button onClick={() => setActiveTab('pos')} style={{ padding: '8px 16px', background: activeTab==='pos'?'#27ae60':'#ddd', color: activeTab==='pos'?'white':'black', border:'none', borderRadius:4 }}>POS & Inventory</button>
      </header>

      <div style={{ padding: 20 }}>
        {activeTab === 'orders' && (
          <div>
            <h2>Live Web Orders</h2>
            {orders.length === 0 ? <p>No orders yet.</p> : orders.map(o => (
              <div key={o.id} style={{ background: 'white', padding: 20, marginBottom: 15, borderRadius: 8, borderLeft: o.status==='Pending'?'5px solid #f39c12':'5px solid #27ae60' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3>Order #{o.id} - {o.customer_name}</h3>
                  <span style={{ fontWeight: 'bold', color: o.status==='Pending'?'#f39c12':'#27ae60' }}>{o.status}</span>
                </div>
                <p>📞 {o.phone} | 💳 {o.payment_method}</p>
                <table style={{ width: '100%', marginBottom: 15, borderCollapse: 'collapse' }}>
                  <tbody>
                    {o.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 5 }}>{item.product_name}</td>
                        <td style={{ padding: 5 }}>{item.qty} qty</td>
                        <td style={{ padding: 5 }}>₹{item.price * item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 style={{ textAlign: 'right' }}>Total: ₹{o.total_amount}</h3>
                
                {o.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button onClick={() => updateStatus(o.id, 'Accepted')} style={{ background: '#27ae60', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 4 }}>Accept Order</button>
                    <button onClick={() => updateStatus(o.id, 'Rejected')} style={{ background: '#e74c3c', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 4 }}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'pos' && <div><h2>POS & Inventory System Active (Refer to Phase 3 code)</h2></div>}
      </div>
    </div>
  );
}