'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Import reusable form components
import {
  InputField,
  SubmitButton,
  FormSection,
} from '@/components/FormComponents';

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const validateForm = (data) => {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    // Convert Zod errors to a more usable format
    const formattedErrors = {};
    result.error.errors.forEach((error) => {
      formattedErrors[error.path[0]] = error.message;
    });
    return { success: false, errors: formattedErrors };
  }

  return { success: true, data: result.data };
};

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // State for login form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    const validation = validateForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      // Call the login function from your AuthContext with separate email and password props
      const response = await login(formData.email, formData.password);

      if (response && response.success) {
        // Redirect to dashboard or home page
        router.push('/dashboard');
      } else {
        const errorMessage =
          response?.error || 'Invalid email or password. Please try again.';
        setErrors({ server: errorMessage });
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      setErrors({ server: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-4"
        >
          <ArrowLeft
            size={16}
            className="mr-1"
          />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Log in to your Instantly Relevant account
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {errors.server && (
          <div className="p-3 mb-5 bg-supporting-rose/10 border border-supporting-rose/30 rounded-lg flex items-start">
            <AlertCircle
              className="text-supporting-rose mr-2 mt-0.5 shrink-0"
              size={16}
            />
            <p className="text-supporting-rose text-sm">{errors.server}</p>
          </div>
        )}

        <FormSection>
          {/* Email */}
          <InputField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            error={errors.email}
            required
            autoComplete="email"
          />

          {/* Password */}
          <div className="space-y-1">
            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              error={errors.password}
              required
              autoComplete="current-password"
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <SubmitButton
              text="Log In"
              loadingText="Logging In..."
              isLoading={isLoading}
              loadingIcon={
                <Loader2
                  size={20}
                  className="animate-spin mr-2"
                />
              }
            />
          </div>

          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 pt-2">
            Don't have an account?{' '}
            <Link
              href="/"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up
            </Link>
          </div>
        </FormSection>
      </form>
    </motion.div>
  );
};

export default LoginForm;
