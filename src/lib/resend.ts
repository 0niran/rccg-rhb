import { Resend } from 'resend';

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

    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    if (!fromEmail) {
      throw new Error('Missing required environment variable: FROM_EMAIL');
    }
    if (!toEmail) {
      throw new Error('Missing required environment variable: TO_EMAIL');
    }

    this.fromEmail = fromEmail;
    this.toEmail = toEmail;
  }

  private ensureInitialized() {
    if (!this.resend) {
      throw new Error('RESEND_API_KEY is not configured');
    }
  }

  async sendContactForm(data: ContactFormData) {
    this.ensureInitialized();
    const { firstName, lastName, email, phone, subject, message } = data;

    // Basic sanitization - escape HTML characters and remove script tags
    // Note: Zod validation already handles input validation at the API level
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''); // Remove script tags
    };

    const sanitizedData = {
      firstName: escapeHtml(firstName.trim()),
      lastName: escapeHtml(lastName.trim()),
      email: escapeHtml(email.trim()),
      phone: phone ? escapeHtml(phone.trim()) : '',
      subject: escapeHtml(subject.trim()),
      message: escapeHtml(message.trim()).replace(/\n/g, '<br>'),
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

    } catch (error: unknown) {
      console.error('Resend email error:', error);

      return {
        success: false,
        message: 'Unable to send your message at this time. Please try again later or call us directly at (519) 304-3600.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async sendGivingNotification(data: {
    eventType: 'succeeded' | 'failed' | 'processing';
    amount: number; // in cents
    currency: string;
    category: string;
    frequency: string;
    donorName: string;
    donorEmail: string;
    note?: string;
    stripeId: string;
    timestamp: string;
    failureReason?: string;
  }) {
    if (!this.resend) {
      console.warn('[resend] RESEND_API_KEY not set — skipping giving notification');
      return { success: false, message: 'Email service not configured' };
    }

    const { eventType, amount, currency, category, frequency, donorName, donorEmail, note, stripeId, timestamp, failureReason } = data;
    const formatted = new Intl.NumberFormat('en-CA', { style: 'currency', currency: currency.toUpperCase() }).format(amount / 100);
    const freqLabel: Record<string, string> = { one_time: 'One-time', weekly: 'Weekly', biweekly: 'Bi-weekly', monthly: 'Monthly' };

    const statusMap = {
      succeeded: { label: '✅ Payment Confirmed', colour: '#2d7a3a', bg: '#f0faf1' },
      failed:    { label: '❌ Payment Failed',    colour: '#b91c1c', bg: '#fef2f2' },
      processing:{ label: '⏳ Payment Processing', colour: '#92600a', bg: '#fffbeb' },
    };
    const { label: statusLabel, colour, bg } = statusMap[eventType];

    const subjectMap = {
      succeeded:  `Giving Received — ${formatted} (${category})`,
      failed:     `Giving Failed — ${formatted} (${category})`,
      processing: `Giving Processing — ${formatted} (${category})`,
    };

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#2C2C2C;">
        <div style="background:#1C1C1C;padding:24px 32px;">
          <h1 style="color:#C9A84C;margin:0;font-size:20px;font-weight:600;">Restoration House Brantford</h1>
          <p style="color:#ffffff80;margin:4px 0 0;font-size:13px;">Giving Notification</p>
        </div>
        <div style="background:${bg};border-left:4px solid ${colour};padding:16px 32px;margin:0;">
          <p style="color:${colour};font-weight:700;margin:0;font-size:15px;">${statusLabel}</p>
          ${failureReason ? `<p style="color:${colour};margin:6px 0 0;font-size:13px;">${failureReason}</p>` : ''}
        </div>
        <div style="padding:24px 32px;background:#ffffff;border:1px solid #e5e5e5;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#666;width:140px;">Amount</td><td style="padding:8px 0;font-weight:600;">${formatted}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Category</td><td style="padding:8px 0;">${category}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Frequency</td><td style="padding:8px 0;">${freqLabel[frequency] ?? frequency}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Donor</td><td style="padding:8px 0;">${donorName}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;">${donorEmail}</td></tr>
            ${note ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Note</td><td style="padding:8px 0;">${note}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#666;">Date</td><td style="padding:8px 0;">${new Date(timestamp).toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Stripe ID</td><td style="padding:8px 0;font-family:monospace;font-size:12px;color:#888;">${stripeId}</td></tr>
          </table>
        </div>
        <div style="padding:16px 32px;background:#f9f9f7;border:1px solid #e5e5e5;border-top:none;">
          <p style="color:#888;font-size:12px;margin:0;">
            Restoration House Brantford · 7 Burnley Ave, Brantford, ON N3T 1T5<br>
            This is an automated notification from your Stripe giving integration.
          </p>
        </div>
      </div>
    `;

    try {
      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to: this.toEmail,
        subject: subjectMap[eventType],
        html,
      });
      return { success: true, emailId: result.data?.id };
    } catch (err: unknown) {
      console.error('[resend] sendGivingNotification error:', err);
      return { success: false, message: err instanceof Error ? err.message : 'Unknown error' };
    }
  }

  // Health check method
  async testConnection() {
    this.ensureInitialized();
    try {
      // Just verify that Resend client is properly initialized
      // Don't send actual emails in test mode
      if (!this.resend) {
        throw new Error('Resend client not initialized');
      }

      return {
        success: true,
        message: 'Resend connection successful',
        fromEmail: this.fromEmail,
        toEmail: this.toEmail.substring(0, 3) + '***', // Partial email for security
      };

    } catch (error: unknown) {
      console.error('Resend connection test failed:', error);

      return {
        success: false,
        message: 'Resend connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const resendService = new ResendService();
export type { ContactFormData };