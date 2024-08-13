import { ForbiddenException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

export async function verifyUserCredentials(
  incomingPassword: string,
  currentPassword: string,
): Promise<void> {
  if (!(await bcryptjs.compare(incomingPassword, currentPassword))) {
    throw new ForbiddenException();
  }
}

export function hashUserPassword(password: string): string {
  const saltRounds = 10;
  return bcryptjs.hashSync(password, saltRounds);
}
