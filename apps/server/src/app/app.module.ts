import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactCheckingModule } from './features/fact-checking/fact-checking.module';
import { GoogleFormsModule } from './features/google-forms/google-forms.module';
import { AnalyticsModule } from './features/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FactCheckingModule, 
    GoogleFormsModule, 
    AnalyticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
