import { EnvironmentVariableConfig } from '@Infrastructure/config/environment-variable.config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly environmentVariableConfig: EnvironmentVariableConfig,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresEnvironmentsVariable =
      this.environmentVariableConfig.postgresConfig;

    return {
      type: 'postgres',
      host: postgresEnvironmentsVariable.host,
      port: postgresEnvironmentsVariable.port,
      username: postgresEnvironmentsVariable.user,
      password: postgresEnvironmentsVariable.password,
      database: postgresEnvironmentsVariable.database,
      synchronize: true,
    };
  }
}
