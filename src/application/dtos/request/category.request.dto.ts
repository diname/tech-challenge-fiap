import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryRequestDto {
  @ApiProperty({
    example: 'Lanche',
    description: `Nome da categoria`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'Lanche',
    description: `Nome da categoria`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
