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
  @ApiOperation({ summary: 'Inicia um checkout e retorna um fake EMVCo' })
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
  
    - O pedido será aprovado ou não baseado no CPF.
    - Caso o pedido não exista, um fake EMVCo será retornado independentemente.
    - CPF: 52998224725 Aprova o pedido.
    - CPF: 11144477735 Nega o pedido.
    - CPF: Qualquer outro CPF (válido) aprova o pedido.
    `,
    type: CreateCheckoutRequestDto,
  })
  async checkoutOrder(
    @Body() dto: CreateCheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
    return this.createCheckoutUseCase.execute(dto);
  }
}
