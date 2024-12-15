import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CategoryRequestDto,
  UpdateCategoryRequestDto,
} from '@Application/dtos/request/category/category.request.dto';
import { CategoryResponseDto } from '@Application/dtos/response/category/category.response.dto';
import { CreateCategoryUseCase } from '@Application/use-cases/category/create-category.use-case';
import { DeleteCategoryUseCase } from '@Application/use-cases/category/delete-category.use-case';
import { FindCategoryUseCase } from '@Application/use-cases/category/find-category.use-case';
import { UpdateCategoryUseCase } from '@Application/use-cases/category/update-category.use-case';
import { Roles } from '@Shared/decorators/roles.decorator';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';
import { RoleGuard } from '@Shared/guards/role-guard';

@Controller('/api/categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findCategoryUseCase: FindCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    type: CategoryRequestDto,
  })
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async createCategory(@Body() dto: CategoryRequestDto): Promise<void> {
    return this.createCategoryUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Categoria listada com sucesso!',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async findCategories(): Promise<CategoryResponseDto[]> {
    return this.findCategoryUseCase.execute();
  }

  @Put(':id')
  @HttpCode(204)
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza uma categoria' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 204,
    description: 'Categoria atualizada com sucesso!',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async updateCategory(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryRequestDto,
  ): Promise<void> {
    return this.updateCategoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta uma categoria' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  @ApiResponse({
    status: 204,
    description: 'Categoria deletada com sucesso!',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return this.deleteCategoryUseCase.execute(id);
  }
}
