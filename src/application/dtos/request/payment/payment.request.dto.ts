import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class PaymentRequestDto {
  @IsNumber()
  external_reference: string;

  @IsString()
  notification_url: string;

  @IsNumber()
  total_amount: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItem)
  items: ProductItem[];
}

export class ProductItem {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  unit_measure: string;

  @IsNumber()
  total_amount: number;
}
