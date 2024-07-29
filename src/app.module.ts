import { ProductService } from '@Application/services/product.service';
import { UserService } from '@Application/services/user.service';
import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { CategoryEntity } from '@Domain/entities/category.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import { UserEntity } from '@Domain/entities/user.entity';
import { IProductRepositorySymbol } from '@Domain/repositories/product.repository';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { ProductController } from '@Infrastructure/adapters/controllers/product.controller';
import { UserController } from '@Infrastructure/adapters/controllers/user.controller';
import { TypeOrmProductRepository } from '@Infrastructure/adapters/persistence/typeorm-product.repository';
import { TypeOrmUserRepository } from '@Infrastructure/adapters/persistence/typeorm-user.repository';
import { EnvironmentVariableModule } from '@Infrastructure/config/environment-variable/environment-variable.module';
import { PostgresConfigService } from '@Infrastructure/typeorm/postgres..config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      CategoryEntity
    ]),
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    UserService,
    CreateUserUseCase,
    TypeOrmUserRepository,
    { provide: IUserRepositorySymbol, useClass: TypeOrmUserRepository },
    ProductService,
    CreateProductUseCase,
    FindProductUseCase,
    TypeOrmProductRepository,
    { provide: IProductRepositorySymbol, useClass: TypeOrmProductRepository }
  ],
  exports: [
    TypeOrmUserRepository,
    TypeOrmProductRepository],
  controllers: [
    UserController,
    ProductController
  ],
})
export class AppModule { }
