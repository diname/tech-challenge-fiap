import { CreateProductCommand } from '@Application/commands/product/create-product.command';
import { UpdateProductCommand } from '@Application/commands/product/update-product.command';
import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from '@Application/use-cases/product/delete-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { UpdateProductUseCase } from '@Application/use-cases/product/update-product.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/api/dto/request/create-product.request.dto';
import { UpdateProductDto } from '../dto/request/update-product.request.dto';
import { ProductReponseDto } from '../dto/response/product.reponse.dto';

@Controller('products')
@ApiTags('products')
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
    type: CreateProductDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async create(@Body() createProductDto: CreateProductDto): Promise<void> {
    /* critrico controller fazendo conversao de objeto */
    return this.createProductUseCase.execute(
      new CreateProductCommand(
        createProductDto.name,
        createProductDto.categoryId,
        createProductDto.price,
        createProductDto.description,
        createProductDto.figure,
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos',
    type: [ProductReponseDto],
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async findAll(): Promise<ProductReponseDto[]> {
    return this.findProductUseCase.execute();
  }

  @ApiOperation({ summary: 'Deleta um produto' })
  @ApiResponse({
    status: 204,
    description: 'Deleta um produtos',
  })
  @Delete(':id')
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  delete(@Param('id') id: number): Promise<void> {
    return this.deleteProductUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um produto' })
  @ApiResponse({
    status: 204,
    description: 'Atualiza um produtos',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    /* critrico controller fazendo conversao de objeto */
    return this.updateProductUseCase.execute(
      new UpdateProductCommand(
        id,
        updateProductDto.name,
        updateProductDto.categoryId,
        updateProductDto.price,
        updateProductDto.description,
        updateProductDto.figure,
        updateProductDto.enable,
      ),
    );
  }
}
