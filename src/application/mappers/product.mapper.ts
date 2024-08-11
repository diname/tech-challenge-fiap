import { CategoryEntity } from '@Domain/entities/category.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import {
  ProductRequestDto,
  ProductUpdateRequestDto,
} from '../dtos/request/product.request.dto';
import { ProductReponseDto } from '../dtos/response/product.reponse.dto';

export class ProductMapper {
  static toEntity(dto: ProductRequestDto): ProductEntity {
    const category = { id: dto.categoryId } as CategoryEntity;

    return new ProductEntity(
      dto.name,
      dto.description,
      dto.price,
      dto.figureUrl,
      dto.enabled,
      category,
    );
  }

  static toResponseDto(entity: ProductEntity): ProductReponseDto {
    const productResponseDto = new ProductReponseDto();
    productResponseDto.id = entity.id;
    productResponseDto.category = entity.category.name;
    productResponseDto.name = entity.name;
    productResponseDto.description = entity.description;
    productResponseDto.price = entity.price;
    productResponseDto.enabled = entity.enabled;

    return productResponseDto;
  }

  static toEntityUpdate(dto: ProductUpdateRequestDto): ProductEntity {
    const category = { id: dto.categoryId } as CategoryEntity;

    const product = new ProductEntity(
      dto.name,
      dto.description,
      dto.price,
      dto.figureUrl,
      dto.enabled,
      category,
    );

    return product;
  }
}
