export interface EnvironmentVariableInterface {
  NODE_ENV: 'test' | 'development' | 'staging' | 'production';
  APP_NAME: string;
  APP_PORT: string;
  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
}