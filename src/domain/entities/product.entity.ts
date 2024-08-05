export class ProductEntity {
  public categoryName: string;

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public figureUrl: string,
    public enabled: boolean,
    public categoryId: number,
  ) {}
}
