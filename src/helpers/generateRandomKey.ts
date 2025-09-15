import crypto from 'crypto';

export function generateSecureKey() {
  return crypto.randomBytes(3).toString('hex');
}
