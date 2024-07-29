import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvironmentVariableService } from './environment-variable.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'test',
          'development',
          'staging',
          'production',
        ),
        APP_NAME: Joi.string(),
        APP_PORT: Joi.number().default(3000),
        APP_VERSION: Joi.string(),
        APP_DOCUMENTATION_ENDPOINT: Joi.string(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_HOST: Joi.string(),
        POSTGRES_DB: Joi.string(),
        POSTGRES_USER: Joi.string(),
        POSTGRES_PASSWORD: Joi.string(),
        USER_TOKEN_SECRET: Joi.string(),
        USER_TOKEN_EXPIRES_IN: Joi.number(),
      }),
      validationOptions: {
        presence: 'required',
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
})
export class EnvironmentVariableModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: EnvironmentVariableModule,
      providers: [EnvironmentVariableService],
      exports: [EnvironmentVariableService],
    };
  }
}
