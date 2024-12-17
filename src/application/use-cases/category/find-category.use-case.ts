import {
  ICategoryService,
  ICategoryServiceSymbol,
} from '@Domain/services/category/category.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryResponseDto } from '../../dtos/response/category/category.response.dto';
import { CategoryMapper } from '../../mappers/category.mapper';

@Injectable()
export class FindCategoryUseCase {
  constructor(
    @Inject(ICategoryServiceSymbol)
    private readonly categoryService: ICategoryService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(): Promise<CategoryResponseDto[]> {
    const cachedData = await this.cacheService.get<string>('categories');

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const categories = await this.categoryService.findCategories();

    const categoryResponseDto = categories.map(CategoryMapper.toResponseDto);

    await this.cacheService.set(
      'categories',
      JSON.stringify(categoryResponseDto),
      5000,
    );

    return categoryResponseDto;
  }
}
