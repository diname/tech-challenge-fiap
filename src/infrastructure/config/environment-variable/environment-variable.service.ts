import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariableInterface } from './environment-variable.interface';

@Injectable()
export class EnvironmentVariableService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariableInterface>,
  ) {}

  get appPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  get postgresConfig(): {
    port: number;
    host: string;
    user: string;
    password: string;
    database: string;
  } {
    return {
      port: this.configService.get<number>('POSTGRES_PORT'),
      host: this.configService.get<string>('POSTGRES_HOST'),
      user: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
    };
  }
}
