import { CategoryEntity } from '@Domain/entities/category.entity';
import {
  CategoryRequestDto,
  UpdateCategoryRequestDto,
} from '../dtos/request/category/category.request.dto';
import { CategoryResponseDto } from '../dtos/response/category/category.response.dto';

export class CategoryMapper {
  static toEntity(dto: CategoryRequestDto): CategoryEntity {
    return new CategoryEntity(dto.name);
  }

  static toEntityUpdate(dto: UpdateCategoryRequestDto): CategoryEntity {
    const entity = new CategoryEntity(dto.name);
    return entity;
  }

  static toResponseDto(entity: CategoryEntity): CategoryResponseDto {
    const categoryResponseDto = new CategoryResponseDto();
    categoryResponseDto.id = entity.id;
    categoryResponseDto.name = entity.name;
    return categoryResponseDto;
  }
}
