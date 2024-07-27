import { EnvironmentVariableConfigService } from '@Infrastructure/config/environment-variable.config.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly environmentVariableConfigService: EnvironmentVariableConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresEnvs = this.environmentVariableConfigService.postgresConfig;

    return {
      type: 'postgres',
      host: postgresEnvs.host,
      port: postgresEnvs.port,
      username: postgresEnvs.user,
      password: postgresEnvs.password,
      database: postgresEnvs.database,
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
