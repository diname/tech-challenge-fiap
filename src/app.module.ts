import { AuthService } from '@Application/services/auth.service';
import { UserService } from '@Application/services/user.service';
import { GetTokenUserUseCase } from '@Application/use-cases/auth/get-token-user.use-case';
import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from '@Application/use-cases/user/get-one-user.use-case';
import { CategoryEntity } from '@Domain/entities/category.entity';
import { OrderEntity } from '@Domain/entities/order.entity';
import { ProductEntity } from '@Domain/entities/product.entity';
import { ProductOrderEntity } from '@Domain/entities/product_order.entity';
import { RoleEntity } from '@Domain/entities/role.entity';
import { UserEntity } from '@Domain/entities/user.entity';
import { UserRoleEntity } from '@Domain/entities/user_role.entity';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { IAuthServiceSymbol } from '@Domain/services/auth.service';
import { AuthController } from '@Infrastructure/adapters/controllers/auth.controller';
import { UserController } from '@Infrastructure/adapters/controllers/user.controller';
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
      CategoryEntity,
      OrderEntity,
      ProductOrderEntity,
      ProductEntity,
      RoleEntity,
      UserRoleEntity,
      UserEntity,
    ]),
    EnvironmentVariableModule.forRoot({
      isGlobal: true,
    }),
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
  ],
  controllers: [UserController, AuthController],
})
export class AppModule {}
