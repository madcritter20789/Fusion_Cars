import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Phone } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

/**
 * Admin Signup Page
 *
 * Registration page for new admin users
 */

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminRegistrationKey: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }

    if (!formData.adminRegistrationKey.trim()) {
      setError('Please enter the admin registration key');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.adminRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          adminRegistrationKey: formData.adminRegistrationKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Admin account created successfully! Redirecting to login...');

        // Store token if provided
        if (data.token && typeof window !== 'undefined') {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminData', JSON.stringify(data.admin));
        }

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please check your backend is running.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Signup - Fusion Cars</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-primary-black flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-primary-dark rounded-lg shadow-xl p-8 border border-accent-charcoal">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Signup</h1>
              <p className="text-accent-stone">Create your admin account</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-900/30 border border-green-600 rounded-lg text-green-400 text-sm"
              >
                {success}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-accent-platinum mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-accent-platinum mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="admin@fusioncars.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-accent-platinum mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="+91 9999999999"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-accent-platinum mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-accent-platinum mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Show Password Toggle */}
              <label className="flex items-center text-sm text-accent-stone hover:text-accent-platinum transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2 w-4 h-4 rounded cursor-pointer"
                />
                Show passwords
              </label>

              {/* Admin Registration Key */}
              <div>
                <label htmlFor="adminRegistrationKey" className="block text-sm font-medium text-accent-platinum mb-2">
                  Admin Registration Key
                </label>
                <input
                  id="adminRegistrationKey"
                  type="text"
                  name="adminRegistrationKey"
                  required
                  value={formData.adminRegistrationKey}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                  placeholder="Enter registration key"
                />
                <p className="text-xs text-accent-stone mt-1">Contact administrator for registration key</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-accent-gold text-primary-black font-semibold rounded-lg hover:bg-accent-yellow transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Creating Account...' : 'Create Admin Account'}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 space-y-3 text-center">
              <p className="text-sm text-accent-stone">
                Already have an account?{' '}
                <a href="/admin/login" className="text-accent-gold hover:text-accent-yellow transition font-medium">
                  Login here
                </a>
              </p>
              <a href="/" className="text-sm text-accent-stone hover:text-accent-silver transition block">
                ← Back to Website
              </a>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-accent-stone">
            <p>Default Registration Key (Demo):</p>
            <p className="font-mono text-accent-gold">ADMIN_KEY</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
