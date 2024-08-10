// checkout-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PixDataDto {
  @ApiProperty({
    example:
      '00020126360014BR.GOV.BCB.PIX0114+55819999999970206ABCD5802BR5925Merchant Name6009City Name62070503***6304ABCD',
  })
  merchantAccount: string;

  @ApiProperty({ example: '532.543.888-22' })
  userCPF: string;

  @ApiProperty({ example: '100.00' })
  transactionAmount: number;

  @ApiProperty({ example: 'BRL' })
  currency: string;

  @ApiProperty({ example: '1234567890' })
  transactionId: string;

  @ApiProperty({
    example:
      '00020126360014BR.GOV.BCB.PIX0114+55819999999970206ABCD5802BR5925Merchant Name6009City Name62070503***6304ABCD',
  })
  qrCode: string;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  expirationDate: string;
}

export class CheckoutResponseDto {
  @ApiProperty({ type: PixDataDto })
  pixData: PixDataDto;

  @ApiProperty({ example: 'Checkout successfully completed' })
  message: string;
}
