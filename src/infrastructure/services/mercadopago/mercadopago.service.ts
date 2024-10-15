import { CreateCheckoutRequestDto } from '@Application/dtos/request/create-checkout.dto';
import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/create-checkout.response.dto';

export interface IMercadoPagoService {
  checkout(dto: CreateCheckoutRequestDto): Promise<CheckoutResponseDto>;
  webhook(payment: PaymentRequestDto): Promise<void>;
}

export const IMercadoPagoServiceSymbol = Symbol('MercadoPagoServiceImpl');
