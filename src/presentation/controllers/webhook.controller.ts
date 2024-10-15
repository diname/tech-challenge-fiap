import { PaymentRequestDto } from '@Application/dtos/request/payment.request.dto';
import { PaymentUseCase } from '@Application/use-cases/payment/payment.use-case';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('webhooks')
@ApiTags('Webhook')
export class WebhookController {
  constructor(private readonly paymentUseCase: PaymentUseCase) {}

  @HttpCode(200)
  @Post()
  @ApiOperation({
    summary: 'Recebe o Callback da API de pagamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Pagamento realizado com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async create(@Body() dto: PaymentRequestDto) {
    this.paymentUseCase.execute(dto);
  }
}
