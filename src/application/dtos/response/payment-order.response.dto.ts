import { ApiProperty } from '@nestjs/swagger';

export class PaymentOrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  email: string;
}
