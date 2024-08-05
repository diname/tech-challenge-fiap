export interface IProductOrderRepository {
  createProductOrders(
    productOrders: ProductOrderEntity[],
  ): Promise<ProductOrderEntity[]>;
  findProductOrdersByOrderId(orderId: number): Promise<ProductOrderEntity[]>;
}

export const IProductOrderRepositorySymbol = Symbol('ProductOrderRepository');
