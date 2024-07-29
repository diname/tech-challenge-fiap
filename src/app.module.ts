import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '@Application/services/auth.service';
import { OrderServiceImpl } from '@Application/services/order.service.impl';
import { ProductService } from '@Application/services/product.service';
import { UserService } from '@Application/services/user.service';
import { GetTokenUserUseCase } from '@Application/use-cases/auth/get-token-user.use-case';
import { ApproveOrderUseCase } from '@Application/use-cases/order/approve-order.use-case';
import { CancelOrderUseCase } from '@Application/use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from '@Application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from '@Application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '@Application/use-cases/order/find-order-by-id.use-case';
import { CreateProductUseCase } from '@Application/use-cases/product/create-product.use-case';
import { FindProductUseCase } from '@Application/use-cases/product/find-product.use-case';
import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from '@Application/use-cases/user/get-one-user.use-case';
import { CategoryEntity } from '@Domain/entities/category.entity';
import { OrderEntity } from '@Domain/entities/order.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import { ProductOrderEntity } from '@Domain/entities/product_order.entity';
import { RoleEntity } from '@Domain/entities/role.entity';
import { UserRoleEntity } from '@Domain/entities/user-role.entity';
import { UserEntity } from '@Domain/entities/user.entity';
import { IOrderRepositorySymbol } from '@Domain/repositories/order.repository';
import { IProductOrderRepositorySymbol } from '@Domain/repositories/product-order.repository';
import { IProductRepositorySymbol } from '@Domain/repositories/product.repository';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { IAuthServiceSymbol } from '@Domain/services/auth.service';
import { IOrderServiceSymbol } from '@Domain/services/order.service';
import { AuthController } from '@Infrastructure/adapters/controllers/auth.controller';
import { OrderController } from '@Infrastructure/adapters/controllers/order.controller';
import { ProductController } from '@Infrastructure/adapters/controllers/product.controller';
import { UserController } from '@Infrastructure/adapters/controllers/user.controller';
import { OrderRepositoryImpl } from '@Infrastructure/adapters/persistence/order.repository.impl';
import { ProductOrderRepositoryImpl } from '@Infrastructure/adapters/persistence/product-order.repository.impl';
import { TypeOrmProductRepository } from '@Infrastructure/adapters/persistence/typeorm-product.repository';
import { TypeOrmUserRepository } from '@Infrastructure/adapters/persistence/typeorm-user.repository';
import { JwtTokenService } from '@Infrastructure/adapters/services/jwt-token.service';
import { EnvironmentVariableModule } from '@Infrastructure/config/environment-variable/environment-variable.module';
import { PostgresConfigService } from '@Infrastructure/typeorm/postgres..config.service';

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
    GetTokenUserUseCase,
    CreateUserUseCase,
    GetOneUserUseCase,
    JwtTokenService,
    ProductService,
    CreateProductUseCase,
    FindProductUseCase,
    CreateOrderUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    ApproveOrderUseCase,
    CancelOrderUseCase,

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
      useClass: TypeOrmProductRepository,
    },
    {
      provide: IOrderRepositorySymbol,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: IProductOrderRepositorySymbol,
      useClass: ProductOrderRepositoryImpl,
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
