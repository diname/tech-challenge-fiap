import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'frederico11@gmail.com',
    description: `User's email`,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
