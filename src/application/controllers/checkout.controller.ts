import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCheckoutRequestDto } from '../dtos/request/create-checkout.dto';
import { CheckoutResponseDto } from '../dtos/response/create-checkout.response.dto';
import { CreateCheckoutUseCase } from '../use-cases/checkout/create-checkout.use-case';

@ApiTags('Checkouts')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly createCheckoutUseCase: CreateCheckoutUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Retorna um fake EMV' })
  @ApiResponse({
    status: 201,
    description: 'Checkout feito com sucesso',
    type: CheckoutResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async checkoutOrder(
    @Body() dto: CreateCheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
    return this.createCheckoutUseCase.execute(dto);
  }
}
