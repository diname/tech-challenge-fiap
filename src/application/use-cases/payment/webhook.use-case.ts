import { PaymentNotificationDto } from '@Application/dtos/request/payment-notification.request.dto';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import {
  IMercadoPagoService,
  IMercadoPagoServiceSymbol,
} from '@Infrastructure/services/mercadopago/mercadopago.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WebhookUseCase {
  constructor(
    @Inject(IMercadoPagoServiceSymbol)
    private readonly mercadoPagoService: IMercadoPagoService,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) {}

  async execute(payment: PaymentNotificationDto): Promise<void> {
    try {
      const { resource } = payment;

      if (resource) {
        this.validatePayment(resource);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  /* refatorar */

  private async validatePayment(resourceUrl: string): Promise<void> {
    const { status, order_status, cancelled, external_reference } =
      await this.mercadoPagoService.getMerchantOrder(resourceUrl);

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
