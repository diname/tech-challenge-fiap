import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
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
  ) {}

  async execute(dto: PaymentRequestDto): Promise<void> {
    this.mercadoPagoService.webhook(dto);
  }
}
