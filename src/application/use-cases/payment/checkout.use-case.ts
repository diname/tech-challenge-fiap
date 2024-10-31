import { CreateCheckoutRequestDto } from '@Application/dtos/request/create-checkout.dto';
import { PaymentResponseDto } from '@Application/dtos/response/payment.response';
import { PaymentMapper } from '@Application/mappers/payment.mapper';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import {
  IMercadoPagoService,
  IMercadoPagoServiceSymbol,
} from '@Infrastructure/services/mercadopago/mercadopago.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';

@Injectable()
export class CheckoutUseCase {
  constructor(
    @Inject(IMercadoPagoServiceSymbol)
    private readonly mercadoPagoService: IMercadoPagoService,
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  /* refatorar */

  async execute(dto: CreateCheckoutRequestDto): Promise<PaymentResponseDto> {
    const order = await this.orderService.findOrderById(dto.orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const payment = PaymentMapper.ToPaymentRequestDto(
      order,
      this.environmentVariableService.mercadoPagoConfig.notificationUrl,
    );

    return await this.mercadoPagoService.createPayment(payment);
  }
}
