import { IsString } from 'class-validator';

export class PaymentResponseDto {
  @IsString()
  in_store_order_id: string;

  @IsString()
  qr_data: string;
}
