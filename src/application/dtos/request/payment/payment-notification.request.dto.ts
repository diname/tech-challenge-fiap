import { IsString } from 'class-validator';

export class PaymentNotificationDto {
  @IsString()
  topic: string;

  @IsString()
  resource: string;
}
