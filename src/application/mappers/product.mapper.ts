import { ProductResponseDto } from '@Application/dtos/response/product/product.response.dto';
import { CategoryEntity } from '@Domain/entities/category.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import {
  ProductRequestDto,
  ProductUpdateRequestDto,
} from '../dtos/request/product/product.request.dto';

export class ProductMapper {
  static toEntity(dto: ProductRequestDto): ProductEntity {
    const category = { id: dto.categoryId } as CategoryEntity;

    return new ProductEntity(
      dto.name,
      dto.description,
      dto.price,
      dto.preparationTime,
      dto.figureUrl,
      dto.enabled,
      category,
    );
  }

  static toResponseDto(entity: ProductEntity): ProductResponseDto {
    const productResponseDto = new ProductResponseDto();
    productResponseDto.id = entity.id;
    productResponseDto.category = entity.category.name;
    productResponseDto.name = entity.name;
    productResponseDto.description = entity.description;
    productResponseDto.price = entity.price;
    productResponseDto.preparationTime = entity.preparationTime;
    productResponseDto.enabled = entity.enabled;
    productResponseDto.figureUrl = entity.figureUrl;

    return productResponseDto;
  }

  static toEntityUpdate(dto: ProductUpdateRequestDto): ProductEntity {
    const category = { id: dto.categoryId } as CategoryEntity;

    const product = new ProductEntity(
      dto.name,
      dto.description,
      dto.price,
      dto.preparationTime,
      dto.figureUrl,
      dto.enabled,
      category,
    );

    return product;
  }
}
