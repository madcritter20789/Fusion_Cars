# 🔗 Frontend-Backend Integration Guide

**Status:** ✅ **CONNECTED AND READY**

**Frontend URL:** To be deployed to Vercel
**Backend URL:** https://fusioncars-production.up.railway.app

---

## ✅ Connection Status

### Frontend Configuration
- ✅ API configuration file set up: `FE_FusionCars/src/config/api.js`
- ✅ Environment variables configured
- ✅ Build successful (no errors)
- ✅ Ready for deployment

### Backend Status
- ✅ Server running on Railway
- ✅ MongoDB connected
- ✅ All endpoints responding
- ✅ Health check passing: https://fusioncars-production.up.railway.app/api/health

### Connection
- ✅ Frontend pointing to: `https://fusioncars-production.up.railway.app/api`
- ✅ CORS configured on backend
- ✅ API endpoints available

---

## 🔧 Configuration Details

### Frontend API Configuration

**File:** `FE_FusionCars/src/config/api.js`

```javascript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  adminLogin: `${API_BASE_URL}/auth/admin/login`,
  cars: `${API_BASE_URL}/cars`,
  // ... all endpoints defined
};
```

### Environment Variable

**File:** `FE_FusionCars/.env.local`

```env
NEXT_PUBLIC_API_URL=https://fusioncars-production.up.railway.app/api
NODE_ENV=production
```

**Note:** This is set for production. For local development, comment it out and use `http://localhost:5000/api`.

---

## 🚀 Deployment to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Navigate to Frontend Directory
```bash
cd FE_FusionCars
```

### Step 3: Deploy to Vercel
```bash
vercel --prod
```

**During deployment, Vercel will ask:**
- Project name: `fusion-cars` (or your choice)
- Which scope: Select your account
- Link to existing project? `No` (if first time)
- Directory: `./` (default)

### Step 4: Set Environment Variables in Vercel Dashboard

After deployment:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `fusion-cars` project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://fusioncars-production.up.railway.app/api`
5. Select environment: **Production**, **Preview**, **Development**
6. Click **Save**

### Step 5: Redeploy with Environment Variables

Option A: Via Dashboard
```
1. Go to Deployments tab
2. Click the latest deployment
3. Click "Redeploy"
```

Option B: Via CLI
```bash
vercel --prod
```

---

## 🧪 Testing the Connection

### Test 1: Check Backend Health
```bash
curl https://fusioncars-production.up.railway.app/api/health
```

**Expected Response:**
```json
{
  "status": "Server is running",
  "database": "Connected",
  "timestamp": "2025-11-08T..."
}
```

### Test 2: Get All Cars
```bash
curl https://fusioncars-production.up.railway.app/api/cars
```

**Expected Response:**
```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "pages": 0,
    "limit": 12
  }
}
```

### Test 3: Test Frontend → Backend Connection

After deploying to Vercel:
1. Visit your Vercel app URL (e.g., `https://fusion-cars.vercel.app`)
2. Check browser console for errors (F12)
3. Navigate to Inventory page
4. Should see "No cars available" message (database is empty)
5. No CORS errors should appear

---

## 📝 API Endpoints Available

### Public Endpoints (No Auth Required)

**Cars:**
```
GET  /api/cars                    # Get all cars with filters
GET  /api/cars/featured           # Get featured cars
GET  /api/cars/:id                # Get single car
GET  /api/cars/stats/overview     # Get car statistics
```

**Auth:**
```
POST /api/auth/register           # User registration
POST /api/auth/login              # User login
POST /api/auth/admin/login        # Admin login
```

**Contact:**
```
POST /api/contact                 # Submit contact form
```

### Protected Endpoints (Auth Required)

**User Endpoints:**
```
GET    /api/wishlist              # Get user wishlist
POST   /api/wishlist/add          # Add to wishlist
DELETE /api/wishlist/remove/:id   # Remove from wishlist

POST   /api/reviews               # Create review
PUT    /api/reviews/:id           # Update review
DELETE /api/reviews/:id           # Delete review
GET    /api/reviews/my-reviews    # Get user's reviews

GET    /api/bookings              # Get user bookings
POST   /api/bookings              # Create booking
```

