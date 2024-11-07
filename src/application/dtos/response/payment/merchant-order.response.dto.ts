import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  transaction_amount: number;

  @ApiProperty()
  total_paid_amount: number;

  @ApiProperty()
  shipping_cost: number;

  @ApiProperty()
  currency_id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  status_detail: string;

  @ApiProperty()
  operation_type: string;

  @ApiProperty()
  date_approved: string;

  @ApiProperty()
  date_created: string;

  @ApiProperty()
  last_modified: string;

  @ApiProperty()
  amount_refunded: number;
}

export class CollectorDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  email: string;

  @ApiProperty()
  nickname: string;
}

export class PayerDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  email: string;
}

export class ItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category_id: string;

  @ApiProperty()
  currency_id: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  picture_url: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unit_price: number;
}

export class MerchantOrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  external_reference: string;

  @ApiProperty()
  preference_id: string;

  @ApiProperty({ type: [PaymentDto] })
  payments: PaymentDto[];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  shipments: any[];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  payouts: any[];

  @ApiProperty()
  collector: CollectorDto;

  @ApiProperty()
  marketplace: string;

  @ApiProperty()
  notification_url: string;

  @ApiProperty()
  date_created: string;

  @ApiProperty()
  last_updated: string;

  @ApiProperty({ nullable: true })
  sponsor_id: string | null;

  @ApiProperty()
  shipping_cost: number;

  @ApiProperty()
  total_amount: number;

  @ApiProperty()
  site_id: string;

  @ApiProperty()
  paid_amount: number;

  @ApiProperty()
  refunded_amount: number;

  @ApiProperty()
  payer: PayerDto;

  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[];

  @ApiProperty()
  cancelled: boolean;

  @ApiProperty({ nullable: true })
  additional_info: string;

  @ApiProperty({ nullable: true })
  application_id: string | null;

  @ApiProperty()
  is_test: boolean;

  @ApiProperty()
  order_status: string;

  @ApiProperty()
  client_id: string;
}
