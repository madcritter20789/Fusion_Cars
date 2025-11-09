# 🗄️ MongoDB Local Setup Guide

## Quick Summary

To run Fusion Cars locally with a database, you need to:

1. **Install MongoDB Community Server**
2. **Start MongoDB service**
3. **Backend will automatically connect to local database**

---

## Step 1: Download MongoDB Community Server

### Windows Installation (Recommended)

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (6.0 or higher)
   - **Platform**: Windows x64
   - **Package**: MSI
3. Download the `.msi` installer
4. Run the installer and follow the setup wizard
5. During installation:
   - ✅ Install MongoDB as a Service (recommended)
   - ✅ Use default installation path: `C:\Program Files\MongoDB\Server\X.X`

### Verify Installation

Open PowerShell and run:
```powershell
mongod --version
```

You should see: `db version v6.0.X` or similar

---

## Step 2: Start MongoDB Service

### Option A: MongoDB Service (Easiest - Installed with MSI)

MongoDB automatically starts as a Windows Service. Verify it's running:

```powershell
Get-Service MongoDB | Select-Object Status
```

Expected output: `Status: Running`

### Option B: Start MongoDB Manually

If MongoDB is not running as a service, start it manually:

```powershell
mongod --dbpath "C:\data\db"
```

Or with a custom data path:
```powershell
mkdir C:\data\db
mongod --dbpath C:\data\db
```

---

## Step 3: Verify MongoDB is Running

### Test Connection

Open another PowerShell window and run:

```powershell
mongosh --eval "db.adminCommand('ping')"
```

Expected output:
```
{ ok: 1 }
```

Or test with curl:
```powershell
# Should see MongoDB welcome message
curl http://localhost:27017/
```

---

## Step 4: Backend Configuration

The backend is already configured for local MongoDB.

**Current `.env` settings:**
```env
MONGODB_URI=mongodb://localhost:27017/fusion_cars
```

This automatically:
- ✅ Connects to local MongoDB on port 27017
- ✅ Uses database name: `fusion_cars`
- ✅ Creates the database automatically on first connection

---

## Step 5: Start the Application

### Terminal 1: Start Backend

```bash
cd D:\Utkarsh\Fusion_Cars\BE_FusionCars
npm run dev
```

**Expected logs:**
```
✅ MongoDB Connected Successfully
📍 Database: fusion_cars
🔗 Host: localhost
🚀 Server is running on port 5000
```

### Terminal 2: Start Frontend (if not already running)

```bash
cd D:\Utkarsh\Fusion_Cars\FE_FusionCars
npm run dev
```

**Expected logs:**
```
✓ Ready in 2.7s
Local: http://localhost:3001
```

### Terminal 3 (Optional): MongoDB Shell

Monitor your database:
```bash
mongosh
```

Then run queries:
```javascript
// Switch to fusion_cars database
use fusion_cars

// Check collections
show collections

// Count documents
db.cars.countDocuments()
db.users.countDocuments()
```

---

## Step 6: Test the Application

1. Open browser: **http://localhost:3001**
2. You should see the Fusion Cars application
3. Try these features:
   - ✅ Browse car catalog (if data exists)
   - ✅ Search and filter cars
   - ✅ Book test drives (if data exists)
   - ✅ Submit reviews
   - ✅ Use wishlist
   - ✅ Admin login at http://localhost:3001/admin/login

---

## 🔧 Troubleshooting

### Problem: MongoDB Service Won't Start

```
Error: The MongoDB Server service failed to start
```

**Solution:**
1. Check if data directory exists:
   ```powershell
   mkdir "C:\data\db" -Force
   mkdir "C:\data\log" -Force
   ```

2. Restart MongoDB service:
   ```powershell
   Restart-Service MongoDB
   ```

3. Or manually start with debug:
   ```powershell
   mongod --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log"
   ```

### Problem: Backend Still Can't Connect to MongoDB

**Error:**
```
MongoDB Connection Failed: Server selection timed out after 5000 ms
```

**Solutions:**

1. Verify MongoDB is running:
   ```powershell
   Get-Process mongod
   ```

