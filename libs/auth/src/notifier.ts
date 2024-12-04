import { INotifyService } from '@baijanstack/express-auth';
import { logger } from '@libs/core-contract/utils/logger';

export class EmailNotificationService implements INotifyService {
  async sendTokenStolen(email: string): Promise<void> {
    logger.info(`Notifying | TOKEN_STOLEN | Email: ${email}`);
  }
  async sendOtp(
    email: string,
    payload: { code: string; generatedAt: number }
  ): Promise<void> {
    logger.info(`Notifying | OTP | Email: ${email}`, payload);
  }
  async notifyEmailVerified(email: string): Promise<void> {
    logger.info(`Notifying | EMAIL_VERIFIED | Email: ${email}`);
  }
}
