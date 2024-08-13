import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';
import { initializeCors } from '@Shared/utils/initializers/cors.initializer';
import { initializeSwagger } from '@Shared/utils/initializers/swagger.initializer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeCors(app);
  initializeSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(app.get(EnvironmentVariableService).appPort);
}
bootstrap();
