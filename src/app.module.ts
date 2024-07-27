import { ApplicationModule } from '@Application/application.module';
import { DomainModule } from '@Domain/domain.module';
import { InfrastructureModule } from '@Infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DomainModule.forRoot({ isGlobal: true }),
    ApplicationModule.forRoot({ isGlobal: true }),
    InfrastructureModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
