import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvironmentVariableConfig } from './config/environment-variable.config';
import { PostgresConfigService } from './typeorm/postgres.typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'test',
          'development',
          'staging',
          'production',
        ),
        APP_NAME: Joi.string(),
        APP_PORT: Joi.number().default(3000),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_HOST: Joi.string(),
        POSTGRES_DB: Joi.string(),
        POSTGRES_USER: Joi.string(),
        POSTGRES_PASSWORD: Joi.string(),
      }),
      validationOptions: {
        presence: 'required',
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
})
export class InfrastructureModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: InfrastructureModule,
      providers: [EnvironmentVariableConfig, PostgresConfigService],
      exports: [EnvironmentVariableConfig],
    };
  }
}
