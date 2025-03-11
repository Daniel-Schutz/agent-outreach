'use client';

import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-center dark:bg-neutral-900">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Log in to <span className="text-primary">Instantly Relevant</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Access your account to find the perfect marketing match
            </p>
          </div>

          <div className="w-full max-w-lg">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