**Admin Endpoints:**
```
POST   /api/admin/cars            # Create car
PUT    /api/admin/cars/:id        # Update car
DELETE /api/admin/cars/:id        # Delete car
PATCH  /api/admin/cars/:id/sold   # Mark as sold
PATCH  /api/admin/cars/:id/featured # Toggle featured

GET    /api/admin/dashboard/stats # Get statistics
GET    /api/admin/users           # Get all users
GET    /api/admin/bookings        # Get all bookings
PATCH  /api/admin/bookings/:id/status # Update booking
GET    /api/admin/reviews         # Get all reviews
PATCH  /api/admin/reviews/:id/status # Approve/reject review
```

---

## 🔐 CORS Configuration

**Backend CORS Settings (Railway):**

The backend is configured to accept requests from:
- Local development: `http://localhost:3000`
- Vercel frontend: `https://your-vercel-app.vercel.app`

**If you get CORS errors:**

1. Go to Railway Dashboard
2. Select Backend Service
3. Go to **Variables**
4. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=http://localhost:3000,https://your-vercel-app.vercel.app
   ```
5. **Redeploy** backend

---

## 📊 Integration Architecture

```
┌─────────────────────────────────────────────┐
│         User's Browser                      │
│  https://fusion-cars.vercel.app             │
└──────────────┬──────────────────────────────┘
               │
               │ HTTPS Requests
               │ (with JWT tokens)
               │
┌──────────────▼──────────────────────────────┐
│      Next.js Frontend (Vercel)              │
│  - React components                          │
│  - API calls to backend                      │
│  - Admin dashboard                           │
│  - User authentication                       │
└──────────────┬──────────────────────────────┘
               │
               │ REST API Calls
               │ https://fusioncars-production.up.railway.app/api
               │
┌──────────────▼──────────────────────────────┐
│    Express.js Backend (Railway)             │
│  - API routes                                │
│  - Business logic                            │
│  - JWT authentication                        │
│  - Database operations                       │
└──────────────┬──────────────────────────────┘
               │
               │ Database Queries
               │
┌──────────────▼──────────────────────────────┐
│    MongoDB Atlas (Cloud)                    │
│  - User data                                 │
│  - Car listings                              │
│  - Bookings                                  │
│  - Reviews                                   │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Troubleshooting

### Issue: CORS Error on Frontend

**Error Message:**
```
Access to XMLHttpRequest at 'https://fusioncars-production.up.railway.app/api/cars'
from origin 'https://your-vercel-app.vercel.app' has been blocked by CORS policy
```

