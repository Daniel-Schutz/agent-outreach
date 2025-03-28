'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle,
  ArrowRight,
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

export default function ConfirmationPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendEmailSent, setResendEmailSent] = useState(false);

  // Get email from localStorage when component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to home page if email not found
      router.push('/');
    }
  }, [router]);

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle verification code submission
  const handleVerify = async (e) => {
    e.preventDefault();

    // Validate inputs
    let hasError = false;

    if (!email) {
      setEmailError('Please enter your email address');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!verificationCode) {
      setError('Please enter the verification code');
      hasError = true;
    } else {
      setError('');
    }

    if (hasError) return;

    try {
      setIsLoading(true);

      // For demo, we'll simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setSuccess(true);

      // Redirect to login page after successful verification
      setTimeout(() => {
        // For demo purposes, store that user is verified
        localStorage.setItem('demoVerified', 'true');
        router.push('/login');
      }, 2000);
    } catch (err) {
      console.error('Verification error:', err);
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate resending verification code
  const handleResendCode = async () => {
    // Validate email before sending
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setEmailError('');

      // Simulate sending code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setResendEmailSent(true);
      setCountdown(60);

      // Hide the success message after 5 seconds
      setTimeout(() => {
        setResendEmailSent(false);
      }, 5000);
    } catch (err) {
      console.error('Resend code error:', err);
      setError('Failed to resend verification code. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 bg-zinc-50 dark:bg-zinc-900 mt-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="mb-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6"
              >
                <ArrowLeft
                  size={16}
                  className="mr-1"
                />
                Back to Home
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Verify Your <span className="text-primary">Account</span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                Enter the verification code sent to your email
              </p>
            </div>

            <motion.div
              className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-xl p-8 border border-zinc-200 dark:border-zinc-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex-col-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex-center mb-6">
                  <Mail
                    size={32}
                    className="text-primary"
                  />
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  Check Your Email
                </h2>
                <p className="text-center text-zinc-600 dark:text-zinc-300">
                  We've sent a verification code to your email. Enter the code
                  below to verify your account.
                </p>
              </div>

              {/* Rest of the form */}
              <form
                onSubmit={handleVerify}
                className="space-y-6"
              >
                {/* Error message */}
                {error && (
                  <motion.div
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <AlertCircle
                      className="text-red-500 mr-2 mt-0.5 shrink-0"
                      size={16}
                    />
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Success message */}
                {success && (
                  <motion.div
                    className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <CheckCircle
                      className="text-green-600 dark:text-green-400 mr-2 mt-0.5 shrink-0"
                      size={16}
                    />
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Account verified successfully! Redirecting to login...
                    </p>
                  </motion.div>
                )}

                {/* Resend email confirmation */}
                {resendEmailSent && (
                  <motion.div
                    className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <Mail
                      className="text-blue-600 dark:text-blue-400 mr-2 mt-0.5 shrink-0"
                      size={16}
                    />
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      A new verification code has been sent to your email!
                    </p>
                  </motion.div>
                )}

                {/* Email input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    placeholder="Enter your email address"
                    className={`block w-full p-3 border ${
                      emailError
                        ? 'border-red-500'
                        : 'border-zinc-300 dark:border-zinc-600'
                    } rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white`}
                    disabled={isLoading || success}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle
                        size={14}
                        className="mr-1.5 shrink-0"
                      />
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Verification code input */}
                <div>
                  <label
                    htmlFor="verificationCode"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Verification Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter 6-digit code"
                    className="block w-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800/50 dark:text-white"
                    disabled={isLoading || success}
                    maxLength={6}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading || !verificationCode || success}
                  className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin mr-2"
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Account
                      <ArrowRight
                        size={16}
                        className="ml-2"
                      />
                    </>
                  )}
                </button>

                {/* Resend code button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={countdown > 0 || isLoading || success}
                    className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw size={14} className="mr-1" />
                    {countdown > 0
                      ? `Resend code (${countdown}s)`
                      : "Didn't receive a code? Resend"}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-3">
                  What happens next?
                </h3>
                <ol className="space-y-2">
                  <li className="flex items-start">
                    <span className="flex-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                      1
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Enter the verification code from your email
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                      2
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Log in to your new Outreach Agent account
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                      3
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Set up your first outreach campaign and start connecting with prospects
                    </p>
                  </li>
                </ol>
              </div>
            </motion.div>

            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Need help?{' '}
                <a
                  href="/contact"
                  className="text-primary hover:underline"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}