import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
import { MerchantOrderResponseDto } from '@Application/dtos/response/merchant-order.response.dto';
import { PaymentResponseDto } from '@Application/dtos/response/payment.response';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IMercadoPagoService } from './mercadopago.service';

@Injectable()
export class MercadoPagoServiceImpl implements IMercadoPagoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  /*refatorar*/

  async createPayment(payment: PaymentRequestDto): Promise<PaymentResponseDto> {
    const { data } = await lastValueFrom(
      this.httpService.post<PaymentResponseDto>(
        this.environmentVariableService.mercadoPagoConfig.paymentUrl,
        payment,
      ),
    );

    return data;
  }

  async getMerchantOrder(
    resourceUrl: string,
  ): Promise<MerchantOrderResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<MerchantOrderResponseDto>(
        resourceUrl,
        this.getHeaders(),
      ),
    );

    return data;
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.environmentVariableService.mercadoPagoConfig.token}`,
        ContentType: 'application/json',
      },
    };
  }
}
