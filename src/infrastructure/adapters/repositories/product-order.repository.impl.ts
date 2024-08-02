import { IProductOrderRepository } from '@Domain/repositories/product-order.repository';
import { ProductOrderEntity } from '@Infrastructure/entities/product_order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductOrderRepositoryImpl implements IProductOrderRepository {
  constructor(
    @InjectRepository(ProductOrderEntity)
    private readonly repository: Repository<ProductOrderEntity>,
  ) {}

  async createProductOrders(
    productOrders: ProductOrderEntity[],
  ): Promise<ProductOrderEntity[]> {
    return this.repository.save(productOrders);
  }

  async findProductOrdersByOrderId(
    orderId: number,
  ): Promise<ProductOrderEntity[]> {
    return this.repository.find({ where: { order: { id: orderId } } });
  }
}
