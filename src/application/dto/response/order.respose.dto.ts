import {
  OrderStatusType,
  PaymentStatusType,
} from '@Infrastructure/typeorm/models/order.model';
import { ApiProperty } from '@nestjs/swagger';

class ProductOrderDto {
  @ApiProperty({
    description: 'ID do produto.',
    example: 1,
  })
  productId: number;

  @ApiProperty({
    description: 'Quantidade do produto.',
    example: 2,
  })
  quantity: number;
}

export class OrderResponseDto {
  @ApiProperty({
    description: 'ID do pedido.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Preço total do pedido.',
    example: 100.0,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'ID do usuário que fez o pedido.',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Status do pagamento do pedido.',
    example: 'pending',
  })
  paymentStatus: PaymentStatusType;

  @ApiProperty({
    description: 'Status do pedido.',
    example: 'none',
  })
  orderStatus: OrderStatusType;

  @ApiProperty({
    description: 'Data de criação do pedido.',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do pedido.',
    example: '2024-01-02T00:00:00Z',
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Lista de produtos e quantidades no pedido.',
    type: [ProductOrderDto],
    example: [{ productId: 1, quantity: 2 }],
  })
  productOrders: ProductOrderDto[];
}
