"use client";

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { contactSchema, type ContactForm as ContactFormType, type FormResponse } from '@/lib/schemas';

const subjectOptions = [
  { value: '', label: 'How can we help you?' },
  { value: "I'm planning my first visit", label: "I'm planning my first visit" },
  { value: 'I have questions about faith', label: 'I have questions about faith' },
  { value: 'I need prayer support', label: 'I need prayer support' },
  { value: 'I want to join a ministry', label: 'I want to join a ministry' },
  { value: "I'd like to volunteer", label: "I'd like to volunteer" },
  { value: 'Give a testimony', label: 'Give a testimony' },
  { value: 'Join a fellowship centre', label: 'Join a fellowship centre' },
  { value: 'Other', label: 'Other' },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Fallback reCAPTCHA execution using native API
  const executeRecaptchaFallback = useCallback(async (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action })
            .then(resolve)
            .catch(reject);
        });
      } else {
        reject(new Error('reCAPTCHA not available'));
      }
    });
  }, []);

  // Check if reCAPTCHA is ready
  useEffect(() => {
    const checkRecaptcha = () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setRecaptchaReady(true);
        });
      }
    };

    checkRecaptcha();

    // Fallback check after a delay
    const timeout = setTimeout(checkRecaptcha, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Execute reCAPTCHA v3 before form submission
    let recaptchaToken = '';
    try {
      if (executeRecaptcha) {
        // Try the library method first
        recaptchaToken = await executeRecaptcha('contact_form');
      } else if (recaptchaReady) {
        // Fallback to native API
        recaptchaToken = await executeRecaptchaFallback('contact_form');
      }
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Security verification failed. Please try again.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      const result: FormResponse = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: result.message,
        });
        reset(); // Clear the form
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.message,
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Something went wrong. Please try again later or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-amber-100/50 dark:border-gray-700/50">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Send Us a Message</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First Name *"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Last Name *"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        {/* Email */}
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com *"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        {/* Phone (Optional) */}
        <div>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone Number (Optional)"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        {/* Subject */}
        <div>
          <select 
            {...register('subject')}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
            disabled={isSubmitting}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>
        
        {/* Message */}
        <div>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Share your prayer requests, questions, or how we can support you... *"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 resize-none transition-all duration-300"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Honeypot field - hidden from users but visible to bots */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
          <label htmlFor="website">Website (leave blank):</label>
          <input
            {...register('website')}
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            placeholder="Leave this field empty"
            disabled={isSubmitting}
          />
        </div>

        {/* reCAPTCHA v3 - Invisible, executes automatically on form submission */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 disabled:bg-amber-600/50 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sending Message...</span>
            </div>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`mt-6 p-4 rounded-lg text-sm ${
          submitMessage.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
        }`}>
          {submitMessage.text}
        </div>
      )}
    </div>
  );
}