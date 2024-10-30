import { CreateCheckoutRequestDto } from '@Application/dtos/request/create-checkout.dto';
import { PaymentNotificationDto } from '@Application/dtos/request/payment-notification.request.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/create-checkout.response.dto';
import { PaymentResponseDto } from '@Application/dtos/response/payment.response';
import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { WebhookUseCase } from '@Application/use-cases/payment/webhook.use-case';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly checkoutUseCase: CheckoutUseCase,
    private readonly webhookUseCase: WebhookUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Inicia um checkout e retorna um pix fake' })
  @ApiResponse({
    status: 201,
    description: 'Checkout feito com sucesso',
    type: CheckoutResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBody({
    description: `
    Dados:
    - O pedido será aprovado ou não baseado no CPF.
    - Caso o pedido não exista, um fake EMVCo será retornado independentemente.
    - CPF: 52998224725 Aprova o pedido.
    - CPF: 11144477735 Nega o pedido.
    - CPF: Qualquer outro CPF (válido) aprova o pedido.
    `,
    type: CreateCheckoutRequestDto,
  })
  async checkout(
    @Body() dto: CreateCheckoutRequestDto,
  ): Promise<PaymentResponseDto> {
    return this.checkoutUseCase.execute(dto);
  }

  @HttpCode(200)
  @Post('/webhook')
  @ApiOperation({
    summary: 'Recebe o Callback da API de pagamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Pagamento realizado com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async create(@Body() dto: PaymentNotificationDto) {
    this.webhookUseCase.execute(dto);
  }
}
