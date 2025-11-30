import { Controller, Get, Param } from '@nestjs/common';
import { GoogleFormsService } from './google-forms.service';

@Controller('forms')
export class GoogleFormsController {
  constructor(private readonly formsService: GoogleFormsService) {}

  @Get(':id')
  async getFormDetails(@Param('id') id: string) {
    return this.formsService.getFormDetails(id);
  }

  @Get(':id/responses')
  async getResponses(@Param('id') id: string) {
    return this.formsService.getFormResponses(id);
  }

  @Get(':id/statistics')
  async getStatistics(@Param('id') id: string) {
    return this.formsService.getFormStatistics(id);
  }
}
