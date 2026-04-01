import crypto from 'node:crypto';
import mailchimp from '@mailchimp/mailchimp_marketing';

interface MailchimpConfig {
  apiKey: string;
  audienceId: string;
  serverPrefix: string;
}

export interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface MailchimpApiError {
  status?: number;
  response?: {
    body?: { title?: string; detail?: string };
    text?: string;
  };
  message?: string;
}

function isMailchimpError(error: unknown): error is MailchimpApiError {
  return typeof error === 'object' && error !== null;
}

interface MailchimpMember {
  id?: string;
  email_address?: string;
  status?: string;
  merge_fields?: { FNAME?: string; LNAME?: string };
  timestamp_opt?: string;
}

interface MailchimpList {
  name?: string;
  stats?: { member_count?: number };
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

      const mergeFields: Record<string, string> = {};
      if (firstName) mergeFields.FNAME = firstName;
      if (lastName) mergeFields.LNAME = lastName;

      const response = await mailchimp.lists.addListMember(this.config.audienceId, {
        email_address: email,
        status: 'subscribed' as const,
        merge_fields: mergeFields,
        tags: ['Website Signup'],
      });

      const member = response as MailchimpMember;
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        mailchimpId: member.id ?? 'unknown',
      };

    } catch (error: unknown) {
      console.error('Mailchimp subscription error:', error);

      if (isMailchimpError(error) && error.status === 400) {
        const body = error.response?.body;
        const text = error.response?.text ?? '';

        if (body?.title === 'Member Exists' || text.includes('Member Exists')) {
          return {
            success: false,
            message: 'This email is already subscribed to our newsletter.',
            error: 'ALREADY_SUBSCRIBED',
          };
        }

        if (body?.detail?.includes('valid email') || text.includes('valid email')) {
          return {
            success: false,
            message: 'Please enter a valid email address.',
            error: 'INVALID_EMAIL',
          };
        }
      }

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
        { merge_fields: mergeFields }
      );

      const member = response as MailchimpMember;
      return {
        success: true,
        message: 'Subscriber information updated successfully.',
        mailchimpId: member.id ?? 'unknown',
      };

    } catch (error: unknown) {
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

      const member = response as MailchimpMember;
      return {
        success: true,
        subscriber: {
          email: member.email_address ?? '',
          status: member.status ?? 'unknown',
          firstName: member.merge_fields?.FNAME ?? '',
          lastName: member.merge_fields?.LNAME ?? '',
          subscribedAt: member.timestamp_opt ?? '',
        },
      };

    } catch (error: unknown) {
      console.error('Mailchimp get subscriber error:', error);

      if (isMailchimpError(error) && error.status === 404) {
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
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }

  async testConnection() {
    try {
      this.initialize();

      const response = await (mailchimp.lists as unknown as { getList: (id: string) => Promise<MailchimpList> })
        .getList(this.config.audienceId);

      return {
        success: true,
        message: 'Mailchimp connection successful.',
        audienceName: response?.name ?? 'Unknown',
        memberCount: response?.stats?.member_count ?? 0,
      };

    } catch (error: unknown) {
      console.error('Mailchimp connection test failed:', error);
      return {
        success: false,
        message: 'Mailchimp connection failed. Please check your configuration.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const mailchimpService = new MailchimpService();
