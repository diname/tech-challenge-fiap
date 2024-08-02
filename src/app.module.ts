import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetTokenUserUseCase } from '@Application/use-cases/auth/get-token-user.use-case';
import { ApproveOrderUseCase } from '@Application/use-cases/order/approve-order.use-case';
import { CancelOrderUseCase } from '@Application/use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from '@Application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from '@Application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '@Application/use-cases/order/find-order-by-id.use-case';

import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from '@Application/use-cases/user/get-one-user.use-case';
import { IOrderRepositorySymbol } from '@Domain/repositories/order.repository';
import { IProductOrderRepositorySymbol } from '@Domain/repositories/product-order.repository';
import { IProductRepositorySymbol } from '@Domain/repositories/product.repository';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { IAuthServiceSymbol } from '@Domain/services/auth/auth.service';
import { AuthService } from '@Domain/services/auth/auth.serviceImpl';
import { OrderServiceImpl } from '@Domain/services/order/order.service.impl';
import { UserService } from '@Domain/services/user/user.service';

import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from '@Application/use-cases/product/delete-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { UpdateProductUseCase } from '@Application/use-cases/product/update-product.use-case';
import { IOrderServiceSymbol } from '@Domain/services/order/order.service';
import { IProductServiceSymbol } from '@Domain/services/product/product.service';
import { ProductServiceImpl } from '@Domain/services/product/product.serviceImpl';
import { OrderRepositoryImpl } from '@Infrastructure/adapters/repositories/order.repository.impl';
import { ProductOrderRepositoryImpl } from '@Infrastructure/adapters/repositories/product-order.repository.impl';
import { ProductRepositoryImpl } from '@Infrastructure/adapters/repositories/product.repository.impl';
import { TypeOrmUserRepository } from '@Infrastructure/adapters/repositories/user.repository.impl';
import { JwtTokenService } from '@Infrastructure/adapters/services/jwt-token.service';
import { PostgresConfigService } from '@Infrastructure/adapters/services/postgres..config.service';
import { EnvironmentVariableModule } from '@Infrastructure/config/environment-variable/environment-variable.module';
import { CategoryEntity } from '@Infrastructure/entities/category.entity';
import { OrderEntity } from '@Infrastructure/entities/order.entity';
import { ProductEntity } from '@Infrastructure/entities/product.entity';
import { ProductOrderEntity } from '@Infrastructure/entities/product_order.entity';
import { RoleEntity } from '@Infrastructure/entities/role.entity';
import { UserRoleEntity } from '@Infrastructure/entities/user-role.entity';
import { UserEntity } from '@Infrastructure/entities/user.entity';
import { CategorySeeder } from '@Infrastructure/typeorm/seed/category.seeder';
import { RoleSeeder } from '@Infrastructure/typeorm/seed/role.seeder';
import { SeederProvider } from '@Infrastructure/typeorm/seed/seeder.provider';
import { UserSeeder } from '@Infrastructure/typeorm/seed/user.seeder';
import { AuthController } from './api/controllers/auth.controller';
import { OrderController } from './api/controllers/order.controller';
import { ProductController } from './api/controllers/product.controller';
import { UserController } from './api/controllers/user.controller';

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
    SeederProvider,
    CategorySeeder,
    UserSeeder,
    RoleSeeder,
    AuthService,
    UserService,
    ProductServiceImpl,
    GetTokenUserUseCase,
    CreateUserUseCase,
    GetOneUserUseCase,
    JwtTokenService,
    CreateOrderUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    ApproveOrderUseCase,
    CancelOrderUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    FindProductUseCase,
    DeleteProductUseCase,

    {
      provide: IOrderServiceSymbol,
      useClass: OrderServiceImpl,
    },
    {
      provide: IAuthServiceSymbol,
      useClass: JwtTokenService,
    },
    {
      provide: IUserRepositorySymbol,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: IProductRepositorySymbol,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: IOrderRepositorySymbol,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: IProductOrderRepositorySymbol,
      useClass: ProductOrderRepositoryImpl,
    },
    {
      provide: IProductServiceSymbol,
      useClass: ProductServiceImpl,
    },
  ],
  controllers: [
    UserController,
    ProductController,
    AuthController,
    OrderController,
  ],
})
export class AppModule {}
