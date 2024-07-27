import { UserService } from '@Application/services/user.service';
import { CreateUserUseCase } from '@Application/use-cases/user/create-user.use-case';
import { UserEntity } from '@Domain/entities/user.entity';
import { IUserRepositorySymbol } from '@Domain/repositories/user.repository';
import { UserController } from '@Infrastructure/adapters/controllers/user.controller';
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
    TypeOrmModule.forFeature([UserEntity]),
    EnvironmentVariableModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    UserService,
    CreateUserUseCase,
    TypeOrmUserRepository,
    { provide: IUserRepositorySymbol, useClass: TypeOrmUserRepository },
  ],
  exports: [TypeOrmUserRepository],
  controllers: [UserController],
})
export class AppModule {}
