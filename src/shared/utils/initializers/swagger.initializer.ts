import { EnvironmentVariableService } from '@Infrastructure/config/environment-variable/environment-variable.service';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initializeSwagger = (application: INestApplication): void => {
  const environmentVariableService: EnvironmentVariableService =
    application.get(EnvironmentVariableService);

  if (!environmentVariableService.isProduction) {
    SwaggerModule.setup(
      environmentVariableService.appDocumentationEndpoint,
      application,
      SwaggerModule.createDocument(
        application,
        new DocumentBuilder()
          .setTitle(environmentVariableService.appName)
          .setVersion(environmentVariableService.appVersion)
          .addBearerAuth()
          .build(),
      ),
    );
  }
};
