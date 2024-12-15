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

  get isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  get appDocumentationEndpoint(): string {
    return this.configService.get<string>('APP_DOCUMENTATION_ENDPOINT');
  }

  get appName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  get appVersion(): string {
    return this.configService.get<string>('APP_VERSION');
  }

  get userTokenConfig(): { secret: string; expiresIn: number } {
    return {
      secret: this.configService.get<string>('USER_TOKEN_SECRET'),
      expiresIn: this.configService.get<number>('USER_TOKEN_EXPIRES_IN'),
    };
  }

  get mercadoPagoConfig(): {
    paymentUrl: string;
    token: string;
    notificationUrl: string;
    userId: string;
    externalPosId: string;
  } {
    return {
      paymentUrl: this.configService
        .get<string>('MERCADO_PAGO_PAYMENT_URL')
        .replace(
          '$USERID',
          this.configService.get<string>('MERCADO_PAGO_USER_ID'),
        )
        .replace(
          '$EXTERNALPOS',
          this.configService.get<string>('MERCADO_PAGO_EXTERNAL_POS_ID'),
        ),
      token: this.configService.get<string>('MERCADO_PAGO_TOKEN'),
      userId: this.configService.get<string>('MERCADO_PAGO_USER_ID'),
      externalPosId: this.configService.get<string>(
        'MERCADO_PAGO_EXTERNAL_POS_ID',
      ),
      notificationUrl: this.configService.get<string>(
        'MERCADO_PAGO_NOTIFICATION_URL',
      ),
    };
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

  get cognitoConfig() {
    return {
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
      UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
    };
  }
}
