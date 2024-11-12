import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateOrderRequestDto {
  @ApiProperty({
    description: 'ID do pedido, deve ser um número inteiro.',
    example: 123,
  })
  @IsInt({ message: 'O ID do pedido deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do pedido não pode estar vazio.' })
  readonly id: number;

  @ApiProperty({
    description: 'Status atual do pedido.',
    enum: OrderStatusType,
    example: OrderStatusType.RECEIVED,
  })
  @IsEnum(OrderStatusType, {
    message:
      'O status do pedido deve ser um valor válido do tipo OrderStatusType.',
  })
  @IsNotEmpty({ message: 'O status do pedido não pode estar vazio.' })
  readonly orderStatus: OrderStatusType;
}
