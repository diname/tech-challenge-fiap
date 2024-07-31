import { ApiProperty } from '@nestjs/swagger';

export class ProductReponseDto {
  @ApiProperty({
    description: 'Nome do produto.',
    example: 'Hambuguer',
  })
  public name: string;

  @ApiProperty({
    description: 'Nome do produto.',
  })
  public category: string;

  @ApiProperty({
    description: 'Preço do produto.',
  })
  public price: number;

  @ApiProperty({
    description: 'Descrição do produto.',
  })
  public description: string;
}
