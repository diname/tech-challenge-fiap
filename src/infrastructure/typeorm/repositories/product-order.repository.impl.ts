import { IProductOrderRepository } from '@Domain/repositories/product-order.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrderModel } from '../models/product_order.model';

@Injectable()
export class ProductOrderRepositoryImpl implements IProductOrderRepository {
  constructor(
    @InjectRepository(ProductOrderModel)
    private readonly repository: Repository<ProductOrderModel>,
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
