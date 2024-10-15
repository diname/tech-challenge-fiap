import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { IMercadoPagoService } from './mercadopago.service';

@Injectable()
export class MercadoPagoServiceImpl implements IMercadoPagoService {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async validate(payment: PaymentRequestDto): Promise<void> {
    if (payment.action == 'payment.approved')
      this.orderService.approveOrder(payment.data.orderId);

    if (payment.action == 'payment.canceled')
      this.orderService.cancelOrder(payment.data.orderId);
  }
}
