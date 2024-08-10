import {
  IOrderService,
  IOrderServiceSymbol,
} from '@Domain/services/order/order.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCheckoutRequestDto } from 'src/application/dtos/request/create-checkout.dto';
import { CheckoutResponseDto } from 'src/application/dtos/response/create-checkout.response.dto';

@Injectable()
export class CreateCheckoutUseCase {
  constructor(
    @Inject(IOrderServiceSymbol)
    private readonly service: IOrderService,
  ) {}

  async execute(dto: CreateCheckoutRequestDto): Promise<CheckoutResponseDto> {
    const randomQRCode = new CheckoutResponseDto();
    randomQRCode.emv = 'testEMV';

    try {
      if (dto.orderOwnerCPF === '532.543.888-22') {
        await this.service.approveOrder(dto.orderId);
      } else if (dto.orderOwnerCPF === '532.543.888-23') {
        await this.service.cancelOrder(dto.orderId);
      } else {
        await this.service.approveOrder(dto.orderId);
      }
    } catch (error) {
      // Handle the exception here
      console.error('An error occurred while processing the order:', error);
    }

    return randomQRCode;
  }
}
