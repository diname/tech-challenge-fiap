import {
  IProductService,
  IProductServiceSymbol,
} from '@Domain/services/product/product.service';
import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ProductRequestDto } from '../../dtos/request/product.request.dto';
import {
  IMercadoPagoService,
  IMercadoPagoServiceSymbol,
} from '@Infrastructure/services/mercadopago/mercadopago.service';
import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';

@Injectable()
export class PaymentUseCase {
  constructor(
    @Inject(IMercadoPagoServiceSymbol)
    private readonly mercadoPagoService: IMercadoPagoService,
  ) {}

  async execute(dto: PaymentRequestDto): Promise<void> {
    this.mercadoPagoService.validate(dto);
  }
}
