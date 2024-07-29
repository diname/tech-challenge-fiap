import { AuthService } from '@Application/services/auth.service';
import { ProductService } from '@Application/services/product.service';
import { UserService } from '@Application/services/user.service';
import { GetTokenUserUseCase } from '@Application/use-cases/auth/get-token-user.use-case';
import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from '@Application/use-cases/user/get-one-user.use-case';
import { CategoryEntity } from '@Domain/entities/category.entity';
import { OrderEntity } from '@Domain/entities/order.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import { ProductOrderEntity } from '@Domain/entities/product_order.entity';
import { RoleEntity } from '@Domain/entities/role.entity';
import { UserEntity } from '@Domain/entities/user.entity';
import { UserRoleEntity } from '@Domain/entities/user_role.entity';
import { IProductRepositorySymbol } from '@Domain/repositories/product.repository';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { IAuthServiceSymbol } from '@Domain/services/auth.service';
import { ProductController } from '@Infrastructure/adapters/controllers/product.controller';
import { UserController } from '@Infrastructure/adapters/controllers/user.controller';
import { TypeOrmProductRepository } from '@Infrastructure/adapters/persistence/typeorm-product.repository';
import { TypeOrmUserRepository } from '@Infrastructure/adapters/persistence/typeorm-user.repository';
import { JwtTokenService } from '@Infrastructure/adapters/services/jwt-token.service';
import { EnvironmentVariableModule } from '@Infrastructure/config/environment-variable/environment-variable.module';
import { PostgresConfigService } from '@Infrastructure/typeorm/postgres..config.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      UserRoleEntity,
      RoleEntity,
      ProductEntity,
      ProductOrderEntity,
      OrderEntity,
      CategoryEntity,
    ]),
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtTokenService,
    CreateUserUseCase,
    GetOneUserUseCase,
    GetTokenUserUseCase,
    TypeOrmUserRepository,
    { provide: IAuthServiceSymbol, useClass: JwtTokenService },
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
