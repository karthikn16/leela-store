# Leela Store - Complete Management System (Phases 1 to 7)

Congratulations! This is the finalized, fully functional code for your father's shop.

## What's Included?
1. `backend/`: The Node.js + SQLite brain. It now handles live web orders, order statuses (Pending, Accepted), and tracks order items.
2. `admin-dashboard/`: The React app for your father. Now includes a live "Online Orders" tab to accept/reject customer orders.
3. `customer-website/`: The premium glassmorphism website. Now features a live cart, fetches products from the database, sends orders to the admin dashboard, generates WhatsApp notifications, and supports UPI/COD!
4. `DEPLOYMENT_GUIDE.md`: Step-by-step instructions for Phase 7 (putting it on the internet using free tools like Render and Vercel).

## How to Run Locally
1. **Start Backend:**
   cd backend
   npm install
   npm start
   (Runs on http://localhost:5000)

2. **Start Admin Dashboard:**
   cd admin-dashboard
   npm install
   npm run dev
   (Runs on http://localhost:5173)

3. **Start Customer Website:**
   Simply double-click `customer-website/index.html` in your browser!
