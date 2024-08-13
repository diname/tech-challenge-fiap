import { ApiProperty } from '@nestjs/swagger';

export class ProductReponseDto {
  @ApiProperty({
    description: 'id do produto.',
  })
  public id: number;

  @ApiProperty({
    description: 'Nome do produto.',
    example: 'Hambuguer',
  })
  public name: string;

  @ApiProperty({
    description: 'Nome da categoria.',
    example: 'Lanche',
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

  @ApiProperty({
    description: 'Status do produto',
  })
  public enabled: boolean;

  @ApiProperty({
    description: 'Imagem do produto',
  })
  public figureUrl: string;
}
