# 🚀 Railway Deployment Guide - Fusion Cars Backend

## Problem Analysis
Your app crashes after deployment because **environment variables are not configured in Railway Dashboard**.

The `.env` file works locally but is ignored in production. Railway needs variables set explicitly.

---

## ✅ Step-by-Step Deployment Guide

### Phase 1: MongoDB Atlas Setup (5 minutes)

#### 1. Change Your MongoDB Password (SECURITY CRITICAL)
Since your password was exposed:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login → **Account Settings** (click your avatar top-right)
3. Go to **Security** → **Password**
4. Create a **NEW PASSWORD** (keep it safe!)
5. Copy your **new password**

#### 2. Get MongoDB Connection String
1. In MongoDB Atlas → **Databases** → Click your cluster
2. Click **Connect** button
3. Select **Drivers** → **Node.js**
4. Copy the connection string:
   ```
   mongodb+srv://chitranshnishad27_db_user:YOUR_NEW_PASSWORD@cluster0.2uxmdzm.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `YOUR_NEW_PASSWORD` with your actual new password

#### 3. Whitelist Railway IP (Optional but Recommended)
1. In MongoDB Atlas → **Network Access**
2. Click **ADD IP ADDRESS**
3. Add: `0.0.0.0/0` (allows all IPs - fine for production)
4. Click **Confirm**

---

### Phase 2: Generate Secrets (2 minutes)

#### 1. Generate JWT Secret
Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
**Output example:**
```
a3f8c9d2e1b4f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5
```
**Copy this value** - you'll need it for Railway

#### 2. Create Admin Registration Key
Use any random string, for example:
```
fusion_admin_2024_secret_xyz789
```
**Keep this safe** - it's used to create the first admin user

---

### Phase 3: Configure Railway Dashboard (3 minutes)

#### 1. Go to Your Railway Project
1. Open [Railway Dashboard](https://railway.app/dashboard)
2. Click on your **Fusion Cars Backend** project
3. Select the **Backend Service**

#### 2. Go to Variables Tab
1. Click the **Variables** tab (or Settings → Variables)
2. You should see an empty form

#### 3. Add Environment Variables
Add these variables ONE BY ONE:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://chitranshnishad27_db_user:YOUR_NEW_PASSWORD@cluster0.2uxmdzm.mongodb.net/?retryWrites=true&w=majority` |
| `JWT_SECRET` | The generated JWT secret | `a3f8c9d2e1b4f6g7h8i9j0k1l2m3n4o5...` |
| `ADMIN_REGISTRATION_KEY` | Your admin key | `fusion_admin_2024_secret_xyz789` |
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` | `5000` |
| `CORS_ORIGIN` | Your frontend URL | `http://localhost:3000,https://your-app.vercel.app` |

**How to add each variable:**
1. Click "New Variable"
2. Enter **Name** (e.g., `MONGODB_URI`)
3. Enter **Value** (your actual value)
4. Press **Enter** or click **Add**
5. Repeat for each variable

#### 4. Save Configuration
Once all variables are added, they auto-save in Railway.

---

### Phase 4: Deploy (1 minute)

#### Option A: Automatic (Recommended)
1. In Railway, click **Deploy** button
2. Wait for deployment to complete (usually 2-3 minutes)
3. Check logs for any errors

#### Option B: Via GitHub
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Fix: Update .env with placeholders"
   git push
   ```
2. Railway auto-deploys on GitHub push (if configured)
3. Watch the logs in Railway dashboard

---

### Phase 5: Verify Deployment (2 minutes)

#### 1. Get Your Railway URL
1. In Railway dashboard, click your backend service
2. Look for **Railway Domain** (top right)
3. Example: `https://fusion-cars-backend-production.up.railway.app`

#### 2. Test Health Endpoint
Replace `YOUR_RAILWAY_URL` with your actual URL:

```bash
curl https://YOUR_RAILWAY_URL/api/health
```

**Success response:**
```json
{
  "status": "Server is running",
  "database": "Connected",
  "timestamp": "2024-11-08T07:30:45.000Z"
}
```

#### 3. Check Logs for Errors
In Railway dashboard:
1. Click your backend service
2. Go to **Logs** tab
3. Look for any red error messages
4. If MongoDB fails, check your connection string

#### 4. Test a Real Endpoint
```bash
curl https://fusioncars-production.up.railway.app
```

