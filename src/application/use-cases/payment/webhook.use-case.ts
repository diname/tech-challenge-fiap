import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { IPaymentService } from '@Infrastructure/services/mercadopago/payment.service';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';

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
    const merchantOrder = await this.paymentService.getMerchantOrder(payment);
    if (merchantOrder) {
      const { status, order_status, external_reference } = merchantOrder;
      const paymentReceived = status === 'closed' && order_status === 'paid';

      const orderId = Number(external_reference);
      const isOrderWithPendingPayment =
        await this.isOrderWithPendingPayment(orderId);

      if (paymentReceived && isOrderWithPendingPayment) {
        await this.orderService.approveOrder(orderId);
      } else if (merchantOrder.cancelled) {
        await this.orderService.cancelOrder(orderId);
      }
    }
  }

  private async isOrderWithPendingPayment(orderId: number) {
    const { paymentStatus } = await this.orderService.findOrderById(orderId);
    return paymentStatus == PaymentStatusType.PENDING;
  }

  private handleError(error: any): void {
    console.error('An error occurred while processing the order:', error);
  }
}
