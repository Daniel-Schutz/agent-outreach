'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  // Simple email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // A senha não é mais um campo obrigatório
    // Removemos a validação da senha

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setLoginError('');

      // Use the login function from AuthContext directly
      // It will handle both check_email and get_user in sequence
      console.log('Proceeding with login flow...');
      const result = await login(email, password);
      
      if (result.success) {
        // Login successful, navigate to dashboard
        router.push('/dashboard');
      } else {
        // Display error message
        setLoginError(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setEmail(value);
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'password') {
      setPassword(value);
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {loginError && (
          <motion.div
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <AlertCircle className="text-red-500 mr-2 mt-0.5 shrink-0" size={16} />
            <p className="text-red-700 dark:text-red-300 text-sm">{loginError}</p>
          </motion.div>
        )}

        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            className={`block w-full p-3 border ${
              errors.email
                ? 'border-red-500'
                : 'border-zinc-300 dark:border-zinc-600'
            } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
            value={email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1.5 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password field */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password <span className="text-xs text-zinc-500">(optional)</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Any password will work"
              className={`block w-full p-3 pr-10 border ${
                errors.password
                  ? 'border-red-500'
                  : 'border-zinc-300 dark:border-zinc-600'
              } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
              value={password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1.5 shrink-0" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Logging in...
            </>
          ) : (
            <>
              Continue with Email
            </>
          )}
        </button>
      </form>

      {/* Demo account information */}
      <div className="mt-6 p-3 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          <span className="font-medium">Demo Account:</span> Use email <span className="font-medium">demo@example.com</span> and password <span className="font-medium">demo123</span> to try the app.
        </p>
      </div>
    </motion.div>
  );
}