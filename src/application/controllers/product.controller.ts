import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductRequestDto,
  ProductUpdateRequestDto,
} from '../dtos/request/product.request.dto';
import { ProductReponseDto } from '../dtos/response/product.reponse.dto';
import { CreateProductUseCase } from '../use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from '../use-cases/product/delete-product.use-case';
import { FindProductUseCase } from '../use-cases/product/find-product.use-case';
import { UpdateProductUseCase } from '../use-cases/product/update-product.use-case';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly findProductUseCase: FindProductUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
    type: ProductReponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async create(@Body() dto: ProductRequestDto): Promise<ProductReponseDto> {
    return this.createProductUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos',
    type: [ProductReponseDto],
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  async findAll(
    @Query('name') name: string,
    @Query('categoryId') categoryId: number,
  ): Promise<ProductReponseDto[]> {
    return this.findProductUseCase.execute(name, categoryId);
  }

  @ApiOperation({ summary: 'Deleta um produto' })
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Deleta um produto',
  })
  @Delete(':id')
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  delete(@Param('id') id: number) {
    this.deleteProductUseCase.execute(id);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualiza um produto' })
  @ApiResponse({
    status: 204,
    description: 'Atualiza um produto',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async update(
    @Param('id') id: number,
    @Body() dto: ProductUpdateRequestDto,
  ): Promise<void> {
    return this.updateProductUseCase.execute(id, dto);
  }
}
