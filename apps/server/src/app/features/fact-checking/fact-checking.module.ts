import { Module } from '@nestjs/common';
import { FactCheckingController } from './fact-checking.controller';
import { FactCheckingService } from './fact-checking.service';

@Module({
  controllers: [FactCheckingController],
  providers: [FactCheckingService],
})
export class FactCheckingModule {}
