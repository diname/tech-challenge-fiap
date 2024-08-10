import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export async function verifyUserCredentials(
  incomingPassword: string,
  currentPassword: string,
): Promise<void> {
  if (!(await bcrypt.compare(incomingPassword, currentPassword))) {
    throw new ForbiddenException();
  }
}

export function hashUserPassword(password: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}
