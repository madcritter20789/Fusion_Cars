# 🗄️ MongoDB IP Configuration - Setup Guide

## ✅ MongoDB IP Address Added

Your MongoDB IP address has been configured in the backend environment file.

**IP Address**: `152.58.0.103:27017`
**Database Name**: `fusion_cars`

---

## 📝 Configuration Details

### Backend Configuration (Already Updated)

Your `.env` file in `BE_FusionCars` has been updated:

```env
# Database Configuration
# MongoDB Connection via IP Address
MONGODB_URI=mongodb://152.58.0.103:27017/fusion_cars
```

**Connection Details**:
- **Host**: 152.58.0.103
- **Port**: 27017 (default MongoDB port)
- **Database**: fusion_cars
- **Authentication**: None (configure if needed)

---

## 🔧 If You Need Authentication

If your MongoDB instance requires a username and password, update the connection string:

```env
# With Authentication
MONGODB_URI=mongodb://username:password@152.58.0.103:27017/fusion_cars
```

**Example**:
```env
MONGODB_URI=mongodb://admin:yourpassword@152.58.0.103:27017/fusion_cars
```

---

## 🚀 How to Start with MongoDB IP

### 1. Verify MongoDB Connection (Optional)

You can test the connection before starting the backend:

```bash
# Test using mongosh (if installed)
mongosh --host 152.58.0.103:27017 --eval "db.adminCommand('ping')"

# Or using mongo legacy client
mongo --host 152.58.0.103:27017
```

### 2. Start Backend Server

```bash
cd D:\Utkarsh\Fusion_Cars\BE_FusionCars
npm run dev
```

**You should see**:
```
✅ MongoDB Connected Successfully
📍 Database: fusion_cars
🔗 Host: 152.58.0.103
```

### 3. Verify Connection in Logs

The backend will display:
- ✅ MongoDB Connected Successfully
- 📍 Database name
- 🔗 Host address

If you see connection errors, check:
- MongoDB is running on 152.58.0.103:27017
- Firewall allows connections to that IP/port
- Network connectivity to the MongoDB server

---

## 📊 Database Collections

Once connected, you'll have these collections available:

- **users** - User accounts
- **admins** - Admin accounts
- **cars** - Car listings
- **bookings** - Test drive bookings
- **reviews** - User reviews
- **wishlist** - Saved favorite cars

---

## 🔐 Security Considerations

### If MongoDB is on a Remote Server:

1. **Use Authentication**:
   ```env
   MONGODB_URI=mongodb://admin:securepassword@152.58.0.103:27017/fusion_cars
   ```

2. **Use Network Segmentation**:
   - Only allow connections from authorized IPs
   - Use VPN if connecting over public networks

3. **Enable SSL/TLS** (if supported):
   ```env
   MONGODB_URI=mongodb+srv://username:password@152.58.0.103:27017/fusion_cars?ssl=true
   ```

4. **Use Strong Passwords**:
   - Change default MongoDB password
   - Use complex credentials

---

## 🛠️ Troubleshooting MongoDB IP Connection

### Problem: "connect ECONNREFUSED"

```
Error: connect ECONNREFUSED 152.58.0.103:27017
```

**Solutions**:
1. Verify MongoDB is running on 152.58.0.103
2. Check firewall settings allow port 27017
3. Verify network connectivity:
   ```bash
   ping 152.58.0.103
   ```

### Problem: "Authentication Failed"

```
Error: authentication failed
```

**Solutions**:
1. Add credentials to MONGODB_URI (if required)
2. Verify username and password are correct
3. Check MongoDB user has access to `fusion_cars` database

### Problem: "Connection Timeout"

```
Error: serverSelectionTimeoutMS expired
```

**Solutions**:
1. Increase timeout in `config/database.js`:
   ```javascript
   serverSelectionTimeoutMS: 10000, // Increase from 5000
   ```
2. Check network latency to MongoDB server
3. Verify MongoDB server is running

---

## 📋 Connection String Formats

### Standard Connection (No Auth)
```
mongodb://152.58.0.103:27017/fusion_cars
```

### With Authentication
```
mongodb://username:password@152.58.0.103:27017/fusion_cars
```

### With Options
```
mongodb://152.58.0.103:27017/fusion_cars?maxPoolSize=10&minPoolSize=2
```

### SSL/TLS Connection
```
mongodb+srv://username:password@152.58.0.103:27017/fusion_cars?ssl=true
```

---

## ✅ Verification Steps

### 1. Check Backend Logs
```bash
# Start backend
cd BE_FusionCars && npm run dev

# Look for:
# ✅ MongoDB Connected Successfully
# 📍 Database: fusion_cars
# 🔗 Host: 152.58.0.103
```

### 2. Test API Health
```bash
# In another terminal
curl http://localhost:5000/api/health
```

**Expected Response**:
```json
{"status":"ok"}
```

### 3. Test Database Access
Make an API call to fetch cars:
```bash
curl http://localhost:5000/api/cars
```

Should return car data from your MongoDB.

---

## 🔄 Connection Pooling

The backend is configured with optimal connection pooling:

- **Min Pool Size**: 2 connections
- **Max Pool Size**: 10 connections
- **Server Selection Timeout**: 5 seconds
- **Socket Timeout**: 45 seconds

These settings ensure:
- ✅ Fast initial connection
- ✅ Efficient resource usage
- ✅ Proper timeout handling
- ✅ Automatic reconnection

---

## 📝 Current Configuration Summary

| Setting | Value |
|---------|-------|
| **MongoDB Host** | 152.58.0.103 |
| **Port** | 27017 |
| **Database** | fusion_cars |
| **Authentication** | None (configure if needed) |
| **Min Connections** | 2 |
| **Max Connections** | 10 |
| **Selection Timeout** | 5000 ms |
| **Socket Timeout** | 45000 ms |

---

## 🚀 Next Steps

1. ✅ Backend `.env` has been updated with MongoDB IP
2. ✅ Database configuration supports IP connections
3. **Start the backend**: `npm run dev` (in BE_FusionCars)
4. **Verify logs** show successful MongoDB connection
5. **Test API** endpoints to confirm database access

---

## 📞 Need More Help?

Check these files for additional information:
- `START_LOCAL.md` - Quick start guide
- `LOCAL_SETUP_GUIDE.md` - Detailed setup
- `BE_FusionCars/README.md` - Backend documentation

---

**Your MongoDB IP (152.58.0.103) is now configured and ready to use!** ✅
