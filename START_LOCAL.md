# 🚀 Quick Start - Run Fusion Cars Locally

Everything is already set up! Follow these simple steps to run the application locally.

---

## ✅ Checklist - Already Done

- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ MongoDB Atlas connection configured
- ✅ Environment files configured
- ✅ Admin dashboard created
- ✅ All features implemented

---

## 🎯 Quick Start (3 Simple Steps)

### Step 1️⃣: Start Backend Server

Open a terminal and run:

```bash
cd D:\Utkarsh\Fusion_Cars\BE_FusionCars
npm run dev
```

**You should see:**
```
Server running on http://localhost:5000
MongoDB connected successfully
```

**Keep this terminal open!**

---

### Step 2️⃣: Start Frontend Server

Open a **NEW terminal** and run:

```bash
cd D:\Utkarsh\Fusion_Cars\FE_FusionCars
npm run dev
```

**You should see:**
```
> next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Keep this terminal open too!**

---

### Step 3️⃣: Create Admin Account & Access

#### Option A: Create Admin via Terminal (Recommended)

Open a **third terminal** and run this command:

```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin\",\"email\":\"admin@test.com\",\"password\":\"admin123\",\"phone\":\"9999999999\",\"adminRegistrationKey\":\"ADMIN_KEY\"}"
```

Or if curl doesn't work, use this PowerShell command:

```powershell
$body = @{
    name = "Admin"
    email = "admin@test.com"
    password = "admin123"
    phone = "9999999999"
    adminRegistrationKey = "ADMIN_KEY"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/admin/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

#### Option B: Create Admin via Postman

1. Open Postman
2. Create POST request to: `http://localhost:5000/api/auth/admin/register`
3. Headers: `Content-Type: application/json`
4. Body (raw):
```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "admin123",
  "phone": "9999999999",
  "adminRegistrationKey": "ADMIN_KEY"
}
```
5. Click Send

---

## 🌐 Access URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Frontend - User Application |
| http://localhost:3000/admin/login | Admin Login |
| http://localhost:5000/api | Backend API |

---

## 🔐 Login Credentials

**Admin Dashboard Login:**
- Email: `admin@test.com`
- Password: `admin123`

---

## 📊 What You Can Do

### User Features (Frontend)
- ✅ Browse cars with filters
- ✅ Search for specific cars
- ✅ View car details and specifications
- ✅ Book test drives
- ✅ Submit reviews and ratings
- ✅ Add cars to wishlist
- ✅ Submit contact form
- ✅ User registration and login

### Admin Features (Dashboard)
- ✅ View real-time statistics and analytics
- ✅ Manage car listings (Create, Read, Update, Delete)
- ✅ View and manage test drive bookings
- ✅ Moderate user reviews
- ✅ Manage user accounts
- ✅ View and respond to contact messages
- ✅ Toggle featured status for cars
- ✅ Filter and search records

---

## 🧪 Test the Application

### 1. Frontend Test
1. Go to http://localhost:3000
2. Try browsing cars
3. Search for "sedan" or any other car type
4. Click on a car to see details
5. Try to book a test drive

### 2. Admin Panel Test
1. Go to http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@test.com`
   - Password: `admin123`
3. Explore different tabs:
   - **Overview**: See statistics
   - **Cars**: Manage car listings
   - **Bookings**: See test drive bookings
   - **Reviews**: Moderate reviews
   - **Users**: View user accounts
   - **Messages**: View contact submissions

---

## 📋 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED
```
- MongoDB Atlas connection might be down
- Check internet connection
- Verify MongoDB credentials in `.env`

### Frontend won't connect to backend
```
Error: Failed to fetch from http://localhost:5000
```
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in `.env.local`

### Port 5000 or 3000 already in use
```powershell
# Windows: Check and kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Admin login not working
- Verify admin account was created successfully
- Check that you're using correct credentials
- Try creating a new admin account

---

## 📝 Useful Tips

### 1. Check API Health
Open browser and go to: `http://localhost:5000/api/health`

Should return: `{"status":"ok"}`

### 2. MongoDB Check
- All data is stored in MongoDB Atlas
- Check the database at: https://cloud.mongodb.com/
- Database: `cluster0`
- Collections: cars, users, bookings, reviews, etc.

### 3. Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Save any file in `FE_FusionCars/src/` → auto-refresh in browser
- **Backend**: Save any file in `BE_FusionCars/src/` → auto-restart (via nodemon)

### 4. View API Logs
Check the backend terminal to see all API requests:
```
GET /api/cars
POST /api/auth/login
...
```

---

## 🎨 Test Features Checklist

### Frontend
- [ ] Homepage loads
- [ ] Search works
- [ ] Car filters work
- [ ] Car details page loads
- [ ] Book test drive button works
- [ ] Login/Register works
- [ ] Contact form submits
- [ ] Admin login redirects to dashboard

### Admin Dashboard
- [ ] Dashboard loads with stats
- [ ] Cars tab shows listings
- [ ] Can create new car
- [ ] Can edit car
- [ ] Can delete car
- [ ] Bookings tab shows bookings
- [ ] Can update booking status
- [ ] Reviews tab shows reviews
- [ ] Can approve/reject reviews
- [ ] Users tab shows users
- [ ] Messages tab shows contact submissions

---

## 🚀 Next Steps

Once everything is running locally:

1. **Customize the application**: Modify colors, text, and features
2. **Add more cars**: Use admin panel to add car listings
3. **Test all features**: Try booking, reviews, wishlist
4. **Deploy to production**: Follow `RAILWAY_DEPLOYMENT_GUIDE.md`

---

## 📞 Need Help?

- Check `LOCAL_SETUP_GUIDE.md` for detailed setup instructions
- Review code comments in source files
- Check backend README: `BE_FusionCars/README.md`
- Check frontend README: `FE_FusionCars/README.md`

---

**You're all set! Happy developing! 🎉**
