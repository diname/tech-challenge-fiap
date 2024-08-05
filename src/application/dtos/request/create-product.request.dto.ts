import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductRequestDto {
  @ApiProperty({
    example: 'hamburger',
    description: `Products's name`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1',
    description: `Product categories`,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: '10',
    description: `Product price`,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'A Burger with prime beef and plenty of cheddar',
    description: `Products's description`,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'lanche.png',
    description: `product photo`,
  })
  @IsString()
  @IsNotEmpty()
  figureUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
