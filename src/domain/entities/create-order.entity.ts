export class CreateOrderEntity {
  constructor(
    public productOrders: CreateProductOrderEntity[],
    public cpf?: string,
  ) {}
}

export class CreateProductOrderEntity {
  constructor(
    public productId: number,
    public quantity: number,
  ) {}
}
