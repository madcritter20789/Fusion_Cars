# 🚀 Fusion Cars - Local Development Setup Guide

Complete guide to run the Fusion Cars application locally with both backend and frontend.

## ✅ Prerequisites

- **Node.js** >= 16.x (with npm)
- **MongoDB** (Atlas account or local installation)
- **Git** (optional, for version control)
- **Terminal/CMD** access

---

## 📋 Step 1: Clone and Navigate to Project

```bash
# Navigate to the project root
cd D:\Utkarsh\Fusion_Cars
```

---

## 🗄️ Step 2: Backend Setup

### 2.1 Configure MongoDB

The project uses **MongoDB Atlas** (cloud) connection. Your credentials are already in `.env`:

```env
MONGODB_URI=mongodb+srv://chitranshnishad27_db_user:OKXOglc9LPOvmT8E@cluster0.2uxmdzm.mongodb.net/
```

**If you need to use local MongoDB instead:**

1. Install MongoDB Community Edition:
   - **Windows**: Download from https://www.mongodb.com/try/download/community
   - **macOS**: `brew install mongodb-community`
   - **Linux**: `sudo apt install mongodb`

2. Start MongoDB:
   - **Windows**: MongoDB will run as a service by default
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Update `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/fusion_cars
```

### 2.2 Install Backend Dependencies

```bash
# Navigate to backend
cd BE_FusionCars

# Install dependencies
npm install
```

### 2.3 Backend Environment Variables

The `.env` file is already configured:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://chitranshnishad27_db_user:OKXOglc9LPOvmT8E@cluster0.2uxmdzm.mongodb.net/
JWT_SECRET=fusion_cars_secret_key_development_2025
FRONTEND_URL=http://localhost:3000
```

No changes needed unless you want to customize.

### 2.4 Start Backend Server

```bash
# From BE_FusionCars directory
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
MongoDB connected successfully
```

---

## 🎨 Step 3: Frontend Setup

### 3.1 Install Frontend Dependencies

```bash
# Navigate to frontend (new terminal/tab)
cd FE_FusionCars

# Install dependencies
npm install
```

### 3.2 Frontend Environment Variables

The `.env.local` is already configured for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
```

✅ **Already configured! No changes needed.**

### 3.3 Start Frontend Development Server

```bash
# From FE_FusionCars directory
npm run dev
```

**Expected Output:**
```
> next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 🔑 Step 4: Create Admin Account

To access the admin dashboard, you need to create an admin account.

### Option A: Using cURL

```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@fusioncars.com",
    "password": "admin123456",
    "phone": "9876543210",
    "adminRegistrationKey": "ADMIN_KEY_FROM_ENV"
  }'
```

### Option B: Using Postman

1. Create a POST request to: `http://localhost:5000/api/auth/admin/register`
2. Headers: `Content-Type: application/json`
3. Body:
```json
{
  "name": "Admin User",
  "email": "admin@fusioncars.com",
  "password": "admin123456",
  "phone": "9876543210",
  "adminRegistrationKey": "your_admin_key"
}
```

### Option C: Using the Database

Connect to MongoDB and create an admin document in the `admins` collection.

---

## 🌐 Step 5: Access the Application

### Frontend Application
- **URL**: http://localhost:3000
- Browse cars, make bookings, submit reviews

### Admin Dashboard
- **URL**: http://localhost:3000/admin/login
- **Email**: admin@fusioncars.com (or your created email)
- **Password**: admin123456 (or your created password)

### Admin Sections
- **Overview**: Dashboard statistics and recent sales
- **Cars**: Manage car listings (CRUD operations)
- **Bookings**: View and manage test drive bookings
- **Reviews**: Moderate user reviews
- **Users**: Manage user accounts (/admin/users)
- **Messages**: Manage contact form submissions (/admin/messages)

### Backend API
- **Base URL**: http://localhost:5000/api
- **Documentation**: Check README.md in BE_FusionCars folder

---

## 📊 Step 6: Test the Application

### Frontend Tests
1. Navigate to home page - ✓
2. Search for cars - ✓
3. View car details - ✓
4. Book test drive - ✓
5. Submit review - ✓
6. View contact page - ✓

### Admin Panel Tests
1. Login with admin credentials - ✓
2. View dashboard statistics - ✓
3. Create new car listing - ✓
4. Edit car details - ✓
5. Delete car - ✓
6. Manage bookings - ✓
7. Moderate reviews - ✓
8. View users - ✓
9. Manage messages - ✓
10. Logout - ✓

---

## 🐛 Troubleshooting

### Issue: Backend won't start

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, verify internet connection

### Issue: Frontend can't reach backend

```
Error: Failed to fetch from http://localhost:5000/api
```

**Solution**:
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify CORS_ORIGIN in backend .env includes http://localhost:3000

### Issue: Admin login not working

```
Error: Invalid credentials or admin not found
```

**Solution**:
- Verify admin account was created successfully
- Check MongoDB to ensure admin document exists
- Verify password is correct

### Issue: Port already in use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows (then use taskkill)

# Or use different port
PORT=5001 npm run dev
```

---

## 📝 Useful Commands

### Backend
```bash
cd BE_FusionCars

# Development mode (auto-restart on file changes)
npm run dev

# Production mode
npm start

# Lint code
npm run lint

# Seed sample data
npm run seed
```

### Frontend
```bash
cd FE_FusionCars

# Development mode
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint code
npm run lint
```

---

## 🔗 API Endpoints Quick Reference

### Authentication
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/admin/register` - Admin registration
- **POST** `/api/auth/admin/login` - Admin login

### Cars
- **GET** `/api/cars` - List all cars
- **GET** `/api/cars/:id` - Get car details
- **POST** `/api/admin/cars` - Create car (admin)
- **PUT** `/api/admin/cars/:id` - Update car (admin)
- **DELETE** `/api/admin/cars/:id` - Delete car (admin)

### Bookings
- **GET** `/api/bookings` - List bookings
- **POST** `/api/bookings` - Create booking
- **PUT** `/api/bookings/:id` - Update booking

### Users
- **GET** `/api/admin/users` - List users (admin)
- **DELETE** `/api/admin/users/:id` - Delete user (admin)

### Reviews
- **GET** `/api/reviews/car/:carId` - Get car reviews
- **POST** `/api/reviews` - Create review
- **PATCH** `/api/admin/reviews/:id/status` - Moderate review

### Messages
- **POST** `/api/contact` - Submit message
- **GET** `/api/admin/contact` - List messages (admin)
- **PUT** `/api/admin/contact/:id` - Update message status

---

## 📚 Additional Resources

- **Frontend README**: `FE_FusionCars/README.md`
- **Backend README**: `BE_FusionCars/README.md`
- **API Documentation**: Check backend routes in `BE_FusionCars/src/routes/`
- **Deployment Guide**: See `RAILWAY_DEPLOYMENT_GUIDE.md` for production deployment

---

## ✨ Features Available in Local Setup

✅ Full car catalog with filtering
✅ User registration and authentication
✅ Test drive booking system
✅ Review and rating system
✅ Wishlist functionality
✅ Contact form submissions
✅ Admin dashboard with analytics
✅ Car management (CRUD)
✅ Booking management
✅ Review moderation
✅ User management
✅ Message management

---

**Happy developing! 🚀**

For issues or questions, check the README files in each directory or review the code comments.
