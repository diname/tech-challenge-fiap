import { EnvironmentVariableConfig } from '@Infrastructure/config/environment-variable.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(app.get(EnvironmentVariableConfig).appPort);
}
bootstrap();
