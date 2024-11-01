import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { IPaymentService } from '@Infrastructure/services/mercadopago/payment.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WebhookUseCase {
  constructor(
    @Inject(IPaymentService)
    private readonly paymentService: IPaymentService,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) {}

  async execute(payment: PaymentNotificationDto): Promise<void> {
    try {
      this.validatePayment(payment);
    } catch (error) {
      this.handleError(error);
    }
  }
  private async validatePayment(
    payment: PaymentNotificationDto,
  ): Promise<void> {
    const { status, order_status, cancelled, external_reference } =
      await this.paymentService.getMerchantOrder(payment);

    const orderId = Number(external_reference);

    if (status === 'closed' && order_status === 'paid') {
      await this.orderService.approveOrder(orderId);
    } else if (cancelled) {
      await this.orderService.cancelOrder(orderId);
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred while processing the order:', error);
  }
}
