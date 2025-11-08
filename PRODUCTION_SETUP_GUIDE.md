# Fusion Cars - Complete Production Setup Guide

**Last Updated**: 2025-11-08
**Status**: Ready for production deployment

---

## Overview

This guide provides complete setup instructions for deploying Fusion Cars application to production with:
- Backend on **Railway**
- Frontend on **Vercel**
- Database on **MongoDB Atlas**

---

## Part 1: Backend Setup on Railway

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository with BE_FusionCars folder
- MongoDB Atlas cluster with username/password

---

### Step 1: Create Railway Project

1. Go to https://railway.app
2. Click **New Project**
3. Choose **Deploy from GitHub**
4. Connect your GitHub account
5. Select the **Fusion_Cars** repository

---

### Step 2: Configure Root Directory (CRITICAL)

**This is the most common cause of deployment failure!**

1. After selecting repo, go to **Settings**
2. Find **Build & Deploy** section
3. Set **Root Directory** to: `BE_FusionCars`
4. Click **Save**

**Why?** Your backend code lives in `BE_FusionCars/` folder, not root.

---

### Step 3: Add Environment Variables

In Railway, go to **Variables** tab and add each variable:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Atlas Connection (CRITICAL)
MONGODB_URI=mongodb+srv://chitranshnishad27_db_user:OKXOglc9LPOvmT8E@cluster0.2uxmdzm.mongodb.net/fusion_cars?retryWrites=true&w=majority

# JWT Secret (Use a strong random string in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Admin Registration Key (Keep this secret!)
ADMIN_REGISTRATION_KEY=your_admin_key_change_this_too

# Frontend URL
FRONTEND_URL=https://fusioncars.vercel.app

# CORS Configuration (No trailing slashes!)
CORS_ORIGIN=https://fusioncars.vercel.app,https://www.fusioncars.vercel.app

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@fusioncars.in
```

**IMPORTANT NOTES:**
- ✅ DO use only `https://` origins in CORS
- ❌ DO NOT include `localhost` or `127.0.0.1`
- ❌ DO NOT include trailing slashes
- ✅ DO use strong JWT_SECRET (not the development one)
- ✅ DO keep ADMIN_REGISTRATION_KEY secret

---

### Step 4: Verify MongoDB Atlas Setup

**Check MongoDB Atlas Dashboard:**

1. Go to **Security** → **Network Access**
2. Add Railway's IP to whitelist:
   - Option A (Recommended): Add `0.0.0.0/0` (allow all)
   - Option B: Find Railway's IP in logs and add it

3. Go to **Database Access**
4. Verify user `chitranshnishad27_db_user` exists
5. Check password matches your connection string

**Test Connection String:**
```
mongodb+srv://chitranshnishad27_db_user:OKXOglc9LPOvmT8E@cluster0.2uxmdzm.mongodb.net/fusion_cars?retryWrites=true&w=majority
```

---

### Step 5: Deploy

1. In Railway, click **Deploy**
2. Wait for deployment to complete
3. Go to **Logs** tab
4. Look for:
   - ✅ `🚀 Server is running on port 5000`
   - ✅ `✅ MongoDB Connected Successfully`
   - ❌ Any error messages?

---

### Step 6: Test Backend Health

Once deployed, test if backend is running:

**In browser or terminal:**
```bash
curl https://fusioncars-production.up.railway.app/api/health
```

**Expected response:**
```json
{
  "status": "Server is running",
  "database": "Connected",
  "timestamp": "2025-11-08T12:34:56.789Z"
}
```

If you get 404 → See troubleshooting section below.

---

## Part 2: Frontend Setup on Vercel

### Step 1: Deploy Frontend

1. Go to https://vercel.com
2. Import your project from GitHub
3. Select the root folder (NOT BE_FusionCars)
4. Click **Deploy**

---

### Step 2: Add Environment Variables

After deployment, go to **Settings** → **Environment Variables**

Add:
```
NEXT_PUBLIC_API_URL=https://fusioncars-production.up.railway.app
```

**Important:**
- This must start with `NEXT_PUBLIC_` to be accessible in browser
- No trailing slash
- Must be the actual Railway backend URL

---

### Step 3: Redeploy Frontend

1. Go to **Deployments**
2. Click **Redeploy** on the latest deployment
3. Select **Use existing git commit**
4. Wait for redeployment

Now frontend will communicate with the production backend!

---

## Part 3: Testing Endpoints

### Test Admin Registration

Once both backend and frontend are deployed:

