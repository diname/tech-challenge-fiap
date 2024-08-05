export class ProductEntity {
  public id: number;
  public categoryName: string;

  constructor(
    public name: string,
    public description: string,
    public price: number,
    public figureUrl: string,
    public enabled: boolean,
    public categoryId: number,
  ) {}
}
