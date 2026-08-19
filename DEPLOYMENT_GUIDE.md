# Phase 7: Deployment Guide (Online Hosting)

To make your system accessible to everyone in Aruppukkottai (like `leelastore.in`), you don't need expensive Kubernetes. You can host this for FREE.

### Step 1: Deploy Backend (Database & API)
1. Push your `backend` folder to a GitHub repository.
2. Create a free account on **Render.com**.
3. Create a new "Web Service", connect your GitHub, and select the backend folder.
4. Render will give you a live link (e.g., `https://leela-backend.onrender.com`).
5. *Note: Update the URLs in your frontend code from `http://localhost:5000` to this new Render link.*

### Step 2: Deploy Admin Dashboard
1. Push your `admin-dashboard` folder to GitHub.
2. Create a free account on **Vercel.com**.
3. Import the Admin repository. Vercel will automatically build and host the React app.

### Step 3: Deploy Customer Website
1. Push your `customer-website` folder to GitHub.
2. Import it into **Vercel.com** or **Netlify**.
3. You will get a live link.
4. Buy a domain name (like `leelastore.in`) from Hostinger or GoDaddy for ~₹500/year and connect it to your Vercel project in the settings.

Your system is now fully live!
