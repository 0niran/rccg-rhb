import { z } from 'zod';

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  firstName: z.string().optional(),
});

// Contact form schema
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  phone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone) return true;
      // Allow various phone formats
      const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
      return phoneRegex.test(phone);
    }, 'Please enter a valid phone number'),
  subject: z
    .string()
    .min(1, 'Please select how we can help you'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type NewsletterForm = z.infer<typeof newsletterSchema>;
export type ContactForm = z.infer<typeof contactSchema>;

// Form submission responses
export interface FormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}