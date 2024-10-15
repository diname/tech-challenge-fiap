import { CategoryEntity } from './category.entity';

export class ProductEntity {
  public id: number;
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public preparationTime: number,
    public figureUrl: string,
    public enabled: boolean,
    public category: CategoryEntity,
  ) {}
}
