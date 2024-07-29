export class CreateOrderCommand {
  constructor(
    public readonly totalPrice: number,
    public readonly userId: number,
    public readonly productOrders: { productId: number; quantity: number }[],
  ) {}
}
