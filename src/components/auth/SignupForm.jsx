'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Phone, User, Lock, Eye, EyeOff, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const SignupForm = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get email from localStorage when component mounts
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to home page if email not found
      router.push('/');
    }
    
    // If form has been successfully submitted, redirect to confirmation page
    if (submitted) {
      const timer = setTimeout(() => {
        router.push('/confirmation');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  // Validação simples de email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Validate full name
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }

    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      // Parse the name into first and last name (if needed)
      const nameParts = formData.fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      // Create user data object for registration
      const userData = {
        email: email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        role: 'user',
      };

      // Call signup method from context
      const response = await signup(userData);
      
      if (response.success) {
        setSubmitted(true);
        
        // Store user details (in a real app, this would not be needed as the API would handle it)
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({
          name: userData.fullName,
          email: userData.email,
          role: 'user'
        }));
      } else {
        // Show error from API
        setErrors({ server: response.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      setErrors({ server: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  // Define password requirements and check if they're met
  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', met: formData.password.length >= 8 },
    {
      id: 'uppercase',
      label: 'At least one uppercase letter',
      met: /[A-Z]/.test(formData.password),
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter',
      met: /[a-z]/.test(formData.password),
    },
    { id: 'number', label: 'At least one number', met: /[0-9]/.test(formData.password) },
    {
      id: 'special',
      label: 'At least one special character',
      met: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  if (submitted) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 flex-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Check size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
          Account Created!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Please check your email to verify your account. Redirecting to the confirmation page...
        </p>
        <div className="animate-spin w-6 h-6 mx-auto">
          <Loader2 size={24} className="text-primary" />
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.server && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start"
        >
          <AlertCircle className="text-red-500 mr-2 mt-0.5 shrink-0" size={16} />
          <p className="text-red-700 dark:text-red-300 text-sm">{errors.server}</p>
        </motion.div>
      )}

      {/* Email display */}
      {email && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
            Signing up with: <span className="font-medium">{email}</span>
          </p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-zinc-400" />
          </div>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              errors.fullName ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'
            } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
            autoComplete="name"
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1.5 shrink-0" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone size={18} className="text-zinc-400" />
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              errors.phone ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'
            } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
            autoComplete="tel"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1.5 shrink-0" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-zinc-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className={`block w-full pl-10 pr-10 py-2.5 border ${
              errors.password ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'
            } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1.5 shrink-0" />
            {errors.password}
          </p>
        )}
        
        {/* Password strength meter */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 w-full rounded-full ${
                    passwordStrength >= level
                      ? level <= 2
                        ? 'bg-red-500'
                        : level <= 4
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>
            <div className="mt-2">
              <ul className="space-y-1">
                {passwordRequirements.map((req) => (
                  <li
                    key={req.id}
                    className="flex items-center text-sm"
                  >
                    {req.met ? (
                      <Check
                        size={14}
                        className="text-green-500 mr-1.5 shrink-0"
                      />
                    ) : (
                      <AlertCircle
                        size={14}
                        className="text-zinc-400 mr-1.5 shrink-0"
                      />
                    )}
                    <span
                      className={`${
                        req.met
                          ? 'text-zinc-700 dark:text-zinc-300'
                          : 'text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-zinc-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`block w-full pl-10 pr-10 py-2.5 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'
            } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1.5 shrink-0" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptTerms" className="text-zinc-600 dark:text-zinc-400">
            I agree to the{' '}
            <Link
              href="/terms"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Privacy Policy
            </Link>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-500">
              {errors.acceptTerms}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-2.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 font-medium"
        >
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;