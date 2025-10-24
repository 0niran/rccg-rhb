import { z } from 'zod';

// Security validation patterns
const nameRegex = /^[a-zA-Z\s\-'\.]{2,50}$/;
const messageContentRegex = /^[\w\s\.,!?;:()\-'"@#$%&*+/=\[\]{}|~`^<>\n\r]{10,1000}$/;
const phoneRegex = /^[\+]?[1-9]\d{1,14}$/; // More strict E.164 format

// Content quality validation functions
const validateContentQuality = (text: string, fieldName: string) => {
  // Check for excessive repetition of characters
  if (/(.)\1{4,}/.test(text)) {
    return `${fieldName} contains too many repeated characters`;
  }

  // Check for random-looking strings (high consonant-to-vowel ratio)
  const vowels = text.toLowerCase().match(/[aeiou]/g)?.length || 0;
  const consonants = text.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g)?.length || 0;
  if (consonants > 0 && vowels / consonants < 0.2) {
    return `${fieldName} appears to contain invalid content`;
  }

  // Check for excessive uppercase (potential spam)
  const uppercaseRatio = (text.match(/[A-Z]/g)?.length || 0) / text.length;
  if (uppercaseRatio > 0.7 && text.length > 10) {
    return `${fieldName} contains too many uppercase letters`;
  }

  return null;
};

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  firstName: z
    .string()
    .max(50, 'Name must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  // Honeypot field for bot detection
  website: z.string().max(0, 'Invalid submission').optional(),
});

// Contact form schema with enhanced security validation
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(nameRegex, 'Please enter a valid first name using only letters, spaces, hyphens, apostrophes, and periods')
    .refine((name) => {
      const error = validateContentQuality(name, 'First name');
      return !error;
    }, 'Please enter a valid first name'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(nameRegex, 'Please enter a valid last name using only letters, spaces, hyphens, apostrophes, and periods')
    .refine((name) => {
      const error = validateContentQuality(name, 'Last name');
      return !error;
    }, 'Please enter a valid last name'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(254, 'Email address is too long'), // RFC 5321 limit
  phone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone || phone.trim() === '') return true;
      // Remove all non-digits for validation
      const digitsOnly = phone.replace(/\D/g, '');
      return phoneRegex.test(digitsOnly);
    }, 'Please enter a valid phone number'),
  subject: z
    .string()
    .min(1, 'Please select how we can help you')
    .max(100, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .regex(messageContentRegex, 'Message contains invalid characters')
    .refine((msg) => {
      const error = validateContentQuality(msg, 'Message');
      return !error;
    }, 'Please enter a meaningful message'),
  // Honeypot field for bot detection
  website: z.string().max(0, 'Invalid submission').optional(),
});

export type NewsletterForm = z.infer<typeof newsletterSchema>;
export type ContactForm = z.infer<typeof contactSchema>;

// Form submission responses
export interface FormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}