2. Check if port 27017 is open:
   ```powershell
   netstat -ano | findstr :27017
   ```

3. Test MongoDB directly:
   ```powershell
   mongosh --eval "db.adminCommand('ping')"
   ```

4. If MongoDB still won't start, increase timeout in `config/database.js`:
   ```javascript
   serverSelectionTimeoutMS: 10000, // Increase from 5000
   ```

### Problem: Data Directory Issues

```
Error: unable to create lock file at C:\data\db\mongod.lock
```

**Solution:**
1. Stop MongoDB service:
   ```powershell
   Stop-Service MongoDB
   ```

2. Delete old lock file:
   ```powershell
   Remove-Item "C:\data\db\mongod.lock"
   ```

3. Restart service:
   ```powershell
   Start-Service MongoDB
   ```

### Problem: Port 27017 Already in Use

```
Error: bind failed (Address already in use)
```

**Solution:**
```powershell
# Find process using port 27017
netstat -ano | findstr :27017

# Kill the process (replace XXXXX with PID)
Stop-Process -Id XXXXX -Force

# Or use different port
mongod --port 27018 --dbpath "C:\data\db"
```

---

## 📊 MongoDB Collections

Once you start the application, these collections will be created:

| Collection | Purpose |
|-----------|---------|
| **users** | User accounts |
| **admins** | Admin accounts |
| **cars** | Car listings |
| **bookings** | Test drive bookings |
| **reviews** | User reviews |
| **wishlist** | Favorite cars |
| **contacts** | Contact form submissions |

---

## 🔄 Switching Between Databases

You can easily switch between local and remote MongoDB by updating `.env`:

### Use Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/fusion_cars
```

### Use Remote MongoDB (152.58.0.103):
```env
MONGODB_URI=mongodb://152.58.0.103:27017/fusion_cars
```

### Use MongoDB Atlas Cloud:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/fusion_cars
```

After changing, restart the backend:
```bash
# Press Ctrl+C in backend terminal
npm run dev
```

---

## 📝 Sample Data

To add sample cars for testing, connect to MongoDB and run:

```javascript
use fusion_cars

db.cars.insertMany([
  {
    name: "Tesla Model S",
    brand: "Tesla",
    price: 85000,
    year: 2024,
    color: "Black",
    transmission: "Automatic",
    fuelType: "Electric",
    mileage: "N/A",
    image: "https://example.com/tesla.jpg",
    description: "Premium electric sedan"
  },
  {
    name: "BMW X5",
    brand: "BMW",
    price: 75000,
    year: 2024,
    color: "White",
    transmission: "Automatic",
    fuelType: "Petrol",
    mileage: "15 km/l",
    image: "https://example.com/bmw.jpg",
    description: "Luxury SUV"
  }
])
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB installed and in PATH
- [ ] MongoDB service running: `Get-Service MongoDB | Select-Object Status`
- [ ] Port 27017 listening: `netstat -ano | findstr :27017`
- [ ] MongoDB responds to ping: `mongosh --eval "db.adminCommand('ping')"`
- [ ] Backend connects: Check logs for "✅ MongoDB Connected Successfully"
- [ ] Frontend loads: http://localhost:3001 opens without errors
- [ ] API responds: `curl http://localhost:5000/api/health`

---

## 🚀 Next Steps

1. ✅ Install MongoDB Community Server
2. ✅ Start MongoDB service
3. ✅ Backend is already configured for `localhost:27017`
4. ✅ Restart backend if needed
5. ✅ Open http://localhost:3001 and test the application

---

## 📞 Need More Help?

If you encounter issues:

1. Check MongoDB logs:
   ```powershell
   Get-Content "C:\data\log\mongod.log" -Tail 50
   ```

2. Check backend logs:
   ```
   Look for errors in the backend terminal
   ```

3. Verify firewall allows port 27017:
   ```powershell
   # Windows Defender Firewall should allow MongoDB
   # Check: Settings → Firewall & network protection
   ```

---

**Your MongoDB local setup is ready!** ✅

Follow the steps above to install MongoDB and your Fusion Cars application will be fully functional locally.
