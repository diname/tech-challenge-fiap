export interface EnvironmentVariableInterface {
  NODE_ENV: 'test' | 'development' | 'staging' | 'production';
  APP_NAME: string;
  APP_PORT: string;
  APP_VERSION: string;
  APP_DOCUMENTATION_ENDPOINT: string;
  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  USER_TOKEN_SECRET: string;
  USER_TOKEN_EXPIRES_IN: number;
  MERCADO_PAGO_PAYMENT_URL: string;
  MERCADO_PAGO_TOKEN: string;
  MERCADO_PAGO_NOTIFICATION_URL: string;
  MERCADO_PAGO_USER_ID: string;
  MERCADO_PAGO_EXTERNAL_POS_ID: string;
  CACHE_SERVICE_HOST: string;
  CACHE_SERVICE_PORT: number;
  COGNITO_CLIENT_ID: string;
  COGNITO_USER_POOL_ID: string;
}
