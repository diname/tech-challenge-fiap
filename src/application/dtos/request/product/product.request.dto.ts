import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProductRequestDto {
  @ApiProperty({
    example: 'Hambúrguer',
    description: `Nome do produto. Um nome conciso e claro para o produto.`,
  })
  @IsString({ message: 'O nome do produto deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do produto não pode estar vazio.' })
  name: string;

  @ApiProperty({
    example: 1,
    description: `ID da categoria do produto. Refere-se à categoria específica à qual o produto pertence.`,
  })
  @IsNumber({}, { message: 'O ID da categoria deve ser um número.' })
  categoryId: number;

  @ApiProperty({
    example: 10.99,
    description: `Preço do produto em unidades monetárias (por exemplo, BRL). Representa o custo para o cliente.`,
  })
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  price: number;

  @ApiProperty({
    example: 15,
    description:
      'Tempo de preparação do produto em minutos. Indica quanto tempo leva para preparar o produto.',
  })
  @IsNotEmpty({ message: 'O tempo de preparação é obrigatório.' })
  @IsNumber({}, { message: 'O tempo de preparação deve ser um número.' })
  @Min(1, { message: 'O tempo de preparação deve ser, no mínimo, 1 minuto.' })
  public preparationTime: number;

  @ApiProperty({
    example: 'Um hambúrguer com carne premium e bastante cheddar.',
    description: `Descrição detalhada do produto, destacando ingredientes ou características principais.`,
  })
  @IsString({ message: 'A descrição do produto deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição do produto não pode estar vazia.' })
  description: string;

  @ApiProperty({
    example: 'hamburguer.png',
    description: `URL da imagem do produto. Deve apontar para a localização onde a imagem do produto está hospedada.`,
  })
  @IsString({ message: 'A URL da imagem deve ser uma string.' })
  @IsNotEmpty({ message: 'A URL da imagem não pode estar vazia.' })
  figureUrl: string;

  @ApiProperty({
    example: true,
    description: `Indica se o produto está habilitado para venda (true) ou não (false). O padrão é true.`,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "enabled" deve ser um valor booleano.' })
  enabled?: boolean;
}

export class ProductUpdateRequestDto {
  @ApiProperty({
    example: 'Hambúrguer',
    description: `Nome do produto. Um nome conciso e claro para o produto.`,
  })
  @IsString({ message: 'O nome do produto deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do produto não pode estar vazio.' })
  name: string;

  @ApiProperty({
    example: 1,
    description: `ID da categoria do produto. Refere-se à categoria específica à qual o produto pertence.`,
  })
  @IsNumber({}, { message: 'O ID da categoria deve ser um número.' })
  categoryId: number;

  @ApiProperty({
    example: 10.99,
    description: `Preço atualizado do produto em unidades monetárias (por exemplo, BRL). Representa o custo para o cliente.`,
  })
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  price: number;

  @ApiProperty({
    example: 15,
    description:
      'Tempo de preparação atualizado do produto em minutos. Reflete mudanças no tempo de preparo.',
  })
  @IsNumber({}, { message: 'O tempo de preparação deve ser um número.' })
  @Min(1, { message: 'O tempo de preparação deve ser, no mínimo, 1 minuto.' })
  public preparationTime: number;

  @ApiProperty({
    example: 'Um hambúrguer com carne premium e bastante cheddar.',
    description: `Descrição atualizada do produto, fornecendo informações detalhadas sobre o produto.`,
  })
  @IsString({ message: 'A descrição do produto deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição do produto não pode estar vazia.' })
  description: string;

  @ApiProperty({
    example: 'hamburguer.png',
    description: `URL atualizada da imagem do produto. Deve apontar para a localização onde a nova imagem do produto está hospedada.`,
  })
  @IsString({ message: 'A URL da imagem deve ser uma string.' })
  @IsNotEmpty({ message: 'A URL da imagem não pode estar vazia.' })
  figureUrl: string;

  @ApiProperty({
    example: false,
    description: `Indica se o produto está habilitado para venda (true) ou não (false).`,
  })
  @IsBoolean({ message: 'O campo "enabled" deve ser um valor booleano.' })
  @IsNotEmpty({ message: 'O campo "enabled" não pode estar vazio.' })
  enabled: boolean;
}
