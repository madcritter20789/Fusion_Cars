import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

/**
 * Admin Login Page
 *
 * Authentication page for admin users
 */

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_ENDPOINTS.adminLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        if (typeof window !== 'undefined') {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminData', JSON.stringify(data.admin));
        }

        // Redirect to dashboard
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please check your backend is running.');
      console.error('Login error:', error);
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
        <title>Admin Login - Fusion Cars</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-primary-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-primary-dark rounded-lg shadow-xl p-8 border border-accent-charcoal">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-accent-stone">Fusion Cars Management Portal</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-accent-platinum mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="admin@fusioncars.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-accent-platinum mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:outline-none focus:border-accent-silver transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-accent-silver text-primary-black font-semibold rounded-lg hover:bg-neutral-light transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 space-y-3 text-center">
              <p className="text-sm text-accent-stone">
                Don't have an admin account?{' '}
                <a href="/admin/signup" className="text-accent-gold hover:text-accent-yellow transition font-medium">
                  Sign up here
                </a>
              </p>
              <a href="/" className="text-sm text-accent-stone hover:text-accent-silver transition block">
                ← Back to Website
              </a>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-accent-stone">
            <p>Demo Credentials (if seeded):</p>
            <p>Email: admin@test.com | Password: admin123</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
