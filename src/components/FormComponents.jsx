'use client';

import { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

/**
 * Input Field Component
 * Reusable component for form inputs with label and error handling
 */
export const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          {label}
          {required && <span className="text-supporting-rose ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full p-3 ${
            type === 'password' ? 'pr-10' : ''
          } border transition-all duration-200 ${
            error
              ? 'border-supporting-rose bg-supporting-rose/5'
              : isFocused
                ? 'border-primary bg-white dark:bg-neutral-800'
                : 'border-neutral-300 bg-transparent'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-supporting-rose text-sm flex items-center">
          <AlertCircle
            size={14}
            className="mr-1.5 shrink-0"
          />
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Select Field Component
 * Reusable component for dropdown selects with label and error handling
 */
export const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          {label}
          {required && <span className="text-supporting-rose ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`w-full p-3 border transition-all duration-200 ${
          error
            ? 'border-supporting-rose bg-supporting-rose/5'
            : isFocused
              ? 'border-primary bg-white dark:bg-neutral-800'
              : 'border-neutral-300 bg-transparent'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed`}
      >
        <option
          value=""
          disabled
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.id || option.value}
            value={option.id || option.value}
          >
            {option.name || option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-supporting-rose text-sm flex items-center">
          <AlertCircle
            size={14}
            className="mr-1.5 shrink-0"
          />
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Checkbox Field Component
 * Reusable component for checkboxes with label and error handling
 */
export const CheckboxField = ({
  id,
  name,
  label,
  checked,
  onChange,
  error,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary disabled:opacity-50"
        />
      </div>
      <div className="ml-3 text-sm">
        {label ? (
          <label
            htmlFor={id}
            className="text-neutral-600 dark:text-neutral-400"
          >
            {label}
          </label>
        ) : (
          children
        )}
        {error && <p className="mt-1 text-supporting-rose text-sm">{error}</p>}
      </div>
    </div>
  );
};

/**
 * Password Strength Meter Component
 * Shows password strength and requirements
 */
export const PasswordStrengthMeter = ({ password }) => {
  // Calculate password strength
  const passwordStrength = (() => {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  })();

  // Define password requirements and check if they're met
  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
    {
      id: 'uppercase',
      label: 'At least one uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter',
      met: /[a-z]/.test(password),
    },
    { id: 'number', label: 'At least one number', met: /[0-9]/.test(password) },
    {
      id: 'special',
      label: 'At least one special character',
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1.5 w-full rounded-full ${
              passwordStrength >= level
                ? level <= 2
                  ? 'bg-supporting-rose'
                  : level <= 4
                    ? 'bg-supporting-amber'
                    : 'bg-supporting-teal'
                : 'bg-neutral-200 dark:bg-neutral-700'
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
                <CheckCircle
                  size={14}
                  className="text-supporting-teal mr-1.5 shrink-0"
                />
              ) : (
                <AlertCircle
                  size={14}
                  className="text-neutral-400 mr-1.5 shrink-0"
                />
              )}
              <span
                className={`${
                  req.met
                    ? 'text-neutral-700 dark:text-neutral-300'
                    : 'text-neutral-500'
                }`}
              >
                {req.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Submit Button Component
 * Reusable button for form submission with loading state
 */
export const SubmitButton = ({
  text,
  loadingText = 'Processing...',
  isLoading = false,
  icon,
  loadingIcon,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center ${className}`}
    >
      {isLoading ? (
        <>
          {loadingIcon}
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </button>
  );
};

/**
 * Form Section Container
 * Creates consistent spacing between form sections
 */
export const FormSection = ({ children, className = '' }) => {
  return <div className={`space-y-5 ${className}`}>{children}</div>;
};

/**
 * Form Grid Layout
 * Creates a responsive grid layout for form fields
 */
export const FormGrid = ({ children, columns = 2, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-5 ${className}`}
    >
      {children}
    </div>
  );
};
