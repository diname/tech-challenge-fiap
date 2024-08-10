import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({
    description: `
    Checkout Data:
  
    - Order ID: ID do pedido, será aprovado ou não baseado no CPF.
    - Order Price: Preço do pedido.
    - Order Owner CPF: CPF do usuário que está pagando.
    - CPF: 532.543.888-22 Aprova o pedido.
    - CPF: 532.543.888-23 Nega o pedido.
    - CPF: Qualquer outro CPF aprova o pedido.
  
    Ensure all required fields are filled correctly before submitting the request.
    `,
    type: CreateCheckoutRequestDto,
  })
  async checkoutOrder(
    @Body() dto: CreateCheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
    return this.createCheckoutUseCase.execute(dto);
  }
}