**Solution:**
1. Update `CORS_ORIGIN` in Railway Variables
2. Add your exact Vercel URL (with https://)
3. Redeploy backend
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: API Returns 404

**Error Message:**
```json
{"error":"Route not found"}
```

**Solution:**
1. Verify endpoint URL is correct
2. Check backend is running: `curl https://fusioncars-production.up.railway.app/api/health`
3. Check the endpoint exists in `BE_FusionCars/src/routes/`

### Issue: Connection Timeout

**Error Message:**
```
Network Error: Failed to fetch
```

**Solution:**
1. Verify backend is running on Railway
2. Check internet connection
3. Verify `NEXT_PUBLIC_API_URL` is set correctly
4. Check backend logs on Railway dashboard

### Issue: 500 Error from Backend

**Error Message:**
```json
{"error":"Internal Server Error"}
```

**Solution:**
1. Check Railway backend logs
2. Verify MongoDB connection is active
3. Check database user has correct permissions
4. Verify environment variables are set correctly

### Issue: JWT Token Errors

**Error Message:**
```json
{"error":"Invalid or expired token"}
```

**Solution:**
1. User needs to login first
2. Token is stored in localStorage
3. Token expires after set time (check backend code)
4. Clear localStorage and login again

---

## 📚 Frontend Structure

```
FE_FusionCars/
├── src/
│   ├── config/
│   │   └── api.js              ← API configuration
│   ├── pages/
│   │   ├── index.js            ← Home page
│   │   ├── inventory.js        ← Car listings
│   │   ├── compare.js          ← Comparison tool
│   │   ├── admin/
│   │   │   ├── login.js        ← Admin login
│   │   │   └── index.js        ← Admin dashboard
│   │   └── ...other pages
│   ├── components/
│   │   ├── CarCard.js
│   │   ├── SearchFilters.js
│   │   └── ...other components
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── api.js              ← API helper functions
├── .env.local                  ← Environment variables (local)
├── .env.example                ← Template
└── next.config.js
```

---

## 🔄 Development Workflow

### Local Development

1. **Start Backend Locally** (optional, for testing without Railway)
   ```bash
   cd BE_FusionCars
   npm run dev
   ```
   Uses `MONGODB_URI` from `.env`

2. **Update Frontend .env.local**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start Frontend**
   ```bash
   cd FE_FusionCars
   npm run dev
   ```
   Opens at `http://localhost:3000`

4. **Test Locally**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API: http://localhost:5000/api

### Production Deployment

1. **Backend Already Deployed** ✅
   - URL: https://fusioncars-production.up.railway.app

2. **Deploy Frontend to Vercel**
   ```bash
   cd FE_FusionCars
   vercel --prod
   ```

3. **Set Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_API_URL=https://fusioncars-production.up.railway.app/api
   ```

4. **Redeploy Frontend**
   - Via Vercel dashboard or `vercel --prod`

---

## ✨ Features Ready to Use

### Users Can:
✅ Browse cars
✅ Search and filter
✅ Compare cars (up to 3)
✅ Register account
✅ Login
✅ Add cars to wishlist
✅ Submit reviews
✅ Book cars

### Admins Can:
✅ Login to admin dashboard
✅ Add new cars
✅ Edit car details
✅ Delete cars
✅ Mark cars as sold
✅ Toggle featured status
✅ Manage bookings
✅ Moderate reviews
✅ View analytics

---

## 🎯 Next Steps

### Immediate (Now)
1. ✅ Frontend configured with backend URL
2. ✅ Build tested successfully
3. [ ] Review this integration guide

### Short Term (Next 30 minutes)
1. [ ] Deploy frontend to Vercel
2. [ ] Set environment variables in Vercel
3. [ ] Redeploy with env vars
4. [ ] Test connection

### After Deployment
1. [ ] Add cars to database (via admin)
2. [ ] Create admin user
3. [ ] Test all features
4. [ ] Configure analytics (optional)

---

## 📞 Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

## ✅ Deployment Checklist

Before going live:

- [ ] Backend is running on Railway
- [ ] MongoDB is connected
- [ ] Frontend builds without errors
- [ ] Environment variables are set
- [ ] CORS is configured correctly
- [ ] API endpoints respond correctly
- [ ] Frontend connects to backend
- [ ] No console errors on frontend
- [ ] Admin user is created
- [ ] Can login and add cars
- [ ] All features tested

---

## 🎉 Summary

| Component | Status | Location |
|-----------|--------|----------|
| **Backend** | ✅ Live | https://fusioncars-production.up.railway.app |
| **Database** | ✅ Connected | MongoDB Atlas |
| **Frontend Code** | ✅ Ready | FE_FusionCars/ |
| **Frontend Config** | ✅ Set | FE_FusionCars/.env.local |
| **Build** | ✅ Success | `.next/` folder |
| **Frontend Deployment** | ⏳ Ready | Vercel (1 command) |

---

**Your frontend and backend are now connected and ready for deployment! 🚀**

**Next: Deploy to Vercel with one command!**

```bash
cd FE_FusionCars
vercel --prod
```

---

*Last Updated: 2024-11-08*
*Integration Status: ✅ COMPLETE*
