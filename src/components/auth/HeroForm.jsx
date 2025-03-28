'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { ChevronRight, Loader2, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define email schema with Zod
const emailSchema = z.string().email('Please enter a valid email address');

const HeroForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate email with Zod
      emailSchema.parse(email);
      setEmailError('');
      setIsLoading(true);

      // Check if email already exists (custom check if needed)
      // This is just an example of how you might want to check if the email exists
      // before redirecting to registration
      try {
        // You can implement this check if needed in your API
        // For now, we'll just proceed to registration
        
        // Store email in localStorage for registration process
        localStorage.setItem('userEmail', email);
        
        // Redirect to registration page
        router.push('/register');
      } catch (error) {
        console.error('Error checking email:', error);
        setEmailError('An error occurred. Please try again.');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Personalized outreach at scale",
    "Smart scheduling for optimal timing",
    "AI-powered follow-up sequences",
    "Detailed analytics and reporting"
  ];

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
          Start your free 14-day trial
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          No credit card required. Cancel anytime.
        </p>
      </div>

      <motion.div
        key="email-step"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col gap-4"
        >
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Work Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="name@company.com"
                className={`input-base pr-12 ${
                  emailError ? 'border-supporting-rose focus:ring-supporting-rose' : ''
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !email}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Continue"
              >
                {isLoading ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
            </div>
          </div>

          {emailError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-supporting-rose text-sm flex items-center gap-1"
            >
              <AlertCircle size={14} />
              {emailError}
            </motion.p>
          )}

          <div className="mt-2">
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                  <Check size={16} className="text-primary mr-2 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroForm;