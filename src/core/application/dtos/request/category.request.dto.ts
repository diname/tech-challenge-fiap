import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @ApiProperty({
    example: 'Lanche',
    description: `Nome da categoria`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
