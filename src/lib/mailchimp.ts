import mailchimp from '@mailchimp/mailchimp_marketing';

interface MailchimpConfig {
  apiKey: string;
  audienceId: string;
  serverPrefix: string;
}

interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface MailchimpError {
  status: number;
  title?: string;
  detail?: string;
}

class MailchimpService {
  private config: MailchimpConfig;
  private isInitialized = false;

  constructor() {
    this.config = {
      apiKey: process.env.MAILCHIMP_API_KEY || '',
      audienceId: process.env.MAILCHIMP_AUDIENCE_ID || '',
      serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1',
    };
  }

  private initialize() {
    if (this.isInitialized) return;

    if (!this.config.apiKey || !this.config.audienceId) {
      throw new Error('Mailchimp configuration is incomplete. Please check your environment variables.');
    }

    mailchimp.setConfig({
      apiKey: this.config.apiKey,
      server: this.config.serverPrefix,
    });

    this.isInitialized = true;
  }

  async subscribeUser(subscriberData: SubscriberData) {
    try {
      this.initialize();

      const { email, firstName, lastName } = subscriberData;

      // Prepare merge fields for Mailchimp
      const mergeFields: Record<string, string> = {};
      if (firstName) mergeFields.FNAME = firstName;
      if (lastName) mergeFields.LNAME = lastName;

      // Add subscriber to the audience
      const response = await mailchimp.lists.addListMember(this.config.audienceId, {
        email_address: email,
        status: 'subscribed' as const,
        merge_fields: mergeFields,
        tags: ['Website Signup'], // Tag to identify website subscriptions
      });

      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        mailchimpId: (response as any).id || 'unknown',
      };

    } catch (error: any) {
      console.error('Mailchimp subscription error:', error);

      // Handle specific Mailchimp errors
      if (error.status === 400) {
        // Check if user is already subscribed
        if (error.response?.body?.title === 'Member Exists' || 
            error.response?.text?.includes('Member Exists')) {
          return {
            success: false,
            message: 'This email is already subscribed to our newsletter.',
            error: 'ALREADY_SUBSCRIBED',
          };
        }

        // Invalid email format
        if (error.response?.body?.detail?.includes('valid email') ||
            error.response?.text?.includes('valid email')) {
          return {
            success: false,
            message: 'Please enter a valid email address.',
            error: 'INVALID_EMAIL',
          };
        }
      }

      // Generic error handling
      return {
        success: false,
        message: 'Unable to subscribe at this time. Please try again later or contact us directly.',
        error: 'SUBSCRIPTION_FAILED',
      };
    }
  }

  async updateSubscriber(email: string, updateData: Partial<SubscriberData>) {
    try {
      this.initialize();

      const subscriberHash = this.getSubscriberHash(email);
      const mergeFields: Record<string, string> = {};
      
      if (updateData.firstName) mergeFields.FNAME = updateData.firstName;
      if (updateData.lastName) mergeFields.LNAME = updateData.lastName;

      const response = await mailchimp.lists.updateListMember(
        this.config.audienceId,
        subscriberHash,
        {
          merge_fields: mergeFields,
        }
      );

      return {
        success: true,
        message: 'Subscriber information updated successfully.',
        mailchimpId: (response as any).id || 'unknown',
      };

    } catch (error: any) {
      console.error('Mailchimp update error:', error);
      
      return {
        success: false,
        message: 'Unable to update subscriber information.',
        error: 'UPDATE_FAILED',
      };
    }
  }

  async getSubscriberInfo(email: string) {
    try {
      this.initialize();

      const subscriberHash = this.getSubscriberHash(email);
      const response = await mailchimp.lists.getListMember(
        this.config.audienceId,
        subscriberHash
      );

      const typedResponse = response as any;
      return {
        success: true,
        subscriber: {
          email: typedResponse.email_address || '',
          status: typedResponse.status || 'unknown',
          firstName: typedResponse.merge_fields?.FNAME || '',
          lastName: typedResponse.merge_fields?.LNAME || '',
          subscribedAt: typedResponse.timestamp_opt || '',
        },
      };

    } catch (error: any) {
      console.error('Mailchimp get subscriber error:', error);

      if (error.status === 404) {
        return {
          success: false,
          message: 'Subscriber not found.',
          error: 'NOT_FOUND',
        };
      }

      return {
        success: false,
        message: 'Unable to retrieve subscriber information.',
        error: 'FETCH_FAILED',
      };
    }
  }

  private getSubscriberHash(email: string): string {
    // Mailchimp uses MD5 hash of lowercase email as subscriber ID
    const crypto = require('crypto');
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }

  // Health check method to verify configuration
  async testConnection() {
    try {
      this.initialize();

      // Try to get audience info to test connection
      const response = await (mailchimp.lists as any).getList(this.config.audienceId);

      return {
        success: true,
        message: 'Mailchimp connection successful.',
        audienceName: response?.name || 'Unknown',
        memberCount: response?.stats?.member_count || 0,
      };

    } catch (error: any) {
      console.error('Mailchimp connection test failed:', error);
      
      return {
        success: false,
        message: 'Mailchimp connection failed. Please check your configuration.',
        error: error.message,
      };
    }
  }
}

// Export singleton instance
export const mailchimpService = new MailchimpService();
export type { SubscriberData };