Should return a JSON array (even if empty).

---

## 🐛 Troubleshooting

### Issue: "MongoDB Connection Failed"

**Cause:** Wrong password or IP not whitelisted

**Fix:**
1. Double-check your MongoDB password is correct
2. Check MongoDB Atlas → Network Access → IP whitelist includes `0.0.0.0/0`
3. Verify connection string format:
   - Should have: `mongodb+srv://username:password@cluster...`
   - Should NOT have: angle brackets `<>`

### Issue: Health Check Returns 500 Error

**Cause:** Environment variable not set correctly

**Fix:**
1. Go to Railway Variables tab
2. Verify all required variables are present:
   - `MONGODB_URI` ✓
   - `JWT_SECRET` ✓
   - `ADMIN_REGISTRATION_KEY` ✓
   - `NODE_ENV=production` ✓
   - `PORT=5000` ✓
3. **Redeploy** after adding variables:
   - Click **Deploy** button, OR
   - Push new commit to GitHub

### Issue: CORS Errors on Frontend

**Cause:** `CORS_ORIGIN` not configured properly

**Fix:**
1. In Railway Variables, set:
   ```
   CORS_ORIGIN=http://localhost:3000,https://your-vercel-app.vercel.app
   ```
2. Make sure frontend URL exactly matches
3. Redeploy backend

### Issue: "Port Already in Use"

This shouldn't happen on Railway (they manage ports).

If it does:
1. Check if multiple services are running
2. Go to Settings → Stop service, then Deploy

---

## 📝 Next Steps

### After Deployment Works:

1. **Create First Admin User**
   ```bash
   curl -X POST https://YOUR_RAILWAY_URL/api/auth/admin/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@fusioncars.com",
       "phone": "+919876543210",
       "password": "admin123",
       "role": "super-admin",
       "permissions": ["manage_cars", "manage_users", "manage_bookings", "manage_reviews", "view_analytics"],
       "adminKey": "YOUR_ADMIN_KEY_FROM_ENV"
     }'
   ```
   Replace `YOUR_ADMIN_KEY_FROM_ENV` with your `ADMIN_REGISTRATION_KEY`

2. **Deploy Frontend to Vercel**
   - Use backend URL in `NEXT_PUBLIC_API_URL`
   - Example: `https://fusion-cars-backend-production.up.railway.app/api`

3. **Update CORS Origin**
   - After getting Vercel URL, update `CORS_ORIGIN` in Railway Variables
   - Add both local and production URLs

---

## 🔐 Security Checklist

- [x] MongoDB password changed
- [ ] JWT Secret is random and unique
- [ ] Admin key is secret and saved safely
- [ ] IP whitelist is configured in MongoDB Atlas
- [ ] `.env` file has placeholders (no real credentials)
- [ ] No secrets committed to GitHub

---

## 📊 Environment Variables Checklist

### Before Deployment
- [ ] MongoDB connection string ready
- [ ] JWT secret generated
- [ ] Admin key created
- [ ] Node environment set to `production`
- [ ] Port set to `5000`
- [ ] CORS origins configured

### After Deployment
- [ ] Health endpoint responds 200 OK
- [ ] MongoDB connection successful
- [ ] No console errors in Railway logs
- [ ] API endpoints accessible
- [ ] Frontend can connect to backend

---

## 🎯 Summary

| Step | Time | Status |
|------|------|--------|
| Change MongoDB password | 2 min | ⏳ |
| Generate JWT secret | 1 min | ⏳ |
| Add variables to Railway | 3 min | ⏳ |
| Deploy backend | 2 min | ⏳ |
| Test endpoints | 2 min | ⏳ |
| **Total** | **~10 min** | |

**Once completed:** Your backend will be live and ready for frontend integration!

---

## 💬 Quick Reference

```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Test Backend Health
curl https://YOUR_RAILWAY_URL/api/health

# Test Cars Endpoint
curl https://YOUR_RAILWAY_URL/api/cars

# View Railway Logs
# Use Railway dashboard Logs tab
```

---

**Your backend MongoDB Atlas cluster:** `cluster0.2uxmdzm.mongodb.net`

**Your MongoDB user:** `chitranshnishad27_db_user`

**Default database:** `fusion_cars` (from your connection string)

**Ready to deploy?** Follow the steps above! 🚀
