import {
  ICategoryService,
  ICategoryServiceSymbol,
} from '@Domain/services/category/category.service';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRequestDto } from 'src/application/dtos/request/category.request.dto';
import { CategoryMapper } from 'src/application/mappers/category.mapper';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(ICategoryServiceSymbol)
    private readonly categoryService: ICategoryService,
  ) {}

  async execute(dto: CategoryRequestDto): Promise<void> {
    await this.categoryService.createCategory(CategoryMapper.toEntity(dto));
  }
}
