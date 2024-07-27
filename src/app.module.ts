import { InfrastructureModule } from '@Infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
