import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

export class ProductUpdateRequestDto {
  @ApiProperty({
    example: 'hamburger',
    description: `Products's name`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: `Product categories`,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 10,
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

  @ApiProperty({
    example: false,
    description: `enable product`,
  })
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
