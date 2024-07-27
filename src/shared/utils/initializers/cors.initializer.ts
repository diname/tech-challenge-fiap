import { INestApplication } from '@nestjs/common';

export const initializeCors = (application: INestApplication): void => {
  application.enableCors();
};
