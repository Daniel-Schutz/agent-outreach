'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Import reusable form components
import {
  InputField,
  PasswordStrengthMeter,
  CheckboxField,
  SubmitButton,
  FormSection,
} from '@/components/FormComponents';

// Define validation schema with Zod
const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});

// Add password matching validation
const validateForm = (data) => {
  const result = signupSchema.safeParse(data);

  if (!result.success) {
    // Convert Zod errors to a more usable format
    const formattedErrors = {};
    result.error.errors.forEach((error) => {
      formattedErrors[error.path[0]] = error.message;
    });
    return { success: false, errors: formattedErrors };
  }

  // Check if passwords match
  if (data.password !== data.confirmPassword) {
    return {
      success: false,
      errors: {
        ...result.errors,
        confirmPassword: "Passwords don't match",
      },
    };
  }

  return { success: true, data: result.data };
};

const BusinessSignupForm = () => {
  const { email, signup } = useAuth();
  const router = useRouter();
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

  useEffect(() => {
    // If form has been successfully submitted, redirect to confirmation page
    if (submitted) {
      const timer = setTimeout(() => {
        router.push('/confirmation');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

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
    const validation = validateForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      console.log('Submitting signup form...');

      // Call the signup function from your AuthContext with email included
      const response = await signup(
        {
          ...formData,
          email: email,
        },
        'business'
      );

      console.log('Signup response:', response);

      if (response && response.success) {
        console.log('Setting submitted to true');
        setSubmitted(true);
      } else {
        const errorMessage =
          response?.error || 'Failed to create account. Please try again.';
        console.error('Signup error:', errorMessage);
        setErrors({ server: errorMessage });
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error);
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

  if (submitted) {
    return (
      <motion.div
        className="max-w-md w-full mx-auto rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-white">
            Account Created!
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            Time to confirm your account. Redirecting you to the confirmation
            page...
          </p>
          <div className="animate-spin w-6 h-6 mx-auto">
            <Loader2
              size={24}
              className="text-primary"
            />
          </div>
        </div>
      </motion.div>
    );
  }

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
          Complete Your Registration
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Just a few more details to get you started
        </p>
        {email && (
          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg text-sm">
            <p className="text-neutral-700 dark:text-neutral-300">
              Signing up with: <span className="font-medium">{email}</span>
            </p>
          </div>
        )}
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
          {/* Full Name */}
          <InputField
            id="fullName"
            name="fullName"
            label="Full Name"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            error={errors.fullName}
            required
            autoComplete="name"
          />

          {/* Phone */}
          <InputField
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            error={errors.phone}
            required
            autoComplete="tel"
          />

          {/* Password */}
          <div>
            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              error={errors.password}
              required
              autoComplete="new-password"
            />
            <PasswordStrengthMeter password={formData.password} />
          </div>

          {/* Confirm Password */}
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          {/* Terms and Conditions */}
          <CheckboxField
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            error={errors.acceptTerms}
            className="pt-2"
          >
            <span className="text-neutral-600 dark:text-neutral-400">
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
            </span>
          </CheckboxField>

          {/* Submit Button */}
          <div className="pt-2">
            <SubmitButton
              text="Create Account"
              loadingText="Creating Account..."
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
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Log in
            </Link>
          </div>
        </FormSection>
      </form>
    </motion.div>
  );
};

export default BusinessSignupForm;
