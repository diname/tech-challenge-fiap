import { AuthServiceImpl } from '@Infrastructure/services/auth/auth.service.impl';
import { PostgresConfigService } from '@Infrastructure/typeorm/config/postgres.config.service';
import { CategoryModel } from '@Infrastructure/typeorm/models/category.model';
import { OrderModel } from '@Infrastructure/typeorm/models/order.model';
import { ProductOrderModel } from '@Infrastructure/typeorm/models/product-order.model';
import { ProductModel } from '@Infrastructure/typeorm/models/product.model';
import { RoleModel } from '@Infrastructure/typeorm/models/role.model';
import { UserRoleModel } from '@Infrastructure/typeorm/models/user-role.model';
import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { CategorySeeder } from '@Infrastructure/typeorm/seed/category.seeder';
import { ProductSeeder } from '@Infrastructure/typeorm/seed/product.seeder';
import { RoleSeeder } from '@Infrastructure/typeorm/seed/role.seeder';
import { SeederProvider } from '@Infrastructure/typeorm/seed/seeder.provider';
import { UserRoleSeeder } from '@Infrastructure/typeorm/seed/user-role.seeder';
import { UserSeeder } from '@Infrastructure/typeorm/seed/user.seeder';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { AuthController } from './adapters/in/controllers/auth.controller';
import { CategoryController } from './adapters/in/controllers/category.controller';
import { CheckoutController } from './adapters/in/controllers/checkout.controller';
import { OrderController } from './adapters/in/controllers/order.controller';
import { ProductController } from './adapters/in/controllers/product.controller';
import { UserController } from './adapters/in/controllers/user.controller';
import { CategoryRepositoryImpl } from './adapters/out/repositories/category.repository.impl';
import { OrderRepositoryImpl } from './adapters/out/repositories/order.repository.impl';
import { ProductOrderRepositoryImpl } from './adapters/out/repositories/product-order.repository.impl';
import { ProductRepositoryImpl } from './adapters/out/repositories/product.repository.impl';
import { UserRepositoryImpl } from './adapters/out/repositories/user.repository.impl';
import { GetTokenUseCase } from './core/application/use-cases/auth/get-token.use-case';
import { CreateCategoryUseCase } from './core/application/use-cases/category/create-category.use-case';
import { DeleteCategoryUseCase } from './core/application/use-cases/category/delete-category.use-case';
import { FindCategoryUseCase } from './core/application/use-cases/category/find-category.use-case';
import { UpdateCategoryUseCase } from './core/application/use-cases/category/update-category.use-case';
import { CreateCheckoutUseCase } from './core/application/use-cases/checkout/create-checkout.use-case';
import { ApproveOrderUseCase } from './core/application/use-cases/order/approve-order.use-case';
import { CancelOrderUseCase } from './core/application/use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from './core/application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from './core/application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from './core/application/use-cases/order/find-order-by-id.use-case';
import { UpdateOrderUseCase } from './core/application/use-cases/order/update-order.use-case';
import { CreateProductUseCase } from './core/application/use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from './core/application/use-cases/product/delete-product.use-case';
import { FindProductUseCase } from './core/application/use-cases/product/find-product.use-case';
import { UpdateProductUseCase } from './core/application/use-cases/product/update-product.use-case';
import { CreateUserUseCase } from './core/application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from './core/application/use-cases/user/get-one-user.use-case';
import { GetUserByRoleUseCase } from './core/application/use-cases/user/get-user-by-role.use-case';
import { ICategoryRepositorySymbol } from './core/domain/repositories/category.repository';
import { IOrderRepositorySymbol } from './core/domain/repositories/order.repository';
import { IProductOrderRepositorySymbol } from './core/domain/repositories/product-order.repository';
import { IProductRepositorySymbol } from './core/domain/repositories/product.repository';
import { IUserRepositorySymbol } from './core/domain/repositories/user.repository';
import { IAuthServiceSymbol } from './core/domain/services/auth/auth.service';
import { ICategoryServiceSymbol } from './core/domain/services/category/category.service';
import { CategoryServiceImpl } from './core/domain/services/category/category.serviceImpl';
import { IOrderServiceSymbol } from './core/domain/services/order/order.service';
import { OrderServiceImpl } from './core/domain/services/order/order.service.impl';
import { IProductServiceSymbol } from './core/domain/services/product/product.service';
import { ProductServiceImpl } from './core/domain/services/product/product.serviceImpl';
import { IUserServiceSymbol } from './core/domain/services/user/user.service';
import { UserServiceImpl } from './core/domain/services/user/user.serviceImp';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      UserModel,
      RoleModel,
      OrderModel,
      ProductModel,
      CategoryModel,
      UserRoleModel,
      ProductOrderModel,
    ]),
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    UserSeeder,
    RoleSeeder,
    UserRoleSeeder,
    SeederProvider,
    CategorySeeder,
    ProductSeeder,
    ProductServiceImpl,
    CreateCheckoutUseCase,
    GetTokenUseCase,
    CreateUserUseCase,
    GetOneUserUseCase,
    OrderServiceImpl,
    CreateOrderUseCase,
    CancelOrderUseCase,
    FindProductUseCase,
    UpdateOrderUseCase,
    ProductServiceImpl,
    ApproveOrderUseCase,
    FindCategoryUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetUserByRoleUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    CreateCheckoutUseCase,
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
      provide: IOrderRepositorySymbol,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: IOrderServiceSymbol,
      useClass: OrderServiceImpl,
    },
    {
      provide: IProductServiceSymbol,
      useClass: ProductServiceImpl,
    },
    {
      provide: ICategoryServiceSymbol,
      useClass: CategoryServiceImpl,
    },
    {
      provide: IProductRepositorySymbol,
      useClass: ProductRepositoryImpl,
    },
    {
      provide: ICategoryRepositorySymbol,
      useClass: CategoryRepositoryImpl,
    },
    {
      provide: IProductOrderRepositorySymbol,
      useClass: ProductOrderRepositoryImpl,
    },
  ],
  controllers: [
    AuthController,
    UserController,
    CheckoutController,
    ProductController,
    OrderController,
    CategoryController,
  ],
})
export class AppModule {}
