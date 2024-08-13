export class CreateOrderEntity {
  constructor(
    public productOrders: CreateProductOrderEntity[],
    public userId?: string,
  ) {}
}

export class CreateProductOrderEntity {
  constructor(
    public productId: number,
    public quantity: number,
  ) {}
}
