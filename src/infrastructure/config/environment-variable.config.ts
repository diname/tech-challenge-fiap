import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentVariableConfig {
  constructor(private readonly configService: ConfigService) {}

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
