import { CreateCheckoutRequestDto } from '@Application/dtos/request/payment/create-checkout.dto';
import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/payment/checkout.response';
import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { WebhookUseCase } from '@Application/use-cases/payment/webhook.use-case';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('/api/payment')
export class PaymentController {
  constructor(
    private readonly checkoutUseCase: CheckoutUseCase,
    private readonly webhookUseCase: WebhookUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Inicia um checkout e retorna a chave pix' })
  @ApiResponse({
    status: 201,
    description: 'Checkout feito com sucesso',
    type: CheckoutResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async checkout(
    @Body() dto: CreateCheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
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
