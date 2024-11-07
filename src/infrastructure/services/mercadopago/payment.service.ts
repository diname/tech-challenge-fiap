import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import { PaymentRequestDto } from '@Application/dtos/request/payment/payment.request.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/payment/checkout.response';
import { MerchantOrderResponseDto } from '@Application/dtos/response/payment/merchant-order.response.dto';

export interface IPaymentService {
  createPayment(payment: PaymentRequestDto): Promise<CheckoutResponseDto>;
  getMerchantOrder(
    payment: PaymentNotificationDto,
  ): Promise<MerchantOrderResponseDto>;
  getNotificationUrl(): string;
}

export const IPaymentService = Symbol('IPaymentService');
