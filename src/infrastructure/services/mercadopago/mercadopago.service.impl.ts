import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import { PaymentRequestDto } from '@Application/dtos/request/payment/payment.request.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/payment/checkout.response';
import { MerchantOrderResponseDto } from '@Application/dtos/response/payment/merchant-order.response.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { lastValueFrom } from 'rxjs';
import { IPaymentService } from './payment.service';

@Injectable()
export class MercadoPagoServiceImpl implements IPaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  async createPayment(
    payment: PaymentRequestDto,
  ): Promise<CheckoutResponseDto> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post<CheckoutResponseDto>(
          this.environmentVariableService.mercadoPagoConfig.paymentUrl,
          payment,
          this.getHeaders(),
        ),
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMerchantOrder(
    payment: PaymentNotificationDto,
  ): Promise<MerchantOrderResponseDto> {
    try {
      if (payment.topic === 'merchant_order') {
        const { data } = await lastValueFrom(
          this.httpService.get<MerchantOrderResponseDto>(
            payment.resource,
            this.getHeaders(),
          ),
        );
        return data;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.environmentVariableService.mercadoPagoConfig.token}`,
        ContentType: 'application/json',
      },
    };
  }

  public getNotificationUrl(): string {
    return this.environmentVariableService.mercadoPagoConfig.notificationUrl;
  }

  private handleError(error: any): void {
    console.error('An error occurred while processing the order:', error);
  }
}
