import {
  ICategoryService,
  ICategoryServiceSymbol,
} from '@Domain/services/category/category.service';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryResponseDto } from '../../dtos/response/category/category.response.dto';
import { CategoryMapper } from '../../mappers/category.mapper';

@Injectable()
export class FindCategoryUseCase {
  constructor(
    @Inject(ICategoryServiceSymbol)
    private readonly categoryService: ICategoryService,
  ) {}

  async execute(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.findCategories();
    return categories.map(CategoryMapper.toResponseDto);
  }
}
