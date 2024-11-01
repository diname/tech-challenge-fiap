import { ProductOrderEntity } from '@Domain/entities/product-order.entity';
import { UserEntity } from '@Domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';
import { Column } from 'typeorm';

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

  @Column({
    type: 'integer',
    nullable: false,
    comment: 'Tempo estimado para a preparação do pedido em minutos.',
  })
  estimatedPreparationTime: number;

  @Column({
    type: 'integer',
    nullable: false,
    comment: 'Tempo de preparação do pedido em minutos.',
  })
  preparationTime: number;

  @ApiProperty({
    description: 'Usuário que fez o pedido.',
    type: [UserEntity],
  })
  user?: UserEntity;

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
    type: [ProductOrderEntity],
    example: [{ productId: 1, quantity: 2 }],
  })
  productOrders: ProductOrderEntity[];
}
