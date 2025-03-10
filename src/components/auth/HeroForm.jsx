// src/components/HeroForm.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Define email schema with Zod
const emailSchema = z.string().email('Please enter a valid email address');

const HeroForm = () => {
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { email, setEmail } = useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate email with Zod
      emailSchema.parse(email);
      setEmailError('');

      // Simulate checking if email exists
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);

      // Move to next step
      setStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
    }
  };

  const handleUserTypeSelect = (type) => {
    // Redirect to appropriate registration page
    if (type === 'business') {
      router.push('/register/business');
    } else {
      router.push('/register/agency');
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="email-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-4"
            >
              <h2 className="text-xl font-semibold text-neutral-800">
                Get started with Instantly Relevant
              </h2>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your email"
                  className={`w-full p-3 pr-12 border ${
                    emailError ? 'border-supporting-rose' : 'border-neutral-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="user-type-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-neutral-800">
                I am a...
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUserTypeSelect('business')}
                  className="p-4 border border-neutral-200 rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-medium text-neutral-800">Business</h3>
                  <p className="text-sm text-neutral-600">
                    Looking for marketing services
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUserTypeSelect('agency')}
                  className="p-4 border border-neutral-200 rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-medium text-neutral-800">Agency</h3>
                  <p className="text-sm text-neutral-600">
                    Offering marketing services
                  </p>
                </motion.button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-sm text-neutral-500 hover:text-neutral-700 mt-2"
              >
                &larr; Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroForm;
