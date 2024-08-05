import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IOrderRepositorySymbol } from '@Domain/repositories/order.repository';
import { IProductOrderRepositorySymbol } from '@Domain/repositories/product-order.repository';
import { IProductRepositorySymbol } from '@Domain/repositories/product.repository';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { IAuthServiceSymbol } from '@Domain/services/auth/auth.service';

import { IOrderServiceSymbol } from '@Domain/services/order/order.service';
import { IProductServiceSymbol } from '@Domain/services/product/product.service';
import { ProductServiceImpl } from '@Domain/services/product/product.serviceImpl';
import { OrderRepositoryImpl } from '@Infrastructure/typeorm/repositories/order.repository.impl';
import { ProductRepositoryImpl } from '@Infrastructure/typeorm/repositories/product.repository.impl';

import { OrderServiceImpl } from '@Domain/services/order/order.service.impl';
import { IUserServiceSymbol } from '@Domain/services/user/user.service';
import { UserServiceImpl } from '@Domain/services/user/user.serviceImp';
import { AuthServiceImpl } from '@Infrastructure/services/auth/auth.service.impl';
import { PostgresConfigService } from '@Infrastructure/typeorm/config/postgres.config.service';
import { CategoryModel } from '@Infrastructure/typeorm/models/category.model';
import { OrderModel } from '@Infrastructure/typeorm/models/order.model';
import { ProductModel } from '@Infrastructure/typeorm/models/product.model';
import { ProductOrderModel } from '@Infrastructure/typeorm/models/product_order.model';
import { RoleModel } from '@Infrastructure/typeorm/models/role.model';
import { UserRoleModel } from '@Infrastructure/typeorm/models/user-role.model';
import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { ProductOrderRepositoryImpl } from '@Infrastructure/typeorm/repositories/product-order.repository.impl';
import { UserRepositoryImpl } from '@Infrastructure/typeorm/repositories/user.repository.impl';
import { CategorySeeder } from '@Infrastructure/typeorm/seed/category.seeder';
import { RoleSeeder } from '@Infrastructure/typeorm/seed/role.seeder';
import { SeederProvider } from '@Infrastructure/typeorm/seed/seeder.provider';
import { UserSeeder } from '@Infrastructure/typeorm/seed/user.seeder';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { AuthController } from './application/controllers/auth.controller';
import { OrderController } from './application/controllers/order.controller';
import { ProductController } from './application/controllers/product.controller';
import { UserController } from './application/controllers/user.controller';
import { GetTokenUseCase } from './application/use-cases/auth/get-token.use-case';
import { ApproveOrderUseCase } from './application/use-cases/order/approve-order.use-case';
import { CancelOrderUseCase } from './application/use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from './application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from './application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from './application/use-cases/order/find-order-by-id.use-case';
import { CreateProductUseCase } from './application/use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/product/delete-product.use-case';
import { FindProductUseCase } from './application/use-cases/product/find-product.use-case';
import { UpdateProductUseCase } from './application/use-cases/product/update-product.use-case';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from './application/use-cases/user/get-one-user.use-case';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      UserModel,
      UserRoleModel,
      RoleModel,
      ProductModel,
      ProductOrderModel,
      OrderModel,
      CategoryModel,
    ]),
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    UserSeeder,
    RoleSeeder,
    SeederProvider,
    CategorySeeder,
    ProductServiceImpl,
    CreateUserUseCase,
    GetOneUserUseCase,
    CreateOrderUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    ApproveOrderUseCase,
    CancelOrderUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    FindProductUseCase,
    DeleteProductUseCase,
    GetTokenUseCase,
    {
      provide: IAuthServiceSymbol,
      useClass: AuthServiceImpl,
    },
    {
      provide: IUserServiceSymbol,
      useClass: UserServiceImpl,
    },
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepositoryImpl,
    },
    {
      provide: IOrderServiceSymbol,
      useClass: OrderServiceImpl,
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
