import { ProductService } from '@Application/services/product.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '@Shared/dto/request/create-product.dto';
import { ResponseProductDto } from '@Shared/dto/response/reponse-product.dto';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProdutcs(): Promise<ResponseProductDto[]> {
    return this.productService.getProducts();
  }
}
