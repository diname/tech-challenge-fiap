import { EnvironmentVariableService } from '@Infrastructure/config/environment-variable/environment-variable.service';
import { NestFactory } from '@nestjs/core';
import { initializeCors } from '@Shared/utils/initializers/cors.initializer';
import { initializeSwagger } from '@Shared/utils/initializers/swagger.initializer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeCors(app);
  initializeSwagger(app);

  await app.listen(app.get(EnvironmentVariableService).appPort);
}
bootstrap();
