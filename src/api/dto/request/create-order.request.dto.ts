import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsInt,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class CreateOrderRequestDto {
  constructor(partial: Partial<CreateOrderRequestDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'Preço total do pedido.',
    example: 100.0,
  })
  @IsNumber({}, { message: 'O preço total deve ser um número.' })
  @IsPositive({ message: 'O preço total deve ser positivo.' })
  readonly totalPrice: number;

  @ApiProperty({
    description: 'ID do usuário que fez o pedido.',
    example: 1,
  })
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  @IsPositive({ message: 'O ID do usuário deve ser positivo.' })
  readonly userId: number;

  @ApiProperty({
    description: 'Lista de produtos e quantidades no pedido.',
    type: [Object],
    example: [{ productId: 1, quantity: 2 }],
  })
  @IsArray({ message: 'Os produtos devem ser uma lista.' })
  @ValidateNested({
    each: true,
    message: 'Cada item na lista de produtos deve ser um objeto válido.',
  })
  readonly productOrders: ProductOrderDto[];
}

class ProductOrderDto {
  @ApiProperty({
    description: 'ID do produto.',
    example: 1,
  })
  @IsInt({ message: 'O ID do produto deve ser um número inteiro.' })
  @IsPositive({ message: 'O ID do produto deve ser positivo.' })
  readonly productId: number;

  @ApiProperty({
    description: 'Quantidade do produto.',
    example: 2,
  })
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @IsPositive({ message: 'A quantidade deve ser positiva.' })
  readonly quantity: number;
}
