# ⚡ Admin Signup - Quick Reference

## 🌐 URLs

| Page | URL |
|------|-----|
| **Signup** | http://localhost:3000/admin/signup |
| **Login** | http://localhost:3000/admin/login |
| **Dashboard** | http://localhost:3000/admin |

---

## 📝 Form Fields

```
Full Name:          (text)
Email:              (email)
Phone:              (tel)
Password:           (password, min 6 chars)
Confirm Password:   (password, must match)
Admin Key:          (text, default: ADMIN_KEY)
```

---

## 🔑 Demo Credentials

```
Admin Key: ADMIN_KEY
Email: (any valid email)
Password: (any, min 6 chars)
```

---

## ✅ Validation

| Field | Rule |
|-------|------|
| Name | Required, non-empty |
| Email | Required, valid format, unique |
| Phone | Required, non-empty |
| Password | Required, min 6 characters |
| Confirm | Must match password |
| Admin Key | Must be `ADMIN_KEY` |

---

## 🚀 Quick Flow

```
1. Go to: http://localhost:3000/admin/signup
2. Fill all 6 fields
3. Click "Create Admin Account"
4. ✅ Success → Redirected to /admin dashboard
5. ❌ Error → Fix and try again
```

---

## 🔒 Security

- Passwords hashed with bcrypt
- Admin key prevents unauthorized signup
- Email uniqueness enforced
- All inputs validated

---

## 📡 API Endpoint

```
POST /api/auth/admin/register

Body:
{
  "name": "Your Name",
  "email": "you@example.com",
  "phone": "+91 9999999999",
  "password": "password123",
  "adminRegistrationKey": "ADMIN_KEY"
}

Success (201):
{
  "message": "Admin registration successful",
  "token": "...",
  "admin": {...}
}
```

---

## 🧪 Test It

**Simple Test**:
```
Name: Test
Email: test@test.com
Phone: 9999999999
Password: test123
Key: ADMIN_KEY
→ Click Create → ✅ Success
```

---

## 🔄 What Happens After Signup

1. Account created in database
2. JWT token generated
3. Stored in localStorage
4. Redirected to admin dashboard
5. Logged in automatically
6. Can access all admin features

---

## 🎯 Admin Features Available

- Dashboard with stats
- Manage cars
- View bookings
- Moderate reviews
- Manage users
- View messages
- Generate reports

---

## 🔗 Links

From Signup Page:
- "Login here" → Go to login page
- "Back to Website" → Go to homepage

From Login Page:
- "Sign up here" → Go to signup page (NEW!)

---

## ⚙️ Configuration

**File**: `BE_FusionCars/.env`

```
ADMIN_REGISTRATION_KEY=ADMIN_KEY
```

**Change for production**:
```
ADMIN_REGISTRATION_KEY=your-secret-key-here
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid key" | Use `ADMIN_KEY` |
| "Email already exists" | Use different email |
| "Passwords don't match" | Ensure both fields identical |
| "Network error" | Check backend running on 5000 |
| Form won't submit | Check all fields filled |

---

## 📚 Full Documentation

- **Complete Guide**: See `ADMIN_SIGNUP_GUIDE.md`
- **Implementation Details**: See `ADMIN_SIGNUP_IMPLEMENTATION.md`

---

**Ready to signup? Go to:** http://localhost:3000/admin/signup 🚀
