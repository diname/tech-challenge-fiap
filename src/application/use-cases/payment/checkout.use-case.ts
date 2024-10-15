import { CreateCheckoutRequestDto } from '@Application/dtos/request/create-checkout.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/create-checkout.response.dto';
import {
  IMercadoPagoService,
  IMercadoPagoServiceSymbol,
} from '@Infrastructure/services/mercadopago/mercadopago.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutUseCase {
  constructor(
    @Inject(IMercadoPagoServiceSymbol)
    private readonly mercadoPagoService: IMercadoPagoService,
  ) {}

  async execute(dto: CreateCheckoutRequestDto): Promise<CheckoutResponseDto> {
    return this.mercadoPagoService.checkout(dto);
  }
}
