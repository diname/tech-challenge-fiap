import { Inject, Injectable } from '@nestjs/common';
import {
  ICategoryService,
  ICategoryServiceSymbol,
} from 'src/core/domain/services/category/category.service';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(ICategoryServiceSymbol)
    private readonly categoryService: ICategoryService,
  ) {}

  async execute(id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
