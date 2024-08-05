export interface ICategoryRepository {
  save(product: CategoryEntity): Promise<void>;
  find(): Promise<CategoryEntity[]>;
}

export const ICategoryRepository = Symbol('ICategoryRepository');
