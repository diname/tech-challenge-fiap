export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly categoryId: number,
    public readonly price: number,
    public readonly description: string,
  ) { }
}
