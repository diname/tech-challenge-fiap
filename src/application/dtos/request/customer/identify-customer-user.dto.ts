import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdentifyCustomerUserDto {
  @ApiProperty({
    example: '90209432004',
    description: `User's cpf - identification`,
  })
  @IsString()
  cpf: string;
}
