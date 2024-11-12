import {
  ICategoryService,
  ICategoryServiceSymbol,
} from '@Domain/services/category/category.service';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateCategoryRequestDto } from '../../dtos/request/category/category.request.dto';
import { CategoryMapper } from '../../mappers/category.mapper';

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
