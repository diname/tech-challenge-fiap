export class UpdateProductCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly categoryId: number,
    public readonly price: number,
    public readonly description: string,
    public readonly figureUrl: string,
    public readonly enable: boolean,
  ) {}
}
