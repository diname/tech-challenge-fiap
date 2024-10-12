import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: `Id categoria`,
  })
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
