import { ProductOrderEntity } from '../entities/product_order.entity';

export interface IProductOrderRepository {
  createProductOrders(
    productOrders: ProductOrderEntity[],
  ): Promise<ProductOrderEntity[]>;
  findProductOrdersByOrderId(orderId: number): Promise<ProductOrderEntity[]>;
}

export const IProductOrderRepositorySymbol = Symbol('ProductOrderRepository');
