import { Inject, Injectable } from '@nestjs/common';
import {
  ICategoryService,
  ICategoryServiceSymbol,
} from 'src/core/domain/services/category/category.service';
import { CategoryResponseDto } from '../../dtos/response/category.response.dto';
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
