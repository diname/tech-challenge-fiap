import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from '@Shared/decorators/is-cpf.decorator';

import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateCheckoutRequestDto {
  constructor(partial: Partial<CreateCheckoutRequestDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'ID do pedido.',
    example: 1,
  })
  @IsNumber({}, { message: 'O ID deve ser um número.' })
  @IsPositive({ message: 'O ID deve ser positivo.' })
  readonly orderId: number;

  @ApiProperty({
    description: 'Preço do pedido.',
    example: 10.0,
  })
  @IsInt({ message: 'O preço deve ser um número inteiro.' })
  @IsPositive({ message: 'O ID do usuário deve ser positivo.' })
  readonly orderPrice: number;

  @ApiProperty({
    description: 'CPF do usuário que fez o pedido.',
    example: '52998224725',
  })
  @IsCPF({ message: 'O CPF fornecido é inválido.' })
  @IsOptional()
  readonly orderOwnerCPF: string;
}
