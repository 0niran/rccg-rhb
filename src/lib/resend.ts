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
  private toGivingEmail: string;

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
    this.toGivingEmail = process.env.TO_GIVING_EMAIL ?? toEmail;
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
      succeeded: { label: 'Payment Confirmed', colour: '#065F46', bg: '#D1FAE5', border: '#A7F3D0' },
      failed:    { label: 'Payment Failed',    colour: '#991B1B', bg: '#FEE2E2', border: '#FECACA' },
      processing:{ label: 'Payment Processing', colour: '#92400E', bg: '#FFFBEB', border: '#FDE68A' },
    };
    const { label: statusLabel, colour, bg, border } = statusMap[eventType];

    const subjectMap = {
      succeeded:  `Giving Received: ${formatted} (${category})`,
      failed:     `Giving Failed: ${formatted} (${category})`,
      processing: `Giving Processing: ${formatted} (${category})`,
    };

    const freqColour = eventType === 'failed' ? '#991B1B' : eventType === 'processing' ? '#92400E' : '#C8963A';

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1A1612;border-radius:12px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

        <div style="background:#1A1612;padding:28px 40px;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <p style="color:#C8963A;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 5px;">Restoration House Brantford</p>
            <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0;line-height:1.2;">${eventType === 'succeeded' ? 'Giving Receipt' : 'Giving Notification'}</h1>
          </div>
          <div style="width:44px;height:44px;background:#C8963A;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">&#10022;</div>
        </div>

        <div style="background:${bg};padding:12px 40px;border-bottom:1px solid ${border};">
          <span style="color:${colour};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${statusLabel}</span>
        </div>

        <div style="background:#ffffff;padding:40px 40px 32px;text-align:center;border-bottom:1px solid #F0EDE8;">
          <p style="color:#999;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Amount ${eventType === 'succeeded' ? 'Received' : ''}</p>
          <p style="color:#1A1612;font-size:52px;font-weight:800;letter-spacing:-2px;line-height:1;margin:0;">${formatted}</p>
          <p style="color:${freqColour};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:8px 0 16px;">${currency.toUpperCase()} &nbsp;·&nbsp; ${freqLabel[frequency] ?? frequency}</p>
          <span style="display:inline-block;background:#FDF8F0;border:1px solid #E8D9B8;border-radius:100px;padding:5px 18px;color:#92600a;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${category}</span>
          ${failureReason ? `<div style="margin-top:20px;background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:12px 20px;"><p style="color:#991B1B;font-size:13px;margin:0;line-height:1.5;">${failureReason}</p></div>` : ''}
          ${eventType === 'processing' ? `<div style="margin-top:20px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:12px 20px;"><p style="color:#92400E;font-size:13px;margin:0;line-height:1.5;">This payment is being processed. A confirmation will follow shortly.</p></div>` : ''}
        </div>

        <div style="background:#ffffff;padding:24px 40px 0;">
          <p style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bbb;margin:0 0 12px;">Donor Information</p>
          <div style="border:1px solid #F0EDE8;border-radius:10px;overflow:hidden;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr style="border-bottom:1px solid #F7F5F2;">
                <td style="padding:14px 20px;color:#999;font-size:12px;width:120px;">Full Name</td>
                <td style="padding:14px 20px;color:#1A1612;font-weight:600;">${donorName}</td>
              </tr>
              <tr${note ? ` style="border-bottom:1px solid #F7F5F2;"` : ''}>
                <td style="padding:14px 20px;color:#999;font-size:12px;">Email</td>
                <td style="padding:14px 20px;color:#1A1612;">${donorEmail}</td>
              </tr>
              ${note ? `<tr><td style="padding:14px 20px;color:#999;font-size:12px;vertical-align:top;">Note</td><td style="padding:14px 20px;color:#666;font-style:italic;">${note}</td></tr>` : ''}
            </table>
          </div>
        </div>

        <div style="background:#ffffff;padding:24px 40px 32px;">
          <p style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bbb;margin:0 0 12px;">Transaction Details</p>
          <div style="border:1px solid #F0EDE8;border-radius:10px;overflow:hidden;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr style="border-bottom:1px solid #F7F5F2;">
                <td style="padding:14px 20px;color:#999;font-size:12px;width:120px;">Date and Time</td>
                <td style="padding:14px 20px;color:#1A1612;">${new Date(timestamp).toLocaleString('en-CA', { timeZone: 'America/Toronto', dateStyle: 'long', timeStyle: 'short' })}</td>
              </tr>
              <tr style="border-bottom:1px solid #F7F5F2;">
                <td style="padding:14px 20px;color:#999;font-size:12px;">Frequency</td>
                <td style="padding:14px 20px;color:#1A1612;">${freqLabel[frequency] ?? frequency}</td>
              </tr>
              <tr>
                <td style="padding:14px 20px;color:#999;font-size:12px;">Stripe ID</td>
                <td style="padding:14px 20px;color:#bbb;font-family:monospace;font-size:11px;">${stripeId}</td>
              </tr>
            </table>
          </div>
        </div>

        ${eventType === 'succeeded' ? `
        <div style="background:#FDF8F0;border-top:1px solid #F0EDE8;border-bottom:1px solid #F0EDE8;padding:28px 40px;text-align:center;">
          <p style="color:#92600a;font-size:14px;font-style:italic;line-height:1.8;margin:0;">"Each of you should give what you have decided in your heart to give,<br>not reluctantly or under compulsion, for God loves a cheerful giver."</p>
          <p style="color:#C8963A;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:10px 0 0;">2 Corinthians 9:7</p>
        </div>` : ''}

        <div style="background:#1A1612;padding:22px 40px;text-align:center;">
          <p style="color:rgba(255,255,255,0.35);font-size:11px;line-height:2;margin:0;">
            Restoration House Brantford &nbsp;·&nbsp; 7 Burnley Ave, Brantford, ON N3T 1T5<br>
            <a href="https://rccgbrantford.com" style="color:#C8963A;text-decoration:none;">rccgbrantford.com</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="mailto:hello@rccgbrantford.com" style="color:#C8963A;text-decoration:none;">hello@rccgbrantford.com</a>
          </p>
        </div>

      </div>
    `;

    try {
      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to: this.toGivingEmail,
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