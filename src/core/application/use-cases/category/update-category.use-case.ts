import { Inject, Injectable } from '@nestjs/common';
import {
  ICategoryService,
  ICategoryServiceSymbol,
} from 'src/core/domain/services/category/category.service';
import { UpdateCategoryRequestDto } from '../../dtos/request/category.request.dto';
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
