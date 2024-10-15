import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';

export interface IMercadoPagoService {
  validate(payment: PaymentRequestDto): Promise<void>;
}

export const IMercadoPagoServiceSymbol = Symbol('MercadoPagoServiceImpl');
