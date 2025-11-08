# Railway Configuration Fix - Fusion Cars Backend

## Problem Summary
You're seeing `{"error":"Route not found"}` when accessing `https://fusioncars-production.up.railway.app/`. This indicates:
- Either the backend isn't deployed correctly
- Or the routes aren't being recognized
- Or the application is crashing during startup

---

## Root Cause: Incorrect Root Directory

**CRITICAL ISSUE**: Railway must be configured to deploy from the `BE_FusionCars` folder.

When deployed from the root folder, Railway tries to run:
- `package.json` from root (which doesn't exist or is for frontend)
- `src/index.js` from root location (can't find it)
- Result: Server crashes → 404 "Route not found"

---

## STEP 1: Fix Railway Root Directory

### In Railway Dashboard:
1. Go to **Settings** → **Build & Deploy**
2. Find **Root Directory** setting
3. Change from: `/` or empty
4. Change to: `BE_FusionCars`
5. **SAVE and REDEPLOY**

### Why This Matters:
```
Current Structure:
/Fusion_Cars (root)
├── BE_FusionCars/          ← Backend lives here
│   ├── src/
│   │   └── index.js        ← Server starts here
│   └── package.json        ← Dependencies here
├── Frontend/               ← Frontend lives here
└── ...

Railway MUST start from: BE_FusionCars folder
```

---

## STEP 2: Verify All Railway Environment Variables

Go to **Variables** in Railway and ensure these are set:

```bash
# Server Config
PORT=5000
NODE_ENV=production

# MongoDB Connection (CRITICAL)
MONGODB_URI=mongodb+srv://chitranshnishad27_db_user:OKXOglc9LPOvmT8E@cluster0.2uxmdzm.mongodb.net/fusion_cars?retryWrites=true&w=majority

# JWT & Auth
JWT_SECRET=fusion_cars_secret_key_development_2025
ADMIN_REGISTRATION_KEY=ADMIN_KEY

# Frontend & CORS
FRONTEND_URL=https://fusioncars.vercel.app/
CORS_ORIGIN=https://fusioncars.vercel.app/,https://www.fusioncars.vercel.app/

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
ADMIN_EMAIL=admin@fusioncars.in
```

**IMPORTANT NOTES:**
- Do NOT include `localhost` or `127.0.0.1` in CORS_ORIGIN
- Do NOT include trailing slashes in CORS_ORIGIN URLs
- Remove `http://` origins from CORS (use only `https://`)
- Check for typos in MONGODB_URI

---

## STEP 3: Fix MongoDB Atlas IP Whitelist

You just added IP whitelist. Verify:

1. Go to **MongoDB Atlas Console**
2. Go to **Security** → **Network Access**
3. Verify Railway's IP is whitelisted

**Better Approach** (Recommended):
- Add `0.0.0.0/0` to allow connections from anywhere (temporary)
- OR add Railway's specific IP when you find it
- Check Railway logs to see which IP is connecting

---

## STEP 4: Verify MongoDB Connection Details

Your current connection string:
```
mongodb+srv://chitranshnishad27_db_user:OKXOglc9LPOvmT8E@cluster0.2uxmdzm.mongodb.net/fusion_cars?retryWrites=true&w=majority
```

**Checklist:**
- [ ] Username: `chitranshnishad27_db_user` - Correct?
- [ ] Password: `OKXOglc9LPOvmT8E` - Correct? (No special characters that need encoding)
- [ ] Cluster: `cluster0.2uxmdzm.mongodb.net` - Correct?
- [ ] Database: `fusion_cars` - Exists in MongoDB?
- [ ] Check MongoDB Atlas connection string settings match above

**If password has special characters** (like `@`, `#`, `$`, `%`, etc.):
- Encode it: Use MongoDB URL encoding
- Example: `@` becomes `%40`
- Test connection string locally first!

---

## STEP 5: Test MongoDB Connection on Railway

1. Go to **Railway Logs**
2. Look for these messages:
   - ✅ `✅ MongoDB Connected Successfully` - Connection works!
   - ❌ `❌ MongoDB Connection Failed` - Check the error message
   - ⚠️ `⚠️ MongoDB disconnected` - Connection unstable

**Common MongoDB errors:**
- `authentication failed` - Wrong username/password
- `no servers found` - Wrong cluster URL or not whitelisted
- `bad auth: SCRAM-SHA-1 authentication failed` - Special characters not encoded
- `timeout` - Network/IP whitelist issue

---

## STEP 6: Test Backend Health Endpoint

After deploying, test if backend is running:

**Test in browser or curl:**
```bash
curl https://fusioncars-production.up.railway.app/api/health
```

**Expected response:**
```json
{
  "status": "Server is running",
  "database": "Connected",
  "timestamp": "2025-11-08T10:30:00.000Z"
}
```

**If you get 404:**
- Root directory still wrong
- Dependencies not installed (npm install failed)
- Server crashed during startup

---

## STEP 7: Check Railway Logs for Errors

Go to **Railway Dashboard** → **Logs** and look for:

1. **Deployment successful?**
   ```
   Successfully deployed
   ```

2. **Server starting?**
   ```
   🚀 Server is running on port 5000
   🌍 Environment: production
   ```

3. **MongoDB connecting?**
   ```
   ✅ MongoDB Connected Successfully
   ```

4. **Any errors?**
   ```
   ❌ MongoDB Connection Failed: ...
   Error: ENOENT: no such file or directory
   ```

---

## STEP 8: Fix CORS Settings

Your CORS in Railway should be:
```
CORS_ORIGIN=https://fusioncars.vercel.app/,https://www.fusioncars.vercel.app/
```

Remove:
- ❌ `http://localhost:3000`
- ❌ `http://localhost:3001`
- ❌ `http://127.0.0.1:3000`
- ❌ Trailing slashes

The server will split by comma and trim whitespace automatically.

---

## Deployment Checklist

Before redeploying, verify:

- [ ] **Root Directory**: Set to `BE_FusionCars`
- [ ] **Environment Variables**: All set correctly
- [ ] **MongoDB IP Whitelist**: Railway IP is allowed
- [ ] **CORS Origins**: No localhost, no trailing slashes
- [ ] **Package.json**: In `BE_FusionCars/` folder (not root)
- [ ] **Start Script**: `package.json` has `"start": "node src/index.js"`

---

## Testing Registration After Deployment

Once backend is running:

1. **Test Registration Endpoint:**
   ```
   POST https://fusioncars-production.up.railway.app/api/auth/admin/register

   Body:
   {
     "name": "Test Admin",
     "email": "testadmin@fusioncars.com",
     "phone": "9876543210",
     "password": "TestPassword123!",
     "role": "admin",
     "adminKey": "ADMIN_KEY"
   }
   ```

2. **Expected Response:**
   ```json
   {
     "message": "Admin registered successfully",
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "admin": {
       "_id": "...",
       "name": "Test Admin",
       "email": "testadmin@fusioncars.com",
       "role": "admin"
     }
   }
   ```

3. **Common Errors:**
   - `ADMIN_KEY` mismatch → Check Railway env var `ADMIN_REGISTRATION_KEY`
   - MongoDB error → Check connection string
   - CORS error in browser → Check CORS_ORIGIN in Railway

---

## Vercel Frontend Configuration

Make sure your Vercel frontend has correct backend URL:

1. Go to **Vercel Dashboard**
2. Go to **Settings** → **Environment Variables**
3. Set:
   ```
   NEXT_PUBLIC_API_URL=https://fusioncars-production.up.railway.app
   ```

4. **Redeploy frontend** after changing env vars

---

## Quick Debugging Commands

To test locally before Railway:

```bash
# Navigate to backend
cd D:\Utkarsh\Fusion_Cars\BE_FusionCars

# Install dependencies
npm install

# Start server (should print logs)
npm start

# In another terminal, test endpoint
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"123","password":"pass","role":"admin","adminKey":"ADMIN_KEY"}'
```

---

## If Still Getting 404 After All Steps

1. **Check if app is running:**
   - Does `/api/health` work?
   - Check Railway logs for startup errors

2. **Check deployment:**
   - Did deployment finish successfully?
   - Are there build errors?

3. **Check root directory:**
   - Confirm Railway root is `BE_FusionCars`
   - Try redeploying

4. **Check environment:**
   - Is `PORT=5000` set?
   - Is `NODE_ENV=production` set?

5. **Verify package.json:**
   - Is `start` script present?
   - Does it point to `src/index.js`?

---

## Summary of Root Cause

**Your Issue**: "Route not found" error

**Why**: Railway is looking for the backend in the wrong directory

**Solution**: Set Railway Root Directory to `BE_FusionCars`

**Next Steps**:
1. Set Root Directory to `BE_FusionCars`
2. Verify all Environment Variables
3. Check MongoDB IP whitelist
4. Redeploy
5. Test `/api/health` endpoint
6. Test admin registration

Once `/api/health` returns the correct response, your backend is working and you can test admin registration!

---

Generated: 2025-11-08
Status: Ready to implement fixes
