import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from '@Shared/decorators/is-cpf.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerUserDto {
  @ApiProperty({
    example: 'Frederico',
    description: `User's name`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'frederico11@gmail.com',
    description: `User's email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '90209432004',
    description: `User's cpf - identification`,
  })
  @IsCPF()
  cpf: string;
}
