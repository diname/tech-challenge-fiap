import { ProductEntity } from '@Domain/entities/product.entity';
import { ProductRequestDto } from '../dtos/request/product.request.dto';
import { ProductReponseDto } from '../dtos/response/product.reponse.dto';

export class ProductMapper {
  static toEntity(dto: ProductRequestDto): ProductEntity {
    return new ProductEntity(
      dto.name,
      dto.description,
      dto.price,
      dto.figureUrl,
      dto.enabled,
      dto.categoryId,
    );
  }

  static toResponseDto(entity: ProductEntity): ProductReponseDto {
    const productResponseDto = new ProductReponseDto();
    productResponseDto.id = entity.id;
    productResponseDto.category = entity.categoryName;
    productResponseDto.name = entity.name;
    productResponseDto.description = entity.description;
    productResponseDto.price = entity.price;
    productResponseDto.enabled = entity.enabled;

    return productResponseDto;
  }
}
