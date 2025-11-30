import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactCheckingModule } from './features/fact-checking/fact-checking.module';

@Module({
  imports: [FactCheckingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