**Using curl:**
```bash
curl -X POST https://fusioncars-production.up.railway.app/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@fusioncars.com",
    "phone": "9876543210",
    "password": "SecurePassword123!",
    "role": "admin",
    "adminKey": "your_admin_key_from_railway"
  }'
```

**Expected response:**
```json
{
  "message": "Admin registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@fusioncars.com",
    "role": "admin"
  }
}
```

---

### Test User Registration

```bash
curl -X POST https://fusioncars-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "phone": "9876543210",
    "password": "SecurePassword123!"
  }'
```

---

## Part 4: Troubleshooting

### Problem: "Route not found" (404 error)

**Cause 1: Wrong Root Directory**
- Fix: Set Railway Root Directory to `BE_FusionCars`
- Redeploy

**Cause 2: Server crashed**
- Check Railway Logs for errors
- Look for MongoDB connection errors
- Check if all required environment variables are set

**Cause 3: Dependencies not installed**
- Check if `package.json` exists in `BE_FusionCars/`
- Check if build logs show errors

---

### Problem: "Network error" in frontend

**Cause**: Frontend doesn't know the backend URL

**Fix**:
1. Go to Vercel Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL=https://fusioncars-production.up.railway.app`
3. Redeploy frontend

---

### Problem: MongoDB connection failed

**Common errors:**
- `authentication failed` → Check username/password in connection string
- `no servers found` → Check Network Access whitelist in MongoDB Atlas
- `timeout` → Check IP whitelist or network connectivity

**Fix:**
1. Verify connection string in Railway
2. Test connection string locally
3. Check MongoDB Atlas Network Access settings
4. Add `0.0.0.0/0` temporarily to whitelist

---

### Problem: CORS error in browser

**Browser error:** `Access to XMLHttpRequest blocked by CORS policy`

**Fix:**
1. Check Railway's `CORS_ORIGIN` variable
2. Remove trailing slashes
3. Use `https://` not `http://`
4. Match the exact domain your frontend is using
5. Redeploy backend

---

## Part 5: Monitoring & Logs

### Check Backend Logs

In Railway:
1. Go to your project
2. Click **Logs** tab
3. Look for:
   - Server startup messages
   - Database connection status
   - API request logs
   - Any errors

### Common Log Messages

**Good signs:**
```
🚀 Server is running on port 5000
✅ MongoDB Connected Successfully
2025-11-08T... - POST /api/auth/register
```

**Bad signs:**
```
❌ MongoDB Connection Failed: authentication failed
Error: ENOENT: no such file or directory
listen EADDRINUSE: address already in use :::5000
```

---

## Part 6: Security Checklist

Before going to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change `ADMIN_REGISTRATION_KEY` to a unique value
- [ ] Use `https://` for all CORS origins
- [ ] Remove localhost origins from CORS
- [ ] Set `NODE_ENV=production`
- [ ] Use strong MongoDB password
- [ ] Enable IP whitelist on MongoDB Atlas (don't use 0.0.0.0/0 in production)
- [ ] Set email credentials for password recovery
- [ ] Enable HTTPS (automatic on Railway and Vercel)

---

## Part 7: Maintenance

### Update Backend Code

1. Push changes to GitHub
2. Railway auto-deploys on push
3. Check logs to verify deployment succeeded

### Update Frontend Code

1. Push changes to GitHub
2. Vercel auto-deploys on push
3. Check deployment status

### Update Environment Variables

1. Edit in Railway/Vercel dashboards
2. Redeploy application
3. Test in browser

---

## Part 8: Database Backups

**MongoDB Atlas Backups:**
1. Go to MongoDB Atlas Dashboard
2. Click **Backups** tab
3. Enable automatic backups
4. Set retention period

---

## Quick Reference

| Component | URL | Details |
|-----------|-----|---------|
| **Backend** | https://fusioncars-production.up.railway.app | Node.js + Express on Railway |
| **Frontend** | https://fusioncars.vercel.app | Next.js on Vercel |
| **Database** | MongoDB Atlas | Hosted MongoDB |
| **Health Check** | /api/health | Test if backend is running |
| **Admin Register** | POST /api/auth/admin/register | Register admin account |
| **User Register** | POST /api/auth/register | Register user account |

---

## Support & Troubleshooting

1. **Check Railway Logs** for error messages
2. **Verify environment variables** are correctly set
3. **Test `/api/health`** endpoint
4. **Check MongoDB Atlas** Network Access and Database Access
5. **Verify CORS settings** match your frontend domain

---

**Generated**: 2025-11-08
**By**: Fusion Cars Development Team

For more help, see `RAILWAY_CONFIGURATION_FIX.md`
