import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'ID único do produto no banco de dados.',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: 'Nome do produto.',
    example: 'Hambúrguer',
  })
  public name: string;

  @ApiProperty({
    description: 'Nome da categoria à qual o produto pertence.',
    example: 'Lanche',
  })
  public category: string;

  @ApiProperty({
    description: 'Preço do produto em unidades monetárias (por exemplo, BRL).',
    example: 15.99,
  })
  public price: number;

  @ApiProperty({
    description: 'Tempo estimado para a preparação do produto em minutos.',
    example: 20,
  })
  public preparationTime: number;

  @ApiProperty({
    description:
      'Descrição detalhada do produto, destacando suas características e/ou ingredientes.',
    example:
      'Um hambúrguer suculento com carne bovina de primeira e queijo cheddar.',
  })
  public description: string;

  @ApiProperty({
    description:
      'Indica se o produto está habilitado (true) ou desabilitado (false) para venda.',
    example: true,
  })
  public enabled: boolean;

  @ApiProperty({
    description:
      'URL da imagem do produto, que aponta para o local onde a imagem está hospedada.',
    example: 'https://example.com/images/hamburguer.png',
  })
  public figureUrl: string;
}
