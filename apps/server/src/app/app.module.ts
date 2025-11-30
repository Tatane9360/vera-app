import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactCheckingModule } from './features/fact-checking/fact-checking.module';
import { GoogleFormsModule } from './features/google-forms/google-forms.module';

@Module({
  imports: [FactCheckingModule, GoogleFormsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
