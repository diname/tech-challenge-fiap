import { ApiProperty } from '@nestjs/swagger';

export class CheckoutResponseDto {
  @ApiProperty({
    description: 'EMV do pagamento',
    example: 'testEMV',
  })
  emv: string;
}
