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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const { email: storedEmail, setEmail } = useAuth();
  const router = useRouter();
  const [email, setLocalEmail] = useState(storedEmail || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendEmailSent, setResendEmailSent] = useState(false);

  // Update local email if stored email changes
  useEffect(() => {
    if (storedEmail) {
      setLocalEmail(storedEmail);
    }
  }, [storedEmail]);

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

      // If email is not in auth context, set it
      if (!storedEmail) {
        setEmail(email);
      }

      // Here you would call your Cognito verification function
      // For now, we'll simulate a successful verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setSuccess(true);

      // Redirect to login page after successful verification
      setTimeout(() => {
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

      // If email is not in auth context, set it
      if (!storedEmail) {
        setEmail(email);
      }

      // Here you would call your Cognito resend code function
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
    <div className="min-h-screen flex flex-col items-center bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-6"
            >
              <ArrowLeft
                size={16}
                className="mr-1"
              />
              Back to Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Verify Your <span className="text-primary">Account</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Enter the verification code sent to your email
            </p>
          </div>

          <motion.div
            className="w-full max-w-md bg-white dark:bg-neutral-800 shadow-sm rounded-lg sm:rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex-col-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex-center mb-6">
                <Mail
                  size={40}
                  className="text-primary"
                />
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Check Your Email
              </h2>
              <p className="text-center text-neutral-600 dark:text-neutral-300">
                We've sent a verification code to your email. Enter the code
                below to verify your account.
              </p>
            </div>

            {/* Verification form */}
            <form
              onSubmit={handleVerify}
              className="space-y-6"
            >
              {/* Error message */}
              {error && (
                <motion.div
                  className="p-3 bg-supporting-rose/10 border border-supporting-rose/30 rounded-lg flex items-start"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <AlertCircle
                    className="text-supporting-rose mr-2 mt-0.5 shrink-0"
                    size={16}
                  />
                  <p className="text-supporting-rose text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success message */}
              {success && (
                <motion.div
                  className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg flex items-start"
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
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg flex items-start"
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
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address <span className="text-supporting-rose">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setLocalEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full p-3 border ${
                    emailError
                      ? 'border-supporting-rose bg-supporting-rose/5'
                      : 'border-neutral-300 dark:border-neutral-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    storedEmail
                      ? 'bg-neutral-100 dark:bg-neutral-700/40 text-neutral-500 dark:text-neutral-400'
                      : ''
                  }`}
                  disabled={isLoading || success || !!storedEmail}
                  readOnly={!!storedEmail}
                />
                {emailError && (
                  <p className="mt-1 text-supporting-rose text-sm flex items-center">
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
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Verification Code{' '}
                  <span className="text-supporting-rose">*</span>
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter code"
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading || success}
                  maxLength={6}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || !verificationCode || success}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
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
                  className="text-primary hover:text-primary/80 text-sm font-medium disabled:text-neutral-400 disabled:cursor-not-allowed"
                >
                  {countdown > 0
                    ? `Resend code (${countdown}s)`
                    : "Didn't receive a code? Resend"}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                What happens next?
              </h3>
              <ol className="space-y-2">
                <li className="flex items-start">
                  <span className="flex-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                    1
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Enter the verification code from your email
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                    2
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Log in to your new account
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                    3
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Complete your profile and start finding the perfect
                    marketing agency
                  </p>
                </li>
              </ol>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
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
    </div>
  );
}
