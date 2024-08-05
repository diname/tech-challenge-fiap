import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariableService } from '@Shared/config/environment-variable/environment-variable.service';

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
