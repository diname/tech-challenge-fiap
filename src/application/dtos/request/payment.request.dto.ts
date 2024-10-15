import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentRequestDto {
  @ApiProperty({
    example: 'payment.approved',
    description: `payment status`,
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    example: 'v1',
    description: `API version`,
  })
  @IsString()
  @IsNotEmpty()
  api_version: string;

  @ApiProperty({
    example: 'orderId : 3',
    description: `order number`,
  })
  @IsNumber()
  @IsNotEmpty()
  data: {
    orderId: number;
  };

  @ApiProperty({
    example: '2024-10-15T16:08:56Z',
    description: `date created`,
  })
  @IsString()
  @IsNotEmpty()
  date_created: string;

  @ApiProperty({
    example: '116407150649',
    description: `payment id`,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'false',
    description: `live mode`,
  })
  @IsBoolean()
  @IsNotEmpty()
  live_mode: boolean;

  @ApiProperty({
    example: 'payment',
    description: `type`,
  })
  @IsNumber()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: '350769682',
    description: `user id`,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: string;
}
