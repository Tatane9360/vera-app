import { Module } from '@nestjs/common';
import { GoogleFormsController } from './google-forms.controller';
import { GoogleFormsService } from './google-forms.service';

@Module({
  controllers: [GoogleFormsController],
  providers: [GoogleFormsService],
  exports: [GoogleFormsService],
})
export class GoogleFormsModule {}
