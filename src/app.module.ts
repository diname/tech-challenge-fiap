import { WebhookUseCase } from '@Application/use-cases/payment/webhook.use-case';
import { AuthServiceImpl } from '@Domain/services/auth/auth.service.impl';
import { MercadoPagoServiceImpl } from '@Infrastructure/services/mercadopago/mercadopago.service.impl';
import { IPaymentService } from '@Infrastructure/services/mercadopago/payment.service';
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
import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { redisStore } from 'cache-manager-redis-yet';
import { GetTokenUseCase } from './application/use-cases/auth/get-token.use-case';
import { CreateCategoryUseCase } from './application/use-cases/category/create-category.use-case';
import { DeleteCategoryUseCase } from './application/use-cases/category/delete-category.use-case';
import { FindCategoryUseCase } from './application/use-cases/category/find-category.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/category/update-category.use-case';
import { ApproveOrderUseCase } from './application/use-cases/order/approve-order.use-case';
import { CancelOrderUseCase } from './application/use-cases/order/cancel-order.use-case';
import { CreateOrderUseCase } from './application/use-cases/order/create-order.use-case';
import { FindAllOrdersUseCase } from './application/use-cases/order/find-all-orders.use-case';
import { FindOrderByIdUseCase } from './application/use-cases/order/find-order-by-id.use-case';
import { UpdateOrderUseCase } from './application/use-cases/order/update-order.use-case';
import { CheckoutUseCase } from './application/use-cases/payment/checkout.use-case';
import { CreateProductUseCase } from './application/use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/product/delete-product.use-case';
import { FindProductUseCase } from './application/use-cases/product/find-product.use-case';
import { UpdateProductUseCase } from './application/use-cases/product/update-product.use-case';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from './application/use-cases/user/get-one-user.use-case';
import { GetUserByRoleUseCase } from './application/use-cases/user/get-user-by-role.use-case';
import { ICategoryRepositorySymbol } from './domain/repositories/category.repository';
import { IOrderRepositorySymbol } from './domain/repositories/order.repository';
import { IProductOrderRepositorySymbol } from './domain/repositories/product-order.repository';
import { IProductRepositorySymbol } from './domain/repositories/product.repository';
import { IUserRepositorySymbol } from './domain/repositories/user.repository';
import { IAuthServiceSymbol } from './domain/services/auth/auth.service';
import { ICategoryServiceSymbol } from './domain/services/category/category.service';
import { CategoryServiceImpl } from './domain/services/category/category.serviceImpl';
import { IOrderServiceSymbol } from './domain/services/order/order.service';
import { OrderServiceImpl } from './domain/services/order/order.service.impl';
import { IProductServiceSymbol } from './domain/services/product/product.service';
import { ProductServiceImpl } from './domain/services/product/product.serviceImpl';
import { IUserServiceSymbol } from './domain/services/user/user.service';
import { UserServiceImpl } from './domain/services/user/user.serviceImp';
import { CategoryRepositoryImpl } from './infrastructure/repositories/category.repository.impl';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { ProductOrderRepositoryImpl } from './infrastructure/repositories/product-order.repository.impl';
import { ProductRepositoryImpl } from './infrastructure/repositories/product.repository.impl';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { CategoryController } from './presentation/controllers/category.controller';
import { HealthController } from './presentation/controllers/health.controller';
import { OrderController } from './presentation/controllers/order.controller';
import { PaymentController } from './presentation/controllers/payment.controller';
import { ProductController } from './presentation/controllers/product.controller';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [
    HttpModule,
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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('CACHE_SERVICE_HOST'),
            port: configService.get<number>('CACHE_SERVICE_PORT'),
          },
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
    }),

    EnvironmentVariableModule.forRoot({ isGlobal: true }),
    TerminusModule,
  ],
  providers: [
    UserSeeder,
    RoleSeeder,
    UserRoleSeeder,
    SeederProvider,
    CategorySeeder,
    ProductSeeder,
    ProductServiceImpl,
    CheckoutUseCase,
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
    WebhookUseCase,
    {
      provide: IPaymentService,
      useClass: MercadoPagoServiceImpl,
    },
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
    //AuthController,
    UserController,
    PaymentController,
    ProductController,
    OrderController,
    CategoryController,
    HealthController,
  ],
})
export class AppModule {}
