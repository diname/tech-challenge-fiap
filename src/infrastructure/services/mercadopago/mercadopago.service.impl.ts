import { CreateCheckoutRequestDto } from '@Application/dtos/request/create-checkout.dto';
import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
import {
  CheckoutResponseDto,
  PixDataDto,
} from '@Application/dtos/response/create-checkout.response.dto';
import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { IMercadoPagoService } from './mercadopago.service';

@Injectable()
export class MercadoPagoServiceImpl implements IMercadoPagoService {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly orderService: IOrderService,
  ) {}

  async checkout(dto: CreateCheckoutRequestDto): Promise<CheckoutResponseDto> {
    const fakeResponse = new CheckoutResponseDto();
    const fakePixData: PixDataDto = this.createFakePixData(dto);

    fakeResponse.pixData = fakePixData;

    try {
      await this.handleOrder(dto.orderOwnerCPF, dto.orderId);
    } catch (error) {
      this.handleError(error);
    }

    return fakeResponse;
  }

  private createFakePixData(dto: CreateCheckoutRequestDto): PixDataDto {
    return {
      merchantAccount:
        '00020126360014BR.GOV.BCB.PIX0114+55819999999970206ABCD5802BR5925FIAP6009SAOPAULO62070503***6304ABCD',
      userCPF: dto.orderOwnerCPF,
      transactionAmount: dto.orderPrice,
      currency: 'BRL',
      transactionId: '1234567890',
      qrCode:
        '00020126360014BR.GOV.BCB.PIX0114+55819999999970206ABCD5802BR5925FIAP6009SAOPAULO62070503***6304ABCD',
      expirationDate: '2024-12-31T23:59:59Z',
    };
  }

  private async handleOrder(
    orderOwnerCPF: string,
    orderId: number,
  ): Promise<void> {
    switch (orderOwnerCPF) {
      case '52998224725':
        await this.orderService.approveOrder(orderId);
        break;
      case '11144477735':
        await this.orderService.cancelOrder(orderId);
        break;
      default:
        await this.orderService.approveOrder(orderId);
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred while processing the order:', error);
  }

  async webhook(payment: PaymentRequestDto): Promise<void> {
    try {
      const { action, data } = payment;

      if (action === 'payment.approved') {
        await this.orderService.approveOrder(data.orderId);
      } else if (action === 'payment.canceled') {
        await this.orderService.cancelOrder(data.orderId);
      }
    } catch (error) {
      this.handleError(error);
    }
  }
}
