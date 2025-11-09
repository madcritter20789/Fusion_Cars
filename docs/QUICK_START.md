# ⚡ Quick Start Guide

## 🚀 Start the Application (Right Now!)

### Terminal 1: Backend
```bash
cd D:\Utkarsh\Fusion_Cars\BE_FusionCars
npm run dev
```

### Terminal 2: Frontend
```bash
cd D:\Utkarsh\Fusion_Cars\FE_FusionCars
npm run dev
```

### Terminal 3: MongoDB (Optional - for data storage)
```bash
# After installing MongoDB Community Edition
mongosh
```

---

## 🌐 Open in Browser

- **User App**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

---

## 🔑 Admin Login

```
Email: admin@test.com
Password: admin123
```

---

## ⚠️ Important

**MongoDB is not installed yet.** The app will work without it, but database features will timeout.

To get full functionality:
1. Download MongoDB: https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. Backend will automatically connect

---

## 📝 Configuration Files

- **Backend Config**: `BE_FusionCars/.env`
- **Frontend Config**: `FE_FusionCars/.env.local`
- **Database**: `mongodb://localhost:27017/fusion_cars` (when MongoDB is running)

---

## 🆘 Port Issues?

- **Backend port 5000 in use**: Kill with `Stop-Process -Id PID -Force`
- **Frontend port 3000 in use**: Frontend auto-switches to 3001
- **MongoDB port 27017 in use**: Check if MongoDB is already running

---

## 📖 More Info

- **MongoDB Setup**: See `MONGODB_LOCAL_SETUP.md`
- **Full Summary**: See `LOCAL_DEVELOPMENT_SUMMARY.md`
- **Original Guides**: Check `RUN_LOCALLY_NOW.md`

---

That's it! You're ready to go! 🎉
