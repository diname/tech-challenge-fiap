import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly environmentVariableService: EnvironmentVariableService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresEnvs = this.environmentVariableService.postgresConfig;

    return {
      type: 'postgres',
      host: postgresEnvs.host,
      port: postgresEnvs.port,
      username: postgresEnvs.user,
      password: postgresEnvs.password,
      database: postgresEnvs.database,
      synchronize: true,
      autoLoadEntities: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    };
  }
}
