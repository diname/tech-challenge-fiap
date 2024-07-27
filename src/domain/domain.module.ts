import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config';

@Module({})
export class DomainModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: DomainModule,
    };
  }
}
