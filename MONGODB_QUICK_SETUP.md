# ⚡ MongoDB Quick Setup - Local Testing

## Problem
You're getting: `Operation 'admins.findOne()' buffering timed out after 10000ms`

This means MongoDB is not running or not accessible.

---

## ✅ Quick Solution

### Option 1: Use MongoDB Atlas (Cloud - Easiest, No Installation)

**This takes 5 minutes and requires NO installation!**

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Create account with email
4. Verify email

#### Step 2: Create Cluster
1. Create new project (name it "FusionCars")
2. Create cluster (select FREE tier)
3. Wait for cluster to be created (~5 minutes)
4. Click "Connect"

#### Step 3: Get Connection String
1. Click "Drivers"
2. Copy connection string
3. Should look like: `mongodb+srv://username:password@cluster0.mongodb.net/fusion_cars`

#### Step 4: Update Backend .env
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/fusion_cars
```

Replace `username` and `password` with what you created.

#### Step 5: Restart Backend
```bash
# Press Ctrl+C in backend terminal
npm run dev
```

**Expected**: Should see "✅ MongoDB Connected Successfully"

---

### Option 2: Install MongoDB Locally (More Complex)

**This takes 20-30 minutes and requires installation.**

#### For Windows:

**Step 1: Download MongoDB**
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (6.0+)
   - Platform: Windows x64
   - Package: MSI
3. Download the installer

**Step 2: Install MongoDB**
1. Run the `.msi` installer
2. Click "Install"
3. Choose "Install MongoDB as a Service" (recommended)
4. Choose default installation path
5. Complete installation

**Step 3: Verify Installation**
```powershell
# Open PowerShell and run:
mongod --version
```

Should show version like: `db version v6.0.0`

**Step 4: Start MongoDB Service**
```powershell
# Option A: Start service (easiest)
Start-Service MongoDB

# Option B: Verify it's running
Get-Service MongoDB | Select-Object Status
```

**Step 5: Update Backend .env**
```env
MONGODB_URI=mongodb://localhost:27017/fusion_cars
```

**Step 6: Restart Backend**
```bash
npm run dev
```

**Expected**: Should see "✅ MongoDB Connected Successfully"

---

## 🧪 Test MongoDB Connection

### Option 1: Using mongosh (Recommended)

```powershell
# Open PowerShell and run:
mongosh --eval "db.adminCommand('ping')"
```

**Expected output:**
```
{ ok: 1 }
```

### Option 2: Using curl

```bash
curl http://localhost:27017/
```

**Expected**: Should not hang or timeout

---

## 🚀 After MongoDB is Running

### Step 1: Restart Backend
```bash
# In backend terminal, press Ctrl+C
# Then run:
npm run dev
```

### Step 2: Check Backend Logs
You should see:
```
✅ MongoDB Connected Successfully
📍 Database: fusion_cars
🔗 Host: localhost
```

### Step 3: Test Signup
1. Open: http://localhost:3000/admin/signup
2. Fill form:
   - Name: Test Admin
   - Email: test@example.com
   - Phone: 9999999999
   - Password: password123
   - Confirm: password123
   - Admin Key: ADMIN_KEY
3. Click "Create Admin Account"
4. **Should see success message!** ✅

---

## 🆘 Troubleshooting

### Problem: MongoDB service won't start

**Solution:**
```powershell
# Create data directories
mkdir "C:\data\db" -Force
mkdir "C:\data\log" -Force

# Start MongoDB manually
mongod --dbpath "C:\data\db"

# Keep this window open while testing
```

### Problem: Still getting timeout error

**Solution:**
1. Verify MongoDB is running:
   ```powershell
   Get-Service MongoDB
   # Should show: Status: Running
   ```

2. Test connection:
   ```powershell
   mongosh --eval "db.adminCommand('ping')"
   ```

3. Check firewall allows port 27017:
   - Windows Defender Firewall
   - Allow MongoDB through firewall

4. Increase timeout in backend:
   - Edit: `BE_FusionCars/config/database.js`
   - Change: `serverSelectionTimeoutMS: 5000` to `10000`

### Problem: Port 27017 already in use

**Solution:**
```powershell
# Find what's using the port
netstat -ano | findstr :27017

# Kill the process (replace PID)
Stop-Process -Id PID -Force

# Try MongoDB again
Start-Service MongoDB
```

---

## 🎯 Recommended: MongoDB Atlas (Cloud)

**Why Atlas is better for testing:**
- ✅ No installation needed
- ✅ Works from anywhere
- ✅ Free tier generous (512MB storage)
- ✅ Automatically backed up
- ✅ Works in production too
- ✅ Same cost (FREE) as local

**Setup time**: 5 minutes
**Installation time**: 0 minutes
**Complexity**: Very simple

---

## 📋 Quick Comparison

| Feature | Local | Atlas Cloud |
|---------|-------|-------------|
| Setup time | 20-30 min | 5 min |
| Installation | Required | No |
| Cost | Free | Free |
| Backup | Manual | Automatic |
| Access | Local only | Anywhere |
| Reliability | Depends on PC | High |
| Production ready | Needs setup | Ready |

**Recommendation**: Use MongoDB Atlas for testing! 👍

---

## ✅ Verification Checklist

- [ ] MongoDB installed or Atlas account created
- [ ] Connection string obtained
- [ ] `.env` file updated with connection string
- [ ] Backend restarted
- [ ] Backend logs show "✅ MongoDB Connected Successfully"
- [ ] Can access http://localhost:3000/admin/signup
- [ ] Can fill and submit signup form
- [ ] See success message
- [ ] Admin created successfully!

---

## 🚀 Next Steps

1. **Choose MongoDB method:**
   - Easiest: MongoDB Atlas (cloud) → 5 min
   - Traditional: Local MongoDB → 20 min

2. **Setup MongoDB:**
   - Follow steps for your chosen method

3. **Update backend .env:**
   - Add connection string

4. **Restart backend:**
   - npm run dev

5. **Test signup:**
   - Visit http://localhost:3000/admin/signup
   - Fill form and submit
   - **Success!** ✅

---

## 💡 Pro Tips

- MongoDB Atlas works in production too (no migration needed)
- You can switch between local and cloud anytime
- MongoDB stores data automatically
- Backups happen automatically (Atlas)
- No firewall issues with Atlas

---

**Choose your method above and follow the steps. You'll have working signup in 5-30 minutes!** 🎉
