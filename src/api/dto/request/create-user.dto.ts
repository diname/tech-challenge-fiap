import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Frederico',
    description: `User's name`,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

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
  @IsString()
  cpf: string;
}
