import { Resend } from 'resend';
import createDOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

class ResendService {
  private resend: Resend | null = null;
  private fromEmail: string;
  private toEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    // Only initialize Resend if API key is available (skip during build)
    if (apiKey) {
      this.resend = new Resend(apiKey);
    }

    this.fromEmail = process.env.FROM_EMAIL || 'noreply@rccgbrantford.com';
    this.toEmail = process.env.TO_EMAIL || 'hello@rccgbrantford.com';
  }

  private ensureInitialized() {
    if (!this.resend) {
      throw new Error('RESEND_API_KEY is not configured');
    }
  }

  async sendContactForm(data: ContactFormData) {
    this.ensureInitialized();
    const { firstName, lastName, email, phone, subject, message } = data;

    // Initialize DOMPurify for content sanitization (server-side)
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window as any);

    // Sanitize all user inputs to prevent HTML injection
    const sanitizedData = {
      firstName: DOMPurify.sanitize(firstName, { ALLOWED_TAGS: [] }),
      lastName: DOMPurify.sanitize(lastName, { ALLOWED_TAGS: [] }),
      email: DOMPurify.sanitize(email, { ALLOWED_TAGS: [] }),
      phone: phone ? DOMPurify.sanitize(phone, { ALLOWED_TAGS: [] }) : '',
      subject: DOMPurify.sanitize(subject, { ALLOWED_TAGS: [] }),
      message: DOMPurify.sanitize(message, { ALLOWED_TAGS: ['br'], ALLOWED_ATTR: [] }),
    };

    try {
      // 1. Send notification to church admin using sanitized data
      const adminEmail = await this.resend!.emails.send({
        from: this.fromEmail,
        to: this.toEmail,
        subject: `New Contact Form: ${sanitizedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>

          <h3>Contact Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</li>
            <li><strong>Email:</strong> ${sanitizedData.email}</li>
            <li><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</li>
          </ul>

          <h3>Subject:</h3>
          <p><strong>${sanitizedData.subject}</strong></p>

          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${sanitizedData.message}</p>

          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Submitted: ${new Date().toLocaleString()}<br>
            Source: Church Website Contact Form
          </p>
        `,
      });

      // 2. Send auto-response to user using sanitized data
      const userEmail = await this.resend!.emails.send({
        from: this.fromEmail,
        to: sanitizedData.email,
        subject: 'Thank you for contacting Restoration House Brantford',
        html: `
          <h2>Thank you for reaching out!</h2>

          <p>Dear ${sanitizedData.firstName},</p>

          <p>Thank you for contacting Restoration House Brantford! We have received your message regarding "<strong>${sanitizedData.subject}</strong>" and will get back to you as soon as possible.</p>

          <p>Our team typically responds within 24-48 hours. If you need immediate assistance, please feel free to call us at <strong>(519) 304-3600</strong>.</p>

          <p>We look forward to connecting with you!</p>

          <p>Blessings,<br>
          <strong>The RHB Team</strong></p>

          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            <strong>Restoration House Brantford</strong><br>
            7 Burnley Ave, Brantford, ON N3T 1T5<br>
            (519) 304-3600 | hello@rccgbrantford.com<br>
            Member of the Redeemed Christian Church of God
          </p>
        `,
      });

      return {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24-48 hours. If you need immediate assistance, please call us at (519) 304-3600.',
        adminEmailId: adminEmail.data?.id,
        userEmailId: userEmail.data?.id,
      };

    } catch (error: any) {
      console.error('Resend email error:', error);
      
      return {
        success: false,
        message: 'Unable to send your message at this time. Please try again later or call us directly at (519) 304-3600.',
        error: error.message,
      };
    }
  }

  // Health check method
  async testConnection() {
    this.ensureInitialized();
    try {
      // Send a simple test email to verify configuration
      const testEmail = await this.resend!.emails.send({
        from: this.fromEmail,
        to: this.toEmail,
        subject: 'Resend Integration Test',
        html: '<p>This is a test email to verify Resend integration is working.</p>',
      });

      return {
        success: true,
        message: 'Resend connection successful',
        emailId: testEmail.data?.id,
      };

    } catch (error: any) {
      console.error('Resend connection test failed:', error);
      
      return {
        success: false,
        message: 'Resend connection failed',
        error: error.message,
      };
    }
  }
}

// Export singleton instance
export const resendService = new ResendService();
export type { ContactFormData };