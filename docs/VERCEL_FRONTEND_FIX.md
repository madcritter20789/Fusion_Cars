# Vercel Frontend Fix - "Network error" Solution

**Problem**: Browser shows "Network error. Please check your backend is running." when trying to register admin

**Root Cause**: Vercel doesn't have the `NEXT_PUBLIC_API_URL` environment variable set

---

## The Issue Explained

### What's Happening:

1. **Frontend Code** (`src/config/api.js`):
   ```javascript
   export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
   ```

2. **On Your Local Machine**:
   - `NEXT_PUBLIC_API_URL` is set in `.env.local` to `http://localhost:5000/api`
   - Works fine because backend IS running locally

3. **On Vercel Production**:
   - `NEXT_PUBLIC_API_URL` is NOT set
   - Falls back to `http://localhost:5000/api`
   - Browser tries to call `http://localhost:5000/api` (local machine!)
   - Fails with "Network error"

### Why curl works but browser doesn't:
- **curl command**: You manually specified the full Railway URL
- **Browser**: Frontend doesn't know the correct backend URL

---

## Fix: Add Environment Variable to Vercel

### Step 1: Go to Vercel Dashboard

1. Go to https://vercel.com
2. Select your **Fusion Cars** project
3. Click **Settings** tab

---

### Step 2: Add Environment Variable

1. In Settings, find **Environment Variables**
2. Click **Add New** or **Add Environment Variable**
3. Fill in:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://fusioncars-production.up.railway.app/api`
   - **Environments**: Select **Production**

4. Click **Add**

**Important Notes:**
- Name MUST start with `NEXT_PUBLIC_` (public variables)
- Value MUST end with `/api`
- NO trailing slash after `/api`
- Use `https://` (not `http://`)

---

### Step 3: Verify Environment Variable

After adding, you should see:
```
NEXT_PUBLIC_API_URL = https://fusioncars-production.up.railway.app/api
```

---

### Step 4: Redeploy Frontend

**Option A: Automatic Redeploy**
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **...** menu
4. Select **Redeploy**
5. Choose **Use existing git commit**

**Option B: Manual Redeploy**
1. Push any small change to GitHub (or edit this file)
2. Vercel auto-deploys on git push
3. Wait for deployment to complete

---

### Step 5: Verify Deployment

After redeployment:
1. Go to your Vercel site: https://fusioncars.vercel.app
2. Navigate to admin signup: https://fusioncars.vercel.app/admin/signup
3. Try registering again

---

## Testing the Fix

### Test 1: Browser Console Check

After redeploying, check what URL frontend is using:

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Type:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_API_URL)
   ```
4. Should show: `https://fusioncars-production.up.railway.app/api`

If it shows `undefined`, redeploy hasn't taken effect yet. Wait a few minutes.

### Test 2: Try Admin Registration

1. Go to https://fusioncars.vercel.app/admin/signup
2. Fill in form:
   - Full Name: Test Admin
   - Email: testadmin@fusioncars.com
   - Phone: 9876543210
   - Password: TestPass123
   - Confirm Password: TestPass123
   - Admin Registration Key: `ADMIN_KEY`
3. Click **Create Admin Account**

**Expected Result**: Success message and redirect to dashboard

---

## Troubleshooting

### Problem: Still getting "Network error"

**Solution 1: Check Vercel Environment Variable**
- Go to Vercel Settings → Environment Variables
- Confirm `NEXT_PUBLIC_API_URL` is set
- Confirm value is correct: `https://fusioncars-production.up.railway.app/api`

**Solution 2: Clear Browser Cache**
- Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Clear cache
- Hard reload (Ctrl+Shift+R)

**Solution 3: Wait for Deployment**
- Vercel deployments take 1-2 minutes
- Check if latest deployment says "Ready"
- Look for green checkmark next to latest deployment

**Solution 4: Check Backend Health**
- Test: https://fusioncars-production.up.railway.app/api/health
- Should return JSON with status and timestamp
- If 404 → Backend root directory issue (see RAILWAY_CONFIGURATION_FIX.md)

### Problem: "Unauthorized" or "Invalid key"

This means frontend is reaching the backend correctly, but:
- Admin key is wrong (should be `ADMIN_KEY` from Railway env vars)
- Try with the exact key from Railway `ADMIN_REGISTRATION_KEY` variable

### Problem: Still shows "localhost" in logs

**This means Vercel hasn't rebuilt yet**
1. Go to **Deployments**
2. Click on the latest one
3. Check if it shows "Ready" (green checkmark)
4. If building, wait for it to complete
5. Hard refresh browser (Ctrl+Shift+R)

---

## Summary

| Issue | Solution |
|-------|----------|
| "Network error" in browser | Add `NEXT_PUBLIC_API_URL` to Vercel |
| API URL is localhost | Environment variable not set in Vercel |
| curl works but browser doesn't | Frontend env var missing |
| After adding env var, still fails | Redeploy Vercel frontend |

---

## Files Involved

```
Frontend Codebase:
├── src/config/api.js                    ← Reads NEXT_PUBLIC_API_URL
├── src/pages/admin/signup.jsx           ← Registration page
├── .env.local                           ← Development (local only)
└── Vercel Dashboard → Settings → Environment Variables ← Production config
```

---

## After This Fix

Once Vercel has `NEXT_PUBLIC_API_URL` set:
1. Frontend knows the correct backend URL
2. Admin registration works in browser
3. Dashboard will be able to load
4. User login/registration will work

---

## Next Steps

1. Add environment variable to Vercel
2. Redeploy frontend
3. Test admin registration
4. If still issues, check Railway backend logs

---

**Last Updated**: 2025-11-08
**Status**: Ready to implement
