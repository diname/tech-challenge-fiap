import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
import { MerchantOrderResponseDto } from '@Application/dtos/response/merchant-order.response.dto';
import { PaymentResponseDto } from '@Application/dtos/response/payment.response';

/*Poderiamos criar uma interface generica IPaymentService desta forma ficaria flexivel para utilizar qualquer "gateway" de pagamentos
 */
export interface IMercadoPagoService {
  createPayment(payment: PaymentRequestDto): Promise<PaymentResponseDto>;
  getMerchantOrder(resourceUrl: string): Promise<MerchantOrderResponseDto>;
}

export const IMercadoPagoServiceSymbol = Symbol('MercadoPagoServiceImpl');
