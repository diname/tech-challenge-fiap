import {
  ICategoryService,
  ICategoryServiceSymbol,
} from '@Domain/services/category/category.service';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateCategoryRequestDto } from 'src/application/dtos/request/category.request.dto';
import { CategoryMapper } from 'src/application/mappers/category.mapper';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(ICategoryServiceSymbol)
    private readonly categoryService: ICategoryService,
  ) {}

  async execute(id: number, dto: UpdateCategoryRequestDto): Promise<void> {
    return await this.categoryService.updateCategory(
      id,
      CategoryMapper.toEntityUpdate(dto),
    );
  }
}
