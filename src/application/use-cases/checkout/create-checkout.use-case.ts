import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCheckoutRequestDto } from '../../dtos/request/create-checkout.dto';
import {
  CheckoutResponseDto,
  PixDataDto,
} from '../../dtos/response/create-checkout.response.dto';

@Injectable()
export class CreateCheckoutUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(dto: CreateCheckoutRequestDto): Promise<CheckoutResponseDto> {
    const fakeResponse = new CheckoutResponseDto();
    const fakePixData: PixDataDto = {
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

    fakeResponse.pixData = fakePixData;

    try {
      if (dto.orderOwnerCPF === '52998224725') {
        await this.service.approveOrder(dto.orderId);
      } else if (dto.orderOwnerCPF === '11144477735') {
        await this.service.cancelOrder(dto.orderId);
      } else {
        await this.service.approveOrder(dto.orderId);
      }
    } catch (error) {
      console.error('An error occurred while processing the order:', error);
    }

    return fakeResponse;
  }
